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

## 2026-08-01 complete mobile adaptation

- Pass: all nine active content routes were checked at `320`, `375`, `390` and `430 px`; document width equals viewport width, long headings wrap safely and no content element escapes the mobile canvas.
- Pass: the home and inner heroes, original logo, sticky header, full-screen navigation drawer and nested Services menu are usable at phone widths without covering page copy.
- Pass: landscape-phone rules were verified at `844 x 390`; hero content stays reachable, focal images remain centred and primary actions fit without horizontal clipping.
- Pass: compact mobile layouts were added for statistics, services, process, projects, certificates, clients, contact form, map and footer while preserving the approved desktop composition.
- Pass: touch controls meet a practical minimum target, project filters remain horizontally scrollable, the certificate lightbox fits the viewport and the two-column phone footer avoids the previous excessive height.
- Pass: the FAQ keeps one item open, changes items in one coordinated transition and gives the answer copy clear spacing below its divider.
- Pass: service and policy headings, trailer specifications, client names and legal copy have safe wrapping at `320 px`; all old fallback font declarations were normalized to the self-hosted Onest family.
- Pass: the Lenis anchor offset now follows the actual responsive header height and animated counters clamp their progress before the section enters view, preventing negative values.
- Pass: the final mobile browser pass found no missing real images, stuck reveal content, unexpected overflow or console warnings/errors; the `1440 x 900` desktop regression retained the approved layout.

## 2026-08-01 live crop and responsive-density correction

- Source visual: live [mbm-trans.ru](https://mbm-trans.ru/) home hero.
- Implementation screenshot: local `redesign-v3` home hero.
- Viewport: `1280 x 720` for the exact side-by-side reference, plus responsive checks from `320` to `1920 px`.
- Comparison image: `.design-director/assets/qa/live-crop-comparison-1280x720.png`.
- Pass: all three home photographs now follow the live site's crop contract — full-slot `cover`, centred subject focal point and no image mask, manual width inflation or internal top/bottom fields.
- Pass: the image rectangle covers the full hero at `320 x 844`, `390 x 844`, `620 x 900`, `720 x 900`, `860 x 700`, `861 x 700`, `1020 x 700`, `1440 x 700` and `1920 x 720`.
- Pass: the two hero actions remain content-sized (`252 px` and `190 px`) at phone widths instead of stretching to the viewport edge; related mobile section actions use the same content-sized rule.
- Pass: the full navigation remains visible from `861 px`; at `860 px` and below the existing accessible drawer takes over without header overflow.
- Pass: the proof strip is one compact four-cell row from `621 px`, is `132–134 px` high at standard desktop/tablet widths, and becomes a restrained two-row phone grid below that breakpoint.
- Pass: mobile section spacing, service-card height, process gaps and inner hero height were reduced without changing information architecture or removing proof.
- Pass: 45 route/viewport combinations across all nine content pages returned zero document overflow, broken images, heading overflow, header overflow, stretched hero actions or failed hero coverage checks.
- Pass: mobile menu open/close state, overlay, body lock and ARIA state remain synchronized; final browser console contains no warnings or errors.

final result: passed

## 2026-08-01 compact certificate rail

- Source visual: previous full-height certificate grid in `.design-director/assets/qa/v3-documents-1280.png`.
- Implementation screenshot: `.design-director/assets/qa/v3-documents-compact-1280.png`.
- Viewport: `1280 x 900`, with responsive checks at `390 x 844` and `320 x 760`.
- Comparison image: `.design-director/assets/qa/v3-documents-compact-comparison.png`.
- Pass: four tall document cards were replaced by one restrained horizontal rail; the section height at `1280 px` is `597 px` and each card is `182 px` high.
- Pass: three complete cards and the edge of the fourth are visible at desktop width, clearly communicating horizontal continuation without increasing page height.
- Pass: previous/next controls move exactly one card step, update their disabled states at both ends and retain keyboard focus styling.
- Pass: phone layouts show one complete card and a visible portion of the next; the rail begins on the shared `16 px` content line and does not create document-level horizontal overflow at `320` or `390 px`.
- Pass: touch scrolling and CSS scroll snapping work without JavaScript; JavaScript only adds the desktop controls and respects `prefers-reduced-motion`.
- Pass: selecting a certificate still opens the original document in the modal, the visible close control works and focus returns to the triggering card.
- Pass: all nine local routes respond, all cache tokens were refreshed, local document assets exist, JavaScript syntax and `git diff --check` pass, and the final browser console is empty.

final result: passed
