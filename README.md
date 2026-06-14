# МБМ-Транс — редизайн сайта (превью)

Статический предпросмотр нового дизайна сайта [mbm-trans.ru](http://mbm-trans.ru)
перед переносом в MODX. Только визуал/вёрстка, контент исходный.

- `index.html` — главная
- `o-kompanii.html`, `*-perevozki.html`, `nashi-proektyi.html`, `novosti.html`,
  `nashi-klientyi.html`, `kontaktyi.html` — внутренние страницы
- `assets/` — стили, изображения (WebP), логотипы

## Заявки в Telegram

Формы отправляют данные в `telegram-lead.php`. Токен бота и `chat_id` нельзя хранить
в HTML/JS или коммитить в GitHub — задайте их на PHP-сервере как переменные окружения:

- `MBM_TELEGRAM_BOT_TOKEN`
- `MBM_TELEGRAM_CHAT_ID`

На GitHub Pages PHP не выполняется, поэтому отправка заявок заработает после переноса на
сервер с PHP/MODX или после подключения отдельного backend-endpoint.

Сгенерировано с помощью frontend-design и ui-ux-pro-max.
