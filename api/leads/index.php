<?php

header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');
header('X-Robots-Tag: noindex, nofollow, noarchive');
header('Referrer-Policy: same-origin');

function respond(array $payload, $status)
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function cut_text($value, $limit, $keepLines = false)
{
    $text = str_replace("\0", '', trim((string) $value));
    if ($keepLines) {
        $normalized = preg_replace("/\r\n?|\n/u", "\n", $text);
        $text = $normalized === null ? '' : $normalized;
        $normalized = preg_replace("/[\t ]+/u", ' ', $text);
        $text = $normalized === null ? '' : $normalized;
    } else {
        $normalized = preg_replace('/\s+/u', ' ', $text);
        $text = $normalized === null ? '' : $normalized;
    }

    return function_exists('mb_substr')
        ? mb_substr($text, 0, $limit, 'UTF-8')
        : substr($text, 0, $limit);
}

function request_host()
{
    $host = strtolower((string) (isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : 'mbm-trans.ru'));
    $normalized = preg_replace('/:\d+$/', '', $host);
    return $normalized ? $normalized : 'mbm-trans.ru';
}

function mail_domain($host)
{
    $suffix = '.mbm-trans.ru';
    $hasSuffix = strlen($host) >= strlen($suffix)
        && substr($host, -strlen($suffix)) === $suffix;

    return $host === 'mbm-trans.ru' || $hasSuffix
        ? 'mbm-trans.ru'
        : $host;
}

function same_value($known, $provided)
{
    if (function_exists('hash_equals')) {
        return hash_equals($known, $provided);
    }

    if (strlen($known) !== strlen($provided)) {
        return false;
    }

    $result = 0;
    for ($i = 0, $length = strlen($known); $i < $length; $i++) {
        $result |= ord($known[$i]) ^ ord($provided[$i]);
    }

    return $result === 0;
}

if ((isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : '') !== 'POST') {
    header('Allow: POST');
    respond(['ok' => false, 'error' => 'method_not_allowed'], 405);
}

$contentLength = (int) (isset($_SERVER['CONTENT_LENGTH']) ? $_SERVER['CONTENT_LENGTH'] : 0);
if ($contentLength > 100000) {
    respond(['ok' => false, 'error' => 'payload_too_large'], 413);
}

$siteHost = request_host();
$origin = (string) (isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '');
if ($origin !== '') {
    $originHost = strtolower((string) parse_url($origin, PHP_URL_HOST));
    if ($originHost === '' || !same_value($siteHost, $originHost)) {
        respond(['ok' => false, 'error' => 'origin_not_allowed'], 403);
    }
}

$fetchSite = strtolower((string) (isset($_SERVER['HTTP_SEC_FETCH_SITE']) ? $_SERVER['HTTP_SEC_FETCH_SITE'] : ''));
if ($fetchSite !== '' && !in_array($fetchSite, ['same-origin', 'same-site', 'none'], true)) {
    respond(['ok' => false, 'error' => 'cross_site_request'], 403);
}

$name = cut_text(isset($_POST['name']) ? $_POST['name'] : '', 120);
$phone = cut_text(isset($_POST['phone']) ? $_POST['phone'] : '', 32);
$email = cut_text(isset($_POST['email']) ? $_POST['email'] : '', 160);
$message = cut_text(isset($_POST['message']) ? $_POST['message'] : '', 2000, true);
$page = cut_text(isset($_POST['page']) ? $_POST['page'] : 'Сайт', 160);
$honeypot = cut_text(isset($_POST['website']) ? $_POST['website'] : '', 200);
$consent = isset($_POST['consent']) && (string) $_POST['consent'] !== '';
$startedAt = (int) (isset($_POST['lead_started_at']) ? $_POST['lead_started_at'] : 0);
$nowMs = (int) round(microtime(true) * 1000);
$formAge = $startedAt > 0 ? $nowMs - $startedAt : 0;

if ($honeypot !== '') {
    respond(['ok' => true], 200);
}

if ($startedAt <= 0 || $formAge < 2500 || $formAge > 21600000) {
    respond(['ok' => false, 'error' => 'invalid_form_time'], 422);
}

$phoneDigits = preg_replace('/\D+/', '', $phone);
$phoneDigits = $phoneDigits === null ? '' : $phoneDigits;
if (strlen($phoneDigits) === 11 && $phoneDigits[0] === '8') {
    $phoneDigits = '7' . substr($phoneDigits, 1);
}

$errors = [];
if ($name === '') $errors['name'] = 'required';
if (strlen($phoneDigits) !== 11 || $phoneDigits[0] !== '7') $errors['phone'] = 'invalid';
if ($email !== '' && filter_var($email, FILTER_VALIDATE_EMAIL) === false) $errors['email'] = 'invalid';
if (!$consent) $errors['consent'] = 'required';

if ($errors !== []) {
    respond(['ok' => false, 'error' => 'validation_failed', 'fields' => $errors], 422);
}

$recipient = (string) (getenv('MBM_LEAD_RECIPIENT') ?: 'info@mbm-trans.ru');
if (filter_var($recipient, FILTER_VALIDATE_EMAIL) === false) {
    respond(['ok' => false, 'error' => 'recipient_not_configured'], 500);
}

$from = (string) (getenv('MBM_LEAD_FROM') ?: ('site@' . mail_domain($siteHost)));
if (filter_var($from, FILTER_VALIDATE_EMAIL) === false) {
    $from = 'site@mbm-trans.ru';
}

$formattedPhone = sprintf(
    '+7 (%s) %s-%s-%s',
    substr($phoneDigits, 1, 3),
    substr($phoneDigits, 4, 3),
    substr($phoneDigits, 7, 2),
    substr($phoneDigits, 9, 2)
);

$lines = [
    'Новая заявка с сайта МБМ-Транс',
    '',
    'Страница: ' . $page,
    'Имя: ' . $name,
    'Телефон: ' . $formattedPhone,
];
if ($email !== '') $lines[] = 'E-mail: ' . $email;
if ($message !== '') {
    $lines[] = '';
    $lines[] = 'Сообщение:';
    $lines[] = $message;
}
$lines[] = '';
$lines[] = 'Согласие на обработку персональных данных: подтверждено.';

$subjectText = 'Новая заявка с сайта МБМ-Транс';
$subject = function_exists('mb_encode_mimeheader')
    ? mb_encode_mimeheader($subjectText, 'UTF-8', 'B', "\r\n")
    : $subjectText;

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'From: МБМ-Транс <' . $from . '>',
    'Reply-To: ' . ($email !== '' ? $email : $from),
];

$sent = mail($recipient, $subject, implode("\r\n", $lines), implode("\r\n", $headers));
if (!$sent) {
    respond(['ok' => false, 'error' => 'mail_delivery_failed'], 502);
}

respond(['ok' => true], 200);
