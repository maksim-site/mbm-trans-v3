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

## 2026-08-01 mobile certificate end-snap correction

- Source evidence: user capture at `393 x 852` showed the final card right-aligned with a clipped fragment of the preceding card remaining on the left.
- Implementation screenshot: `.design-director/assets/qa/v3-documents-mobile-end-393.png`.
- Comparison image: `.design-director/assets/qa/v3-documents-mobile-end-comparison.png`.
- P2 fixed: the mobile rail now reserves an exact trailing snap area derived from the responsive card width, so the final card reaches the same left content line as the first card.
- Pass: measured final-card alignment is `1 px` from the rail start at both `320` and `393 px`; document-level horizontal overflow remains `0 px`.
- Pass: the last position is exactly `scrollLeft 936 / maxScroll 936` at `393 px`, with the previous arrow enabled and next arrow disabled.
- Pass: the phone-only scrollbar is hidden while touch swipe, arrow controls, CSS snapping and keyboard behavior remain available.
- Pass: the final browser console is empty and cache tokens were refreshed on all nine active pages.

final result: passed

## 2026-08-01 Safari carousel and compact mobile controls

- Source evidence: the user reproduction at `393 x 852` showed a blank certificate position after the second arrow click, an oversized empty area below certificate content and a full-height mobile menu with unused space.
- P1 fixed: certificate cards no longer participate in the vertical reveal observer; all four documents remain rendered with computed `opacity: 1` before, during and after horizontal navigation in Safari-compatible layouts.
- P1 fixed: arrow navigation now resolves the exact target card coordinate instead of accumulating a relative `scrollBy`, and resize/initialization normalize any preserved intermediate position.
- Pass: at `393 px`, the four arrow positions are exactly `0 / 312 / 624 / 936`; at `320 px`, they are `0 / 268 / 536 / 804`. The final card is `1 px` from the shared left rail line at both widths.
- Pass: mobile certificate cards now size to their image and copy instead of stretching the second grid row; the rail is `147 px` high and cards are `130–133 px`, down from the reproduced `204 px` rail and `190 px` cards.
- Pass: the `1280 x 900` regression keeps all four cards at an equal `142 px`, a `156 px` rail, working end controls and zero document overflow.
- Pass: the phone menu is a compact top panel below the persistent branded header. Its closed-services height is `221 px` at both `393 x 852` and `320 x 760`; the expanded Services state is `422 px` and remains inside the viewport.
- Pass: the original logo remains visible above the panel, background scroll is locked while the menu is open, focus/ARIA state and overlay dismissal remain synchronized, and document overflow is `0 px`.
- Pass: mobile browser console is empty, cache tokens are refreshed on all nine active routes, JavaScript syntax and `git diff --check` pass.

final result: passed

## 2026-08-01 mobile hero image art direction

- Source evidence: the user capture at `393 x 852` showed the `1600 x 593` tram photograph being forced through a full-height `cover` slot, leaving only a narrow central fragment of the vehicle visible.
- P1 fixed: below `720 px`, the hero now separates image presentation from vertical fill. The original unedited source is shown as a centred sharp foreground frame, while a dark restrained backdrop made from the same local image fills the remaining hero height.
- Pass: the aircraft, tram and heavy-cargo subjects were each visually checked at `393 x 852`; all primary cargo and vehicle silhouettes remain visible and the foreground frames retain their natural aspect ratios.
- Pass: at `393 px`, the aircraft/tram frame exposes `81%` of the source width and the heavy-cargo frame exposes `91%`; the previous tall `cover` treatment exposed roughly one fifth of the wide source.
- Pass: the `320 x 760` fallback keeps the aircraft and truck visible, preserves content-sized actions and has `0 px` document overflow.
- Pass: the `1280 x 720` regression still uses the approved full-height centred `cover` treatment with no mask or layout change.
- Pass: all three original local images load at their expected `1600 px` natural width, the updated stylesheet token is active on all nine content routes, `site.js` syntax and `git diff --check` pass, and the local server recorded no failed requests during QA.

final result: passed

## 2026-08-02 responsive hero crop and contact cleanup

