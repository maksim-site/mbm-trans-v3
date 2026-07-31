# Page system

## System promise

MBM Trans выглядит как современный оператор сложной логистики, а не как универсальный шаблон перевозчика. Вся система строится вокруг трёх вещей: реальный масштаб проектов, понятный маршрут работы и фирменный синий цвет. Стекло является тактильным слоем управления, а не декоративной темой контента.

## Global shell

- Один сдержанный graphite/navy theme на всех маршрутах; светлые поверхности допустимы только для документов, логотипов клиентов и полей формы.
- Контейнер: максимум 1360 px, боковой отступ `clamp(20px, 4vw, 64px)`.
- Desktop header: сразу видимая непрозрачная 80 px панель; очищенный от JPEG-фона оригинальный синий знак расположен без плашки, навигация и CTA остаются на одной линии.
- Mobile header: тот же оригинальный знак без плашки и menu button; полноэкранный drawer открывается без потери фокуса и закрывается по Escape.
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
- Desktop hover раскрывает не абстрактный эффект, а короткую предметную микро-сцену: створка контейнера, движение трала/вагона или работа крана. Touch получает тот же контент без hover-зависимости.

### 4. Process / signature route

- Тёмный глубокий cobalt блок с четырьмя сохранёнными этапами: заявка, расчёт/разрешения, перевозка/сопровождение, доставка/документы.
- Силуэт существующего трала один раз проходит по линии после входа блока в viewport, синхронно активирует этапы и точно останавливается у «Доставки».
- Сами этапы видимы до, во время и после анимации; смысл не зависит от движения.

### 5. Documents / trust proof

- Один крупный документ и три поддерживающих превью в асимметричной сетке.
- Клик открывает существующий lightbox; документы не обрезаются (`object-fit: contain`) и имеют подписи.

### 6. Projects / real evidence

- На главной: один крупный кейс и поддерживающие проекты с реальными изображениями. На странице архива: 45 работ, два ведущих кейса, строгая трёхколоночная сетка, фильтры по типу груза и поэтапное раскрытие.
- Короткий contained zoom/pan по hover/focus; без ложной кнопки play и без вымышленного видео.
- Ссылка ведёт на существующий индекс проектов.

### 7. FAQ / remove friction

- Одноколоночный accordion с сохранёнными вопросами и ответами; рёбра, центральный шов и круглая защёлка визуально отсылают к двери грузового контейнера.
- Только один пункт открыт одновременно; высота и прозрачность раскрываются мягко, клавиатура и `aria-expanded` работают.

### 8. Clients / social proof

- Один ручной horizontal scroll-snap rail из существующих логотипов.
- Стрелки на desktop, swipe на touch; без autoplay и бесконечного marquee.
- Логотипы сохраняют пропорции на светлых neutral tiles.

### 9. Contact / conversion

- Split между реквизитами/каналами связи и матово-стеклянной формой.
- Сохраняются порядок и имена полей, mask/validation и текст согласия; action переведён на same-origin `/api/leads`, который будет подключён к российскому backend при переносе.
- Карта остаётся российской: спокойный Yandex map layer без режима `whatshere`, отдельная точная метка по координатам офиса и внешние переходы в Yandex/2GIS; иностранные картографические переходы не выводятся.

## Internal routes

| Route | Pattern | Required preservation |
|---|---|---|
| `o-kompanii.html` | compact photo hero, editorial history split, facts, documents, CTA | factual company copy, documents, contacts |
| `kontejnernyie-perevozki.html` | service hero, capability bands, process, FAQ, CTA | service scope, form and SEO copy |
| `perevozka-negabaritnyix-gruzov.html` | service hero, oversized-load proof, process, projects, CTA | transport facts, project media, form |
| `texnika-v-arendu.html` | service hero plus dense equipment catalogue | all equipment records and picker logic |
| `zhd-perevozki.html` | service hero, rail capability, process, FAQ, CTA | service copy and inquiry fields |
| `nashi-proektyi.html` | structured filterable archive with two featured projects | all 45 current project images and captions |
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

## 2026-08-01 final page-system corrections

- Home hero: three verified legacy photographs rotate automatically in the order aircraft, tram, heavy cylindrical cargo; no manual selector and no repeated statistics band beneath it.
- Services: one closed-container visual replaces the rejected double-door composition; crane, low-loader and rail micro-scenes remain available without obscuring text.
- FAQ: the container-inspired numbered accordion stays, but disclosure transitions are coordinated rather than sequential.
- Oversize service: all 20 trailer records now carry representative real MBM fleet/project photography while retaining the existing dimensions and picker data.
- Projects: the hero uses the reactor transport image without a seam; archive media uses contained framing so complete loads remain visible.
- Clients remain as a continuous proof marquee on the home page, while the separate Clients route is removed from primary navigation and footer navigation. The existing route file is retained for compatibility.
- Exact original-colour header logo is unchanged; active favicon formats use the original blue logo on a white field.
