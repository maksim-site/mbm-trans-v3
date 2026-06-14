<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed'], JSON_UNESCAPED_UNICODE);
    exit;
}

$token = getenv('MBM_TELEGRAM_BOT_TOKEN') ?: '';
$chatId = getenv('MBM_TELEGRAM_CHAT_ID') ?: '';

$configPath = __DIR__ . '/telegram-config.php';
if (($token === '' || $chatId === '') && is_file($configPath)) {
    $config = require $configPath;
    if (is_array($config)) {
        $token = $token !== '' ? $token : (string)($config['bot_token'] ?? '');
        $chatId = $chatId !== '' ? $chatId : (string)($config['chat_id'] ?? '');
    }
}

if ($token === '' || $chatId === '') {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'telegram_not_configured'], JSON_UNESCAPED_UNICODE);
    exit;
}

$name = trim((string)($_POST['name'] ?? ''));
$phone = trim((string)($_POST['phone'] ?? ''));
$email = trim((string)($_POST['email'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));
$page = trim((string)($_POST['page'] ?? 'Сайт'));

if ($name === '' || $phone === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'name_phone_required'], JSON_UNESCAPED_UNICODE);
    exit;
}

$text = implode("\n", array_filter([
    "Новая заявка с сайта МБМ-Транс",
    "Страница: {$page}",
    "Имя: {$name}",
    "Телефон: {$phone}",
    $email !== '' ? "E-mail: {$email}" : '',
    $message !== '' ? "Сообщение: {$message}" : '',
]));

$payload = [
    'chat_id' => $chatId,
    'text' => $text,
    'disable_web_page_preview' => true,
];

$url = "https://api.telegram.org/bot{$token}/sendMessage";
$response = null;

if (function_exists('curl_init')) {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $payload,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 8,
    ]);
    $response = curl_exec($ch);
    $httpCode = (int)curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    curl_close($ch);
} else {
    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
            'content' => http_build_query($payload),
            'timeout' => 8,
        ],
    ]);
    $response = file_get_contents($url, false, $context);
    $httpCode = $response === false ? 500 : 200;
}

if ($httpCode < 200 || $httpCode >= 300 || $response === false) {
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'telegram_send_failed'], JSON_UNESCAPED_UNICODE);
    exit;
}

$decoded = json_decode((string)$response, true);
if (!is_array($decoded) || !($decoded['ok'] ?? false)) {
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'telegram_api_rejected'], JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode(['ok' => true], JSON_UNESCAPED_UNICODE);
