# Interaction blueprint

## Motion thesis

The site should feel heavy, precise and well-controlled. Motion explains route progression and gives controls physical response; it never makes the cargo or company claims feel fictional.

## Signature interaction — route in motion

- Trigger: the process section intersects at roughly 35%; animation runs once per page load.
- Sequence: line draws in 900 ms; one marker travels in 2200 ms with a controlled ease-in-out; four labels activate at matching offsets.
- Geometry: CSS custom properties and transforms only; no scroll scrubbing and no scroll-jacking.
- Completion: route remains fully drawn and all stages remain active.
- Reduced motion: line and stages render immediately; marker does not travel.
- Mobile: vertical/stepped route or a horizontally scrollable contained track, never wider than the viewport.

## Supporting interaction 01 — matte-glass controls

- Targets: primary/secondary CTAs, header controls, carousel arrows and form controls.
- Hover on fine pointers: 2 px lift, internal highlight shifts toward pointer, arrow moves 3 px; 180–240 ms custom ease-out.
- Press: `scale(0.975)` for 110–140 ms.
- Focus-visible: 2 px ice ring plus 3 px dark offset; no motion required to locate focus.
- Pointer highlight is driven by `pointermove` on the control itself and stored in `--mx/--my`; it never listens to document scroll.
- Reduced transparency: blur is removed and the control becomes an opaque cobalt/navy surface.

## Supporting interaction 02 — project media

- Fine pointer hover or keyboard focus: image scales to 1.035 and translates no more than 1.5%; title/arrow moves slightly.
- Touch: content is fully visible without activation; links work on first tap.
- Duration: 500–700 ms for media, 180–240 ms for labels.
- No autoplay, fake play icon, animated GIF, generated vehicle or infinite loop.

## Global reveal language

- IntersectionObserver adds `.is-visible` once; default is 12–20 px translate plus opacity.
- Stagger only direct siblings and cap at 80 ms.
- Header state uses a hero sentinel IntersectionObserver, not a scroll event listener.
- Native anchor scrolling only; no inertial scroll engine.

## Navigation and controls

- Desktop dropdowns open on pointer intent and focus-within; they remain keyboard reachable.
- Mobile drawer traps focus while open, closes on Escape/backdrop/link and returns focus to menu button.
- FAQ updates `aria-expanded` and panel visibility atomically.
- Client rail uses explicit previous/next buttons and `scrollBy`; no automatic movement.
- Form feedback is text plus state color, never color alone.

## Performance limits

- No GSAP, Three.js, canvas or runtime image generation.
- Animate only transform, opacity and background-position/custom properties where supported.
- Maximum two visibly moving elements in a viewport.
- Lazy-load below-fold images, reserve dimensions and avoid layout shifts.
