# Experience direction

## Design read

Reading this as: эволюционный редизайн многостраничного B2B-сайта для руководителей логистики, снабжения и проектов, с индустриальной trust-first подачей и одной содержательной транспортной механикой.

## Working dials

- Current site estimate: design variance 4/10; motion intensity 1/10; visual density 6/10.
- Redesign target: design variance 6/10; motion intensity depends on the selected tier below; visual density 4/10.
- Redesign mode: targeted evolution. Сохраняем логотип, URL, информационную архитектуру, реальные доказательства и смысл текстов; обновляем типографику, ритм, цвет, media treatment и motion layer.

## Decision status

- Current stage: experience selection.
- Director recommendation: Expressive.
- User choice: awaiting selection.

## Candidate 01 — Core / polished corporate

- Motion intensity: 2/10.
- Signature idea: спокойная смена кадров hero и короткое появление доказательств по мере прокрутки.
- Supporting patterns: hover/focus состояния карточек; управляемая статичная лента клиентов без автодвижения.
- Smooth scroll: native `scroll-behavior: smooth` для якорей, без инерционного scroll engine.
- Media: только фотографии и статичные постеры.
- Trade-off: максимально быстрый и надёжный вариант, но меньше ощущения уникальности.

## Candidate 02 — Expressive / route in motion — recommendation

- Motion intensity: 5/10.
- Signature interaction: тонкая маршрутная линия проходит через блок процесса. Небольшой маркер-тягач движется по ней от «Заявки» до «Доставки», колёса вращаются только во время движения, а реальные этапы активируются по scroll.
- Content purpose: механика не украшает фон, а быстро объясняет, как MBM Trans ведёт сложную перевозку от расчёта до закрывающих документов.
- Supporting pattern 01: 2–3 карточки проектов получают короткий micro-video loop длительностью 3–5 секунд. На desktop он запускается по hover или отдельной кнопке preview, на touch — по tap. До запуска и после паузы показывается исходная фотография.
- Supporting pattern 02: один logo rail на странице показывает реальные клиентские логотипы. Есть ручные стрелки, pause, остановка при hover/focus и полностью статичная версия при `prefers-reduced-motion`.
- Smooth scroll: только native scroll и `scroll-behavior: smooth` для якорей. Инерционный scroll engine не нужен.
- Asset route: micro-video делаем из 2–3 существующих сильных фотографий через локальный 2.5D parallax, маски, свет и лёгкое движение камеры. Не генерируем вымышленные машины, грузы или маршруты и не деформируем логотипы.
- Trade-off: требует производства нескольких качественных loops и тщательного mobile/performance QA, но не требует настоящего 3D или новых съёмок.

## Candidate 03 — Immersive / transport scene

- Motion intensity: 8/10.
- Signature interaction: WebGL-сцена с тягачом, тралом и негабаритным грузом, которые проходят по условному маршруту при scroll.
- Supporting patterns: минимальные section reveals; никаких дополнительных декоративных сцен.
- Asset requirement: точная `.glb/.gltf` модель техники и груза, корректные материалы, права на публикацию и poster fallback.
- Current readiness: blocked by missing 3D assets; generic or AI-distorted truck is not acceptable as a truthful company asset.
- Trade-off: самый заметный вариант, но дороже, тяжелее и сложнее в поддержке; не соответствует запросу на умеренное обновление.

## Recommendation rubric

| Criterion | Score | Reason |
|---|---:|---|
| Spatial product value | 2 | Техника, груз и маршрут являются сутью услуги |
| Narrative value | 2 | Процесс естественно раскладывается от заявки до доставки |
| Asset readiness | 1 | Есть фото, но нет точных видео и 3D-моделей |
| Brand fit | 1 | Motion усилит масштаб, если останется сдержанным |
| Performance headroom | 1 | Нужна быстрая работа на мобильных и офисных устройствах |
| Maintenance capacity | 1 | Нежелательна сложная сцена, требующая постоянной поддержки |
| Total | 8 | Expressive |

## Constraints shared by all candidates

- Не скрывать CTA или контент до завершения анимации.
- Не использовать scroll-jacking.
- Не полагаться только на hover.
- UI-анимации держать в диапазоне 150–300 мс; длиннее могут быть только объясняющие media-сцены.
- Для входа использовать быстрый custom ease-out, для движения объекта по экрану — ease-in-out; не использовать `ease-in`.
- Анимации делать преимущественно через `transform` и `opacity`.
- Pressable-элементы получают короткий `scale(0.97–0.98)` active feedback.
- Максимум 1–2 заметно движущихся элемента в одном viewport.
- Не использовать `transition: all`, бесконечное вращение колёс, декоративный параллакс на каждом блоке или несколько marquees.
- Все шрифты, видео, изображения и скрипты загружать с `mbm-trans.ru`.
- Для `prefers-reduced-motion` показывать статичный эквивалент.
- Hover-motion включать только при `(hover: hover) and (pointer: fine)`.
- Тяжёлые media загружать лениво, резервировать их размеры и ставить на паузу за пределами viewport.
