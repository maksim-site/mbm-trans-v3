# Design QA

## Corrective pass scope

- User-directed regression pass on branch `redesign-v3` after visible issues were found in the first Cobalt Glass build.
- Primary desktop audit at `1280 x 720`; focused mobile audit at a real `390 x 844` iframe viewport; the rental service page was also checked independently.
- All ten active routes and both self-hosted font files returned HTTP 200 from the local server.
- Browser console finished with zero errors.

## P0 — identity, structure and truth

- Pass: the official MBM mark now uses the existing alpha PNG with no white or dark identity plate, no border and no generated redraw.
- Pass: the visual direction was corrected from neon cobalt to a restrained Corporate Steel system: graphite navy, muted steel blue, low-contrast borders and no decorative glow.
- Pass: Onest variable Cyrillic and Latin subsets are self-hosted in `assets/fonts`; the OFL license is included and the site makes no runtime font or CDN request.
- Pass: all current route filenames, primary navigation labels, verified facts, project media, client logos, certificates and legal copy remain present.
- Pass: the office address, Yandex widget, Yandex house link and both JSON-LD coordinate blocks now use `59.910989, 30.252743` for Межевой канал, 3к2.
- Pass: the previous site snapshot and the approved earlier redesign commit remain preserved in Git history; GitHub and hosting are untouched.

## P1 — visual system and interaction

- Pass: all buttons use restrained matte fills, a thin border and compact movement; the pointer-following white glare and boxed hero arrow were removed.
- Pass: the complete interface now uses one local Onest type system, including navigation, buttons, headings, labels and body copy.
- Pass: every service card is its own positioning context with a reserved media zone and a separate text scrim; geometric checks report no image/text overlap on desktop or mobile.
- Pass: the four-step route line and moving marker end at the exact centre of the Delivery icon; the marker then disappears into the endpoint instead of continuing into empty space.
- Pass: all four certificate cards and thumbnails use identical dimensions and document ratios at desktop, tablet and mobile breakpoints.
- Pass: the FAQ block is centred exactly in its content container while question and answer copy remains left aligned.
- Pass: the client strip now contains two equal logo sets and runs as a seamless continuous loop; it pauses on hover/focus and removes the duplicate set for reduced motion.
- Pass: the map card presents one unambiguous office address and the verified house point on both desktop and mobile.

## P2 — functional and responsive QA

- Pass: desktop and `390 px` mobile layouts have no horizontal document overflow.
- Pass: the mobile drawer opens with synchronized `aria-expanded`, overlay and body scroll lock.
- Pass: FAQ keeps one disclosure open and synchronizes `aria-expanded`.
- Pass: certificate lightbox opens, locks body scroll and closes from its visible close control.
- Pass: the continuous client track moves between timed samples and contains 40 cards across two equal sets.
- Pass: all ten JSON-LD blocks parse; the local HTML/CSS asset audit reports zero missing files.
- Pass: `node --check assets/js/site.js` and `git diff --check` pass.

## Deployment boundary

- Local design/build is complete. Before publication, `/api/leads` must be implemented on the selected Russian hosting and the privacy-policy wording should be reviewed against that final infrastructure.
- No GitHub push or hosting change was made.

final result: pass
