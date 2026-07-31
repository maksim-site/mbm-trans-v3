# Design QA

## Scope and evidence

- Ten preserved routes rendered from the local server on branch `redesign-v3`.
- Selected hero compared at the same `1280 x 800` viewport against `assets/concepts/style/b-cobalt-glass.png`.
- Comparison artifact: `assets/qa/v3-hero-comparison.png`.
- Responsive matrix: 320, 375, 390, 414, 768, 1000, 1024, 1280 and 1440 px.
- Mobile Lighthouse navigation audit: Accessibility 100, Best Practices 100, SEO 100, Agentic Browsing 100; 55 passed, 0 failed.

## P0 — identity, structure and truth

- Pass: original blue MBM logo renders at its intrinsic ratio inside the white identity plate on every route.
- Pass: all current route filenames, primary navigation labels, verified facts, project media, client logos, document files and legal copy remain present.
- Pass: no generated vehicle, invented project, fake video or third-party visual asset was introduced.
- Pass: all ten HTML files load the Cobalt Steel system with no horizontal document overflow and no console errors.
- Pass: active form endpoint is now same-origin `/api/leads`; no active Cloudflare, Google Fonts, Apple Maps or Google Maps request remains.

## P1 — visual system and interaction

- Pass: hero landmarks match the selected reference: logo plate, header/nav geometry, headline anchor, aligned 56 px CTA pair, proof cluster, route and real cargo crop.
- Pass: matte glass is constrained to navigation, controls, form cluster and lightbox controls; content cards stay solid.
- Pass: services, documents and projects use distinct asymmetric compositions.
- Pass: route-in-motion runs once and leaves all four steps readable; reduced-motion CSS renders the static result.
- Pass: project media, glass pointer highlight and press feedback do not gate content or rely on hover.
- Pass: client rail is manual scroll-snap with arrows/swipe and no autoplay.

## P2 — functional and responsive QA

- Pass: mobile drawer opens/closes, traps focus, returns focus, exposes the services accordion and works at the 1000 px transition width.
- Pass: FAQ keeps one disclosure open and synchronizes `aria-expanded`.
- Pass: certificate lightbox opens, locks body scroll, focuses the close control, closes by click and Escape, and restores focus.
- Pass: local lead-form validation, phone mask, consent and success state work without sending a request; resource log confirms zero `/api/leads` or `workers.dev` calls during preview.
- Pass: trailer picker returns both no-match and multi-match states against the 20-item catalogue.
- Pass: client arrows move the rail and touch widths preserve swipe overflow without document overflow.
- Pass: local asset audit found zero missing HTML/CSS assets; JavaScript syntax and `git diff --check` pass.

## Deployment boundary

- Local design/build is complete. Before publication, `/api/leads` must be implemented on the chosen Russian hosting and the privacy-policy wording should be reviewed against the final infrastructure. GitHub and hosting remain intentionally untouched until user approval.

final result: pass