- Source evidence: user captures at `670 x 852` and `800 x 852` exposed opposite crop failures: the smaller layout showed the photograph too timidly, while the wider compact layout cropped away most of the cargo.
- P1 fixed: the hero now has separate art-direction ranges instead of one universal compact crop. At `670 px` the photograph is enlarged with a restrained edge crop; at `800 px` the wider frame preserves the vehicle and cargo silhouette.
- Pass: `1181 x 852` and `1280 x 852` retain the compact image stage, while `1280 x 720` intentionally returns to the approved full-height desktop cover treatment; all three checks report `0 px` document overflow.
- Pass: at `670 x 852` and `800 x 852`, the image-to-copy transition is continuous and the `Проектная логистика` label starts immediately below the faded photo edge.
- Pass: all three local hero images load at their expected `1600 px` natural width; the responsive stage remains identical between slides at phone widths.
- Pass: the projects page contains no visible archive terminology and now reports `45 выполненных перевозок`.
- Pass: the map card contains the embedded Yandex map and address only, with no duplicate external-map buttons; iframe interaction is enabled.
- Pass: the contact section spacing is reduced and the calculation card uses a restrained dark surface with a white call-to-action label.
- Pass: stylesheet cache tokens match on all nine active pages, mobile contacts and projects have `0 px` document overflow, and the final browser console contains no warnings or errors.

final result: passed

## 2026-08-02 navigation, favicon and contact alignment simplification

- Source evidence: user capture at approximately `1600 x 1000` showed the application card starting well below the `Контакты` heading, plus an unreadable full-logo favicon at small sizes.
- Implementation screenshot: `.design-director/assets/qa/contact-form-aligned-1600.jpg`.
- Comparison image: `.design-director/assets/qa/contact-form-alignment-comparison.png`.
- P1 fixed: the contact section is now one semantic two-column grid; the form card and left heading wrapper share the exact same top coordinate, and the form title aligns visually with the `Контакты` heading.
- Pass: at `1600 x 1000`, measured form-to-heading-wrapper offset is `0 px`; the previous large empty desktop band is gone without negative margins.
- Pass: at `393 x 852`, contact information and the form stack in a clear single-column order, the form is `361 px` wide and document overflow is `0 px`.
- Pass: the favicon is a deterministic white square with only the blue `МБМ` lettermark; the central `Б` is deliberately taller, and the resulting SVG, 32 px PNG, 180 px touch icon and ICO all use the same geometry.
- Pass: every active navigation and footer `О компании` link now resolves to the home `#about` section; the legacy `o-kompanii.html` route immediately redirects there and was removed from the sitemap.
- Pass: the home certificate section and its lightbox markup are removed; `Как мы работаем` now flows directly into `Наши проекты` across a single divider with no blank section.
- Pass: all eight content routes checked at `393 x 852` have `0 px` overflow, no broken images, the new favicon reference and the correct home-about target; final browser console contains no warnings or errors.

final result: passed

## 2026-08-02 exact About anchor and live-favicon inversion

- Source visual: user-approved `Снимок экрана — 2026-08-02 в 15.35.34.png`, normalized from `2880 x 1800` to `1440 x 900`.
- Implementation screenshot: `.design-director/assets/qa/about-anchor-implementation-1440x900.png`.
- Comparison image: `.design-director/assets/qa/about-anchor-comparison.png`.
- P2 fixed: the `О компании` desktop anchor now advances an additional `108 CSS px`, which is the exact `216 physical px` displacement measured between the user's before and approved screenshots.
- Pass: the visible title starts at approximately `136 px` in the implementation and `136.5 px` in the normalized source; the photo top differs by only a few pixels and the complete composition remains unobscured by the sticky header.
- Pass: the correction is target-specific and wide-screen-only, so `Контакты`, `Проекты`, `Услуги` and phone navigation retain their existing offsets. At `393 x 852`, `#about` starts below the `75 px` header, the menu closes after navigation and document overflow is `0 px`.
- Pass: both direct header navigation and the compatibility `o-kompanii.html` redirect settle at the same `#about` coordinate; final browser console is empty.
- Pass: the favicon geometry was fetched from the current public `mbm-trans.ru/assets/favicon.svg` source. Only its two color roles were exchanged: the original white `МБМ` lettermark is now `#005195`, and the original blue field is now white.
- Pass: SVG, `32 x 32` PNG, `180 x 180` Apple icon and both ICO copies share the same inverted live-site geometry; all active pages use the refreshed favicon token.
- Pass: JavaScript syntax, `git diff --check`, local favicon responses and asset formats pass.

