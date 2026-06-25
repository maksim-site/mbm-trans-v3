<?php
header('Content-Type: application/json; charset=UTF-8');
header('X-Robots-Tag: noindex, nofollow, noarchive');
http_response_code(410);
echo json_encode(['ok' => false, 'error' => 'endpoint_disabled'], JSON_UNESCAPED_UNICODE);
