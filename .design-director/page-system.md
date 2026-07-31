# Page system

## System promise

MBM Trans выглядит как современный оператор сложной логистики, а не как универсальный шаблон перевозчика. Вся система строится вокруг трёх вещей: реальный масштаб проектов, понятный маршрут работы и фирменный синий цвет. Стекло является тактильным слоем управления, а не декоративной темой контента.

## Global shell

- Один тёмный cobalt/navy theme на всех маршрутах; светлые поверхности допустимы только для оригинального логотипа, документов, логотипов клиентов и полей формы.
- Контейнер: максимум 1360 px, боковой отступ `clamp(20px, 4vw, 64px)`.
- Desktop header: плавающая 76 px панель, оригинальный синий `logo_h@2x.jpg` внутри белой identity plate; навигация, телефон и CTA остаются на одной линии.
- Mobile header: identity plate, кнопка телефона и menu button; drawer открывается без потери фокуса и закрывается по Escape.
- Skip link, логичный tab order и заметный focus ring обязательны.
- Footer сохраняет реквизиты, контакты, существующие маршруты и ссылку на политику.

## Home page

### 1. Hero / position and convert

- Full-bleed `hero-vessel.webp`, холодная синяя цветокоррекция и контролируемый navy scrim.
- Заголовок: «Сложный груз. Понятный маршрут.»; поддерживающий текст и факты `20 лет`, `до 365 т`, `500+`.
- Primary glass CTA «Рассчитать перевозку», secondary glass CTA «Смотреть проекты»; одинаковая высота и baseline, разная иерархия.
- Proof route «Погрузка — Контроль 24/7 — Доставка» расположен справа/снизу и не конкурирует с заголовком.

### 2. Expertise / why MBM

- Асимметричный split: крупное вертикальное реальное фото `about.webp` и редакционный текстовый блок.
- Один доказательный statement о полном цикле перевозки, компактные факты и ссылка на страницу компании.
- Никакой сетки из трёх одинаковых карточек.

### 3. Services / capability map

- Асимметричная 12-column композиция из четырёх услуг: доминирующая карточка негабаритных перевозок, две средние и одна горизонтальная железнодорожная.
- Каждая карточка использует существующую фотографию, короткое описание и явную ссылку; весь tile не маскируется под кнопку без accessible name.
- Desktop hover раскрывает изображение на 3–4%; touch получает тот же контент без hover-зависимости.

### 4. Process / signature route

- Тёмный глубокий cobalt блок с четырьмя сохранёнными этапами: заявка, расчёт/разрешения, перевозка/сопровождение, доставка/документы.
- Маркер один раз проходит по линии после входа блока в viewport и синхронно активирует этапы.
- Сами этапы видимы до, во время и после анимации; смысл не зависит от движения.

### 5. Documents / trust proof

- Один крупный документ и три поддерживающих превью в асимметричной сетке.
- Клик открывает существующий lightbox; документы не обрезаются (`object-fit: contain`) и имеют подписи.

### 6. Projects / real evidence

- Мозаика: один крупный кейс и четыре поддерживающих проекта с реальными изображениями.
- Короткий contained zoom/pan по hover/focus; без ложной кнопки play и без вымышленного видео.
- Ссылка ведёт на существующий индекс проектов.

### 7. FAQ / remove friction

- Одноколоночный accordion с сохранёнными вопросами и ответами.
- Только один пункт открыт одновременно на desktop; клавиатура и `aria-expanded` работают.

### 8. Clients / social proof

- Один ручной horizontal scroll-snap rail из существующих логотипов.
- Стрелки на desktop, swipe на touch; без autoplay и бесконечного marquee.
- Логотипы сохраняют пропорции на светлых neutral tiles.

### 9. Contact / conversion

- Split между реквизитами/каналами связи и матово-стеклянной формой.
- Сохраняются порядок и имена полей, mask/validation и текст согласия; action переведён на same-origin `/api/leads`, который будет подключён к российскому backend при переносе.
- Карта остаётся российской: Yandex и 2GIS; иностранные картографические переходы не выводятся.

## Internal routes

| Route | Pattern | Required preservation |
|---|---|---|
| `o-kompanii.html` | compact photo hero, editorial history split, facts, documents, CTA | factual company copy, documents, contacts |
| `kontejnernyie-perevozki.html` | service hero, capability bands, process, FAQ, CTA | service scope, form and SEO copy |
| `perevozka-negabaritnyix-gruzov.html` | service hero, oversized-load proof, process, projects, CTA | transport facts, project media, form |
| `texnika-v-arendu.html` | service hero plus dense equipment catalogue | all equipment records and picker logic |
| `zhd-perevozki.html` | service hero, rail capability, process, FAQ, CTA | service copy and inquiry fields |
| `nashi-proektyi.html` | varied project mosaic/grid | all current project images and captions |
| `nashi-klientyi.html` | responsive neutral logo field | every current client identity |
| `kontaktyi.html` | direct-contact hero, form and map | phone, email, address, consent and form names |
| `politika-konfidencialnosti.html` | readable dark document surface, 65–75ch | legal text verbatim |

## Responsive behavior

- `>= 1180`: full asymmetric grids and desktop header.
- `768–1179`: two-column services/projects where content allows; route labels wrap without overlap.
- `< 768`: single-column reading order, copy before media, header drawer, client swipe; CTA row stacks only if it cannot preserve 44 px targets.
- Explicit QA at 320, 375, 390/414, 768, 1024, 1280 and 1440 px; no horizontal document overflow.

## Content and compliance constraints

- Preserve current URLs, nav labels, legal text, verified proof and real media.
- Do not invent case metrics, partners, vehicles or locations.
- No third-party font, analytics, video, image or animation requests.
- Foreign-hosted form endpoint removed. Production form must stay on same-origin `/api/leads` and be backed by infrastructure in the Russian Federation.