final result: passed

## 2026-08-02 pre-migration mobile and interaction polish

- Reference behavior: the live AET v6 client rail was inspected in-browser and in its local source. MBM now uses the same two-set continuous loop, `requestAnimationFrame` movement, pointer capture, drag velocity, inertia, loop normalization, visibility reset and reduced-motion fallback.
- Pass: the lead-consent control is a real `22 x 22 px` checkbox with aligned copy, checked/focus/error states and no inherited `54 px` input height. Local-network form testing reports success without transmitting entered data.
- Pass: the mobile menu uses one animated three-line control, a compact content-sized panel, short staggered item motion, an animated Services disclosure, overlay/body lock, focus trapping and synchronized `aria-hidden`, `aria-expanded` and `inert` states.
- Pass: menu geometry was checked at `393`, `670` and `800 px`; full corporate navigation returns at `861 px`. All boundary checks report `0 px` document overflow.
- Pass: active inner pages use a labelled back arrow instead of `Главная / …` breadcrumbs. The Projects return target settles below the persistent header through the existing Lenis anchor path.
- Pass: eight content routes across seven widths (`320 / 393 / 670 / 800 / 861 / 1020 / 1280`) produced 56 clean states with no horizontal overflow, broken images or breadcrumb remnants.
- Pass: semantic `main` landmarks, sequential footer headings and canonical links are present on all active content routes. Mobile Lighthouse on both Home and Projects scores `100` for accessibility, best practices, SEO and agentic browsing; desktop Home scores the same.
- Pass: the same-origin `/api/leads/` PHP endpoint rejects cross-origin requests, validates form timing and consent, makes no external HTTP request and hands mail to the hosting server. `php -l`, validation-path checks, `node --check`, HTML structural checks and `git diff --check` pass.
- Pass: the deployment guide contains a narrow production allowlist, explicit exclusions for old archives/build tooling/Cloudflare code, Russian-hosting and mail requirements, and a backup/preview/rollback checklist.
- Pass: the local server is bound to `0.0.0.0:4173` for phone review. GitHub and the production domain remain untouched.

final result: passed

## 2026-08-02 technical SEO and release-candidate QA

- Backup boundary: no duplicate download was created. Existing local sources `../original`, `old-site-backup-2026-06-14` and the Git history were verified before release work.
- Pass: six public landing pages each contain one title, one description, one canonical URL, one H1, index/follow directives, Open Graph, Twitter Card and valid Schema.org JSON-LD.
- Pass: the sitemap contains exactly the six intended indexable URLs; compatibility, privacy and 404 pages are excluded and carry `noindex`.
- Pass: `robots.txt` identifies the canonical host and sitemap, excludes the same-origin lead API and local archive paths, and normalizes common campaign parameters for Yandex.
- Pass: the new social link card is `1200 x 630`, uses the exact original blue MBM logo and current 20-year / 365-tonne positioning; the obsolete orange 10-year / 200-tonne artwork is gone.
- Pass: the inverted live-site favicon geometry remains the browser icon; matching `192 x 192` and `512 x 512` application icons and a Russian-language web manifest are present.
- Pass: Apache release rules enforce HTTPS and the apex host, collapse `/index.html`, preserve old About/Contacts/Clients routes as 301 section redirects, serve a custom responsive 404 and add compression, caching and safe baseline headers.
- Pass: the local mobile Lighthouse navigation audit scores `100` for accessibility, best practices, SEO and agentic browsing with zero failed audits.
- Pass: the local performance trace reports `299 ms` LCP and `0.00` CLS without CPU or network throttling; this is a regression check, not a prediction of the future hosting response time.
- Pass: final `393 x 852` and `1440 x 900` browser checks show no horizontal overflow, missing images, external script CDN requests or console warnings/errors.
- Pass: `node tools/verify-release.mjs`, JavaScript syntax checks, PHP lint, XML validation and `git diff --check` all pass.
- Release boundary: the current live server reports PHP 5.5.5, while the safe same-origin form requires PHP 8.0+. Production replacement therefore remains gated on a Russian PHP 8+ preview host, automatic SSL and one real mail-delivery test.

final result: passed with hosting gate
