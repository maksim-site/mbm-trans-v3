<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');
header('X-Robots-Tag: noindex, nofollow, noarchive');
header('Referrer-Policy: same-origin');

function respond(array $payload, int $status): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function cut_text($value, int $limit, bool $keepLines = false): string
{
    $text = str_replace("\0", '', trim((string) $value));
    if ($keepLines) {
        $text = preg_replace("/\r\n?|\n/u", "\n", $text) ?? '';
        $text = preg_replace("/[\t ]+/u", ' ', $text) ?? '';
    } else {
        $text = preg_replace('/\s+/u', ' ', $text) ?? '';
    }

    return function_exists('mb_substr')
        ? mb_substr($text, 0, $limit, 'UTF-8')
        : substr($text, 0, $limit);
}

function request_host(): string
{
    $host = strtolower((string) ($_SERVER['HTTP_HOST'] ?? 'mbm-trans.ru'));
    return preg_replace('/:\d+$/', '', $host) ?: 'mbm-trans.ru';
}

function mail_domain(string $host): string
{
    return $host === 'mbm-trans.ru' || str_ends_with($host, '.mbm-trans.ru')
        ? 'mbm-trans.ru'
        : $host;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(['ok' => false, 'error' => 'method_not_allowed'], 405);
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > 100000) {
    respond(['ok' => false, 'error' => 'payload_too_large'], 413);
}

$siteHost = request_host();
$origin = (string) ($_SERVER['HTTP_ORIGIN'] ?? '');
if ($origin !== '') {
    $originHost = strtolower((string) parse_url($origin, PHP_URL_HOST));
    if ($originHost === '' || !hash_equals($siteHost, $originHost)) {
        respond(['ok' => false, 'error' => 'origin_not_allowed'], 403);
    }
}

$fetchSite = strtolower((string) ($_SERVER['HTTP_SEC_FETCH_SITE'] ?? ''));
if ($fetchSite !== '' && !in_array($fetchSite, ['same-origin', 'same-site', 'none'], true)) {
    respond(['ok' => false, 'error' => 'cross_site_request'], 403);
}

$name = cut_text($_POST['name'] ?? '', 120);
$phone = cut_text($_POST['phone'] ?? '', 32);
$email = cut_text($_POST['email'] ?? '', 160);
$message = cut_text($_POST['message'] ?? '', 2000, true);
$page = cut_text($_POST['page'] ?? 'Сайт', 160);
$honeypot = cut_text($_POST['website'] ?? '', 200);
$consent = isset($_POST['consent']) && (string) $_POST['consent'] !== '';
$startedAt = (int) ($_POST['lead_started_at'] ?? 0);
$nowMs = (int) round(microtime(true) * 1000);
$formAge = $startedAt > 0 ? $nowMs - $startedAt : 0;

if ($honeypot !== '') {
    respond(['ok' => true], 200);
}

if ($startedAt <= 0 || $formAge < 2500 || $formAge > 21600000) {
    respond(['ok' => false, 'error' => 'invalid_form_time'], 422);
}

$phoneDigits = preg_replace('/\D+/', '', $phone) ?? '';
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
