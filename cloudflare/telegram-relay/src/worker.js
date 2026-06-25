const ALLOWED_ORIGINS = new Set([
  'http://mbm-trans.ru',
  'https://mbm-trans.ru',
  'http://www.mbm-trans.ru',
  'https://www.mbm-trans.ru',
]);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const URL_PATTERN = /https?:\/\/|www\.|<\s*a\b|href\s*=/i;
const SPAM_PATTERN = /1xbet|casino|казино|apk|betting|master-vodoved|rudentordu|zvukovoe-oborudovanie|hydrostrelka|гидрострелка/i;
const MIN_FORM_TIME_MS = 2500;
const MAX_FORM_TIME_MS = 6 * 60 * 60 * 1000;

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const corsHeaders = getCorsHeaders(origin);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method === 'GET' || request.method === 'HEAD') {
      return statusPage(request.method === 'HEAD');
    }

    if (request.method !== 'POST') {
      return json({ ok: false, error: 'method_not_allowed' }, 405, corsHeaders);
    }

    if (!ALLOWED_ORIGINS.has(origin)) {
      return json({ ok: false, error: 'origin_not_allowed' }, 403, corsHeaders);
    }

    if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
      return json({ ok: false, error: 'worker_not_configured' }, 500, corsHeaders);
    }

    let data;
    try {
      data = await parsePayload(request);
    } catch (error) {
      return json({ ok: false, error: 'invalid_payload' }, 400, corsHeaders);
    }

    const lead = normalizeLead(data);
    const validationError = validateLead(lead);
    if (validationError) {
      return json({ ok: false, error: validationError }, 422, corsHeaders);
    }

    const [telegramResult, emailResult] = await Promise.all([
      sendTelegram(lead, env),
      sendEmail(lead, env),
    ]);

    if (!telegramResult.ok) {
      return json({ ok: false, error: 'telegram_api_rejected' }, 502, corsHeaders);
    }

    return json({ ok: true, telegram: true, email: emailResult.ok }, 200, corsHeaders);
  },
};

