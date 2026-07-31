# Interaction blueprint

## Motion thesis

The site should feel heavy, precise and well-controlled. Motion explains route progression and gives controls physical response; it never makes the cargo or company claims feel fictional.

## Signature interaction — cargo on the route

- Trigger: the process section intersects at roughly 28%; animation runs once per page load.
- Sequence: the route line draws in 900 ms; the existing MBM trailer cutout travels from the first stage to the centre of the fourth stage in 2200 ms; the four stages activate at matching offsets.
- Geometry: a contained CSS pseudo-element with the local transparent trailer asset; no WebGL, scroll scrubbing or scroll-jacking.
- Completion: the trailer reaches the exact final-stage centre and fades, while the route and all four stages remain complete.
- Reduced motion: the line and stages render immediately and the trailer stays hidden.
- Mobile: the route becomes a vertical four-step list; the travelling trailer and horizontal line are removed.

## Supporting interaction 01 — service equipment micro-scenes

- Fine pointer hover and keyboard focus-within only: container shifts and exposes a door seam, the low-loader advances on a restrained road line, the crane makes a slight boom lift and the rail platform rolls along its track.
- Every card retains its full title, copy and link without activation; touch receives the complete static state on first paint.
- Movement stays between 10 and 24 px, with 420–700 ms custom ease-out and no looping.
- Reduced motion: all equipment remains static and fully visible.

## Supporting interaction 02 — container-door FAQ

- Native `details/summary` semantics remain intact, with only one answer open at a time.
- The answer reveals vertically in 280 ms while a ribbed container seam opens and the circular latch turns 45 degrees.
- The interaction works by click and keyboard, preserves `aria-expanded`, and never hides content from assistive technology.
- Reduced motion: state changes immediately with no height, opacity or latch animation.

## Global reveal language

- IntersectionObserver adds `.is-visible` once; default is 12–20 px translate plus opacity.
- Stagger only direct siblings and cap at 80 ms.
- Header state uses a hero sentinel IntersectionObserver, not a scroll event listener.
- Native anchor scrolling only; no inertial scroll engine.

## Navigation and controls

- Desktop dropdowns open on pointer intent and focus-within; they remain keyboard reachable.
- Mobile drawer traps focus while open, closes on Escape/backdrop/link and returns focus to menu button.
- FAQ synchronizes `open` and `aria-expanded`; close animation finishes before `open` is removed.
- Client rail uses explicit previous/next buttons and `scrollBy`; no automatic movement.
- Form feedback is text plus state color, never color alone.

## Performance limits

- No GSAP, Three.js, canvas or runtime image generation.
- Animate only transform, opacity and background-position/custom properties where supported.
- Maximum one signature and two supporting motion patterns, with no more than two visibly moving elements in a viewport.
- Lazy-load below-fold images, reserve dimensions and avoid layout shifts.
