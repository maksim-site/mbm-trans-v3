# Design QA

## Final corrective pass scope

- User-directed regression pass on branch `redesign-v3` after visible issues were found in the first Cobalt Glass build.
- Desktop audits at `1024`, `1280` and `1440`; focused mobile audit at `390 x 844`; home, projects and the rental service page were checked independently.
- All ten active routes and both self-hosted font files returned HTTP 200 from the local server.
- Browser console finished with zero errors.

## P0 — identity, structure and truth

- Pass: the original MBM JPEG was converted deterministically to a transparent PNG using its exact source blue `#025194`; the mark has no plate, white fringe, border, redraw or recolouring.
- Pass: the visual direction was corrected from neon cobalt to a restrained Corporate Steel system: graphite navy, muted steel blue, low-contrast borders and no decorative glow.
- Pass: Onest variable Cyrillic and Latin subsets are self-hosted in `assets/fonts`; the OFL license is included and the site makes no runtime font or CDN request.
- Pass: all current route filenames, primary navigation labels, verified facts, project media, client logos, certificates and legal copy remain present.
- Pass: the office address, neutral Yandex widget, external Yandex house link, custom centred marker and both JSON-LD coordinate blocks use `59.910989, 30.252743` for Межевой канал, 3к2; the intrusive `whatshere` balloon is removed.
- Pass: the previous site snapshot and the approved earlier redesign commit remain preserved in Git history; GitHub and hosting are untouched.

## P1 — visual system and interaction

- Pass: all buttons use restrained matte fills, a thin border and compact movement; the pointer-following white glare and boxed hero arrow were removed.
- Pass: the complete interface now uses one local Onest type system, including navigation, buttons, headings, labels and body copy.
- Pass: every service card is its own positioning context with a reserved media zone and a separate text scrim; geometric checks report no image/text overlap on desktop or mobile.
- Pass: service hover/focus uses four restrained object-led micro-scenes: container door, moving trailer, working crane and moving rail platform; no loop runs when idle.
- Pass: the four-step route line and moving trailer end at the exact centre of the Delivery icon; the vehicle docks and fades instead of continuing into empty space.
- Pass: all four certificate cards and thumbnails use identical dimensions and document ratios at desktop, tablet and mobile breakpoints.
- Pass: the FAQ block is centred exactly in its content container while question and answer copy remains left aligned.
- Pass: the client strip now contains two equal logo sets and runs as a seamless continuous loop; it pauses on hover/focus and removes the duplicate set for reduced motion.
- Pass: the map card presents one unambiguous office address and the verified house point on both desktop and mobile.

## P2 — functional and responsive QA

- Pass: desktop and `390 px` mobile layouts have no horizontal document overflow.
- Pass: the mobile drawer opens with synchronized `aria-expanded`, overlay and body scroll lock.
- Pass: FAQ uses a container-door/latch motif, keeps one disclosure open, animates measured height/opacity and synchronizes `aria-expanded`.
- Pass: projects archive exposes all 45 existing records through seven accessible filters, starts with 12 items, reveals more in batches and uses a deterministic 2+3-column hierarchy instead of a random mosaic.
- Pass: certificate lightbox opens, locks body scroll and closes from its visible close control.
- Pass: the continuous client track moves between timed samples and contains 40 cards across two equal sets.
- Pass: all ten JSON-LD blocks parse; the local HTML/CSS asset audit reports zero missing files.
- Pass: desktop and mobile Lighthouse audits score 100 for accessibility, best practices, SEO and agentic browsing.
- Pass: `node --check assets/js/site.js`, Python logo-builder compilation, HTML validation and `git diff --check` pass.

## Deployment boundary

- Local design/build is complete. Before publication, `/api/leads` must be implemented on the selected Russian hosting and the privacy-policy wording should be reviewed against that final infrastructure.
- No GitHub push or hosting change was made.

final result: pass

## 2026-08-01 follow-up QA

- Pass: hero has no selector controls, follows the verified aircraft → tram → heavy-cargo automatic order, fills the viewport and uses centred non-distorting crops.
- Pass: the floating hero statistics and all decorative eyebrow dashes are gone; the exact saved animated four-cell proof band appears once beneath the hero.
- Pass: the container card contains one image; the crane contains no synthetic cable or striped load; service copy remains clear of media.
- Pass: FAQ switching leaves exactly one disclosure open and synchronizes `aria-expanded` after a single coordinated 280 ms transition.
- Pass: the trailer catalogue exposes all 20 records as compact text/specification cards with no rejected photographs or missing data.
- Pass: the projects hero has no visible seam, all 45 archive records remain available, and project images use `object-fit: contain`.
- Pass: the separate Clients item is absent from all primary/footer navigation while the home proof marquee and legacy route remain.
- Pass: the Yandex widget displays a single point at `30.252743, 59.910989`; exact house links remain Yandex and 2GIS only.
- Pass: active favicon links use exact raster logo compositions on white; the header logo has no CSS filter or surrounding plate.

## 2026-08-01 contact, scroll and proof-strip correction

- Pass: the statistics block was restored directly from saved commit `41fe2d1`; browser samples captured intermediate animated values and the final `20 / 365 / 500 / 5` state.
- Pass: no duplicate figure group remains in the hero and no legacy `hero-metrics` markup remains in active source.
- Pass: all active navigation, CTA and footer contact links resolve to the single home `#contacts` section; `kontaktyi.html` is a `noindex,follow` compatibility redirect.
- Pass: the locally vendored Lenis 1.3.23 bundle provides restrained wheel smoothing and one controlled anchor path without a CDN request; reduced-motion retains the native fallback.
- Pass: desktop and `390 x 844` mobile contact navigation settles with a 92 px header clearance and no horizontal overflow.
- Pass: the heavy-load feature now uses an unambiguous weight outline; the crane pseudo cable/load and all trailer-card photo pseudo-elements compute to `none`.