function getCorsHeaders(origin) {
  const allowedOrigin = ALLOWED_ORIGINS.has(origin) ? origin : 'http://mbm-trans.ru';
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Accept, Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

async function parsePayload(request) {
  const contentType = request.headers.get('Content-Type') || '';

  if (contentType.includes('application/json')) {
    return request.json();
  }

  const form = await request.formData();
  return Object.fromEntries(form.entries());
}

function normalizeLead(data) {
  return {
    name: String(data.name || '').trim().slice(0, 120),
    phone: formatPhone(data.phone),
    email: String(data.email || '').trim().slice(0, 160),
    message: String(data.message || '').trim().slice(0, 2000),
    page: String(data.page || 'Сайт').trim().slice(0, 160),
    website: String(data.website || '').trim().slice(0, 200),
    leadStartedAt: Number(data.lead_started_at || 0),
  };
}

function validateLead(lead) {
  const digits = phoneDigits(lead.phone);
  if (!lead.name) return 'name_required';
  if (digits.length !== 11 || digits.charAt(0) !== '7') return 'invalid_phone';
  if (lead.email && !EMAIL_PATTERN.test(lead.email)) return 'invalid_email';
  if (isSpamLead(lead)) return 'spam_rejected';
  return '';
}

function isSpamLead(lead) {
  if (lead.website) return true;

  const now = Date.now();
  if (!lead.leadStartedAt || lead.leadStartedAt > now) return true;
  const formTime = now - lead.leadStartedAt;
  if (formTime < MIN_FORM_TIME_MS || formTime > MAX_FORM_TIME_MS) return true;

  const combined = `${lead.name}\n${lead.email}\n${lead.message}`;
  if (URL_PATTERN.test(combined)) return true;
  if (SPAM_PATTERN.test(combined)) return true;
  if (/<[^>]+>/.test(combined)) return true;
  return false;
}

function phoneDigits(value) {
  let digits = String(value || '').replace(/\D/g, '');
  if (digits.charAt(0) === '8') digits = `7${digits.slice(1)}`;
  if (digits && digits.charAt(0) !== '7') digits = `7${digits}`;
  return digits.slice(0, 11);
}

function formatPhone(value) {
  const digits = phoneDigits(value);
  if (!digits) return '';
  const local = digits.charAt(0) === '7' ? digits.slice(1) : digits;
  const parts = ['+7'];
  if (local.length > 0) parts.push(` (${local.slice(0, 3)}`);
  if (local.length >= 3) parts[parts.length - 1] += ')';
  if (local.length > 3) parts.push(` ${local.slice(3, 6)}`);
  if (local.length > 6) parts.push(`-${local.slice(6, 8)}`);
  if (local.length > 8) parts.push(`-${local.slice(8, 10)}`);
  return parts.join('');
}

function formatTelegramMessage(lead) {
  return [
    'Новая заявка с сайта МБМ-Транс',
    `Страница: ${lead.page}`,
    `Имя: ${lead.name}`,
    `Телефон: ${lead.phone}`,
    lead.email ? `E-mail: ${lead.email}` : '',
    lead.message ? `Сообщение: ${lead.message}` : '',
  ].filter(Boolean).join('\n');
}

async function sendTelegram(lead, env) {
  const response = await fetch(
    `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text: formatTelegramMessage(lead),
        disable_web_page_preview: true,
      }),
    },
  );

  const result = await response.json().catch(() => null);
  return { ok: response.ok && result && result.ok };
}

async function sendEmail(lead, env) {
  if (!env.MAIL_WEBHOOK_URL || !env.MAIL_WEBHOOK_SECRET) {
    return { ok: false };
  }

  const body = new URLSearchParams();
  body.set('name', lead.name);
  body.set('phone', lead.phone);
  body.set('email', lead.email);
  body.set('message', lead.message ? `${lead.message}\n\nСтраница: ${lead.page}` : `Страница: ${lead.page}`);

  const response = await fetch(env.MAIL_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-MBM-Lead-Secret': env.MAIL_WEBHOOK_SECRET,
    },
    body,
  });

  const result = await response.json().catch(() => null);
  return { ok: response.ok && result && (result.ok || result.success === true || result.success === '1') };
}

function json(payload, status, headers) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...headers,
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function statusPage(headOnly) {
  const html = `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <title>МБМ-Транс — Telegram relay</title>
  <style>
    :root{color-scheme:light;--blue:#0b4f91;--navy:#102235;--orange:#f26a2e;--muted:#5f7188;--line:#d9e5f1;--bg:#eef5fb}
    *{box-sizing:border-box}
    body{margin:0;min-height:100vh;display:grid;place-items:center;background:linear-gradient(135deg,#eef5fb,#fff);font-family:Inter,Arial,sans-serif;color:var(--navy)}
    main{width:min(720px,calc(100vw - 32px));padding:42px;border:1px solid var(--line);border-radius:28px;background:#fff;box-shadow:0 24px 70px rgba(16,34,53,.12)}
    .mark{display:inline-flex;align-items:center;gap:10px;margin-bottom:22px;color:var(--blue);font-weight:800;letter-spacing:.08em;text-transform:uppercase;font-size:13px}
    .mark:before{content:"";width:34px;height:3px;border-radius:999px;background:var(--orange)}
    h1{margin:0 0 14px;font-size:clamp(32px,5vw,52px);line-height:1.05}
    p{margin:0 0 18px;color:var(--muted);font-size:18px;line-height:1.65}
    .status{display:flex;align-items:center;gap:12px;margin:28px 0;padding:18px 20px;border-radius:18px;background:var(--bg);font-weight:800}
    .dot{width:12px;height:12px;border-radius:50%;background:#19a55b;box-shadow:0 0 0 7px rgba(25,165,91,.12)}
    code{padding:4px 8px;border-radius:8px;background:#f3f7fb;color:var(--blue)}
    a{color:var(--blue);font-weight:800;text-decoration:none}
    a:hover{text-decoration:underline}
  </style>
</head>
<body>
  <main>
    <div class="mark">МБМ-Транс</div>
    <h1>Telegram relay работает</h1>
    <p>Это служебный endpoint для форм сайта. Он принимает заявки методом <code>POST</code>, проверяет телефон и e-mail, затем отправляет заявку в Telegram-группу и на почту.</p>
    <div class="status"><span class="dot"></span><span>Worker опубликован и доступен</span></div>
    <p>Открывать клиентам эту страницу не нужно. Для проверки сайта используйте <a href="http://mbm-trans.ru/mbm-preview-2026/">скрытое превью</a> или GitHub Pages.</p>
  </main>
</body>
</html>`;

  return new Response(headOnly ? null : html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer',
    },
  });
}
