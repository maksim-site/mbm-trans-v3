# МБМ-Транс — редизайн сайта (превью)

Статический предпросмотр нового дизайна сайта [mbm-trans.ru](http://mbm-trans.ru)
перед переносом в MODX. Только визуал/вёрстка, контент исходный.

- `index.html` — главная
- `o-kompanii.html`, `*-perevozki.html`, `nashi-proektyi.html`,
  `nashi-klientyi.html`, `kontaktyi.html` — внутренние страницы
- `assets/` — стили, изображения (WebP), логотипы

## Заявки в Telegram

Формы отправляют данные в Cloudflare Worker:

- `https://mbm-trans-leads.5br6b6c4st.workers.dev`
- код Worker: `cloudflare/telegram-relay/src/worker.js`

По прямому открытию Worker показывает служебную страницу статуса. Заявки
принимаются только методом `POST` из форм сайта.

Токен бота и `chat_id` нельзя хранить в HTML/JS или коммитить в GitHub. Сейчас они
заданы как Cloudflare secrets:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

PHP-обработчик `telegram-lead.php` оставлен как резервный вариант для будущего
переноса на нормальный PHP-хостинг. Для него секреты задаются как переменные окружения:

- `MBM_TELEGRAM_BOT_TOKEN`
- `MBM_TELEGRAM_CHAT_ID`

Если переменные окружения на хостинге недоступны, скопируйте
`telegram-config.example.php` в `telegram-config.php`, заполните `bot_token` и
`chat_id`, затем загрузите этот файл рядом с `telegram-lead.php`. Файл
`telegram-config.php` добавлен в `.gitignore` и не должен попадать в GitHub.

Чтобы получить `chat_id` тестовой группы, добавьте бота в группу и отправьте
команду `/start` или любое сообщение с упоминанием бота, затем запросите
`getUpdates` у Telegram Bot API и возьмите `message.chat.id`.

На GitHub Pages PHP не выполняется, но отправка заявок работает через Cloudflare Worker.

Важно для текущего хостинга `mbm-trans.ru`: сервер отвечает как `PHP/5.5.5` с
`OpenSSL 0.9.8`, а Telegram Bot API требует современный TLS. На таком окружении
прямой запрос к `api.telegram.org` завершается ошибкой TLS. Рабочие варианты:
обновить PHP/OpenSSL на хостинге или поставить небольшой HTTPS-relay/backend,
где хранится токен бота и который уже отправляет заявки в Telegram.

## Скрытое превью в MODX

Для проверки на боевом сервере без публикации как основного сайта создайте ресурс с
неочевидным alias, например `new-design-preview-2026`, отключите «Показывать в меню»
и добавьте в `<head>`:

```html
<meta name="robots" content="noindex,nofollow">
```

Файлы `assets/` и HTML-страницы нужно загрузить рядом с превью-страницей. Для текущего
варианта `telegram-config.php` на сервере не нужен: формы уходят в Cloudflare Worker.
После проверки тот же шаблон можно перенести на главную.

Сгенерировано с помощью frontend-design и ui-ux-pro-max.
