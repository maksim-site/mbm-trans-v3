# Style prompt pack

## Selected composition

- Selected by user: **B - RTL Motion**.
- Source composition: `.design-director/assets/concepts/composition-r2/b-rtl-motion.png`.
- Source prototype: `.design-director/prototypes/composition-r2/b-rtl-motion.html`.
- Identity correction: replace the JPEG logo inside a white box with the existing transparent official asset `assets/css/imgs/logo_f@2x.png`; preserve its intrinsic aspect ratio and keep it optically centered inside the same header anchor.

## Layout lock - P0

- Viewport: `1440 x 900`; local screenshots use the proportional `1280 x 800` canvas.
- Header geometry: 92 px floating header; 196 x 62 logo anchor left, centered navigation capsule, phone and 48 px circular action right.
- Hero family: one full-bleed real MBM cargo photograph.
- Hero grid: lower-left copy zone and lower-right proof/route zone.
- Text anchor: left edge 50 px at 1280 canvas, bottom 84 px; headline remains two lines.
- Text measure: headline max 790 px; supporting copy max 560 px.
- CTA topology: one 50 px primary button and one 50 px secondary button in a single row below the body copy.
- Proof: three values in one row at lower-right.
- Signature interaction: one horizontal route line below proof, with the marker near the final third.
- Fold: exact bottom of the hero; no next section.
- Primary image crop: `hero-vessel.webp`, center at approximately 46 percent vertically.
- Mass distribution: photograph fills the canvas; text and proof remain the only foreground masses.
- Mobile collapse: logo and action remain in the header, nav collapses, copy stacks above the image-bottom proof; no horizontal scrolling.

## Shared exact content

- Navigation: `О компании`, `Услуги`, `Проекты`, `Клиенты`, `Контакты`.
- Headline: `Сложный груз. Понятный маршрут.`
- Body: `Перевозка тяжеловесных и негабаритных грузов до 365 т собственным автопарком по России и СНГ.`
- Primary CTA: `Рассчитать перевозку`.
- Secondary CTA: `Смотреть проекты`.
- Proof: `20 лет`, `до 365 т`, `500+`.
- Route: `Погрузка`, `Контроль 24/7`, `Доставка`.

## Color-selection contract

- This round isolates color: grid, typography, font sizes, radii, component dimensions, copy and image crop are identical in A, B and C.
- Allowed variables are palette, photo color treatment, overlay density, surface color and route-marker glow color.
- The corrected transparent logo remains in the same `196 x 62` anchor in all variants; only the light variant recolors the white artwork to official MBM blue for contrast.

## Style fingerprints

| Field | A Brand Night | B Cobalt Steel | C Arctic Light |
|---|---|---|---|
| Value mode | dark natural | dark cool chromatic | high-key light |
| Background and surface | deep transport navy | blue-steel low-key glass | pale steel and white lacquer |
| Accent hue and role | MBM orange for headline, route and actions | cobalt/ice blue for headline and actions | MBM blue for headline and actions |
| Typography character | strong neutral grotesk | same locked neutral grotesk | same locked neutral grotesk |
| Image treatment | natural color under navy scrim | cooled and slightly desaturated | brighter, lower-contrast daylight |
| Component finish | restrained 4 px actions, dark capsule | same geometry, steel-blue surfaces | same geometry, white/navy surfaces |
| Graphic and motion tone | warm route pulse | crisp blue route pulse | quiet blue marker without glow |

## Final prompt A - Brand Night

Apply the **Brand Night** visual system to the locked B composition. Preserve every layout-lock item. Use a deep MBM navy photographic scrim, natural cargo colors, off-white type, MBM orange as the headline and route accent, and a darker accessible orange for clickable actions. Use the transparent white MBM logo without a separate white image background. Keep surfaces restrained, industrial and familiar. Motion tone: warm route pulse and slow photographic parallax. No new objects, labels or layout changes.

## Final prompt B - Cobalt Steel

Apply the **Cobalt Steel** visual system to the locked B composition. Preserve every layout-lock item. Cool and slightly desaturate the photograph, use blue-steel overlays, an ice-blue headline accent and an accessible deep-cobalt CTA. Use the transparent white MBM logo in the unchanged logo anchor. Navigation keeps the locked pill geometry and becomes a steel-blue translucent surface. Motion tone: precise blue marker pulse and clean directional transitions. No orange, new objects, labels or layout changes.

## Final prompt C - Arctic Light

Apply the **Arctic Light** visual system to the locked B composition. Preserve every layout-lock item. Keep the photograph full-bleed but brighten it under a pale steel lower scrim so the unchanged copy becomes dark navy. Use MBM blue as headline and action color, white/navy surfaces, and recolor the transparent white logo to official blue without changing its geometry. Motion tone: quiet blue route marker and minimal fade transitions. No new panels, objects, labels or layout changes.

## Architect and critic gate

- Layout lock: complete.
- Palette roles: coherent and production-feasible.
- Pairwise style distance: at least 4 of 7 fields for every pair.
- Logo correction: uses an existing transparent brand asset, not a redrawn mark.
- Contrast: CTA and hero copy checked in the rendered browser output; critical pairs range from `5.51:1` to `8.56:1`.
- Geometry audit: all measured anchors and component boxes are identical across A, B and C.
- Result: generated and ready for user style selection.

## Selected B refinement

- User selected **B - Cobalt Steel** and requested two identity/interface corrections before page-system expansion.
- Logo: use the existing header identity asset `assets/css/imgs/logo_h@2x.jpg` in its original blue color, with no filter or redraw. Render the intrinsic `466 x 176` source at `160 x 60.4` inside a centered `196 x 68` white identity anchor.
- CTA system: replace the sharp flat pair with restrained cobalt/navy glass. Both buttons share `54 px` height, `14 px` radius, one baseline, a subtle inner highlight and `blur(16px) saturate(135%)` backdrop treatment.
- Primary CTA remains visually dominant through a higher-opacity cobalt tint and contained arrow tile; secondary CTA remains dark translucent glass.
- The glass treatment is limited to interactive surfaces and navigation. It must not spread into decorative floating cards or obscure the authentic cargo photograph.
- Final merged reference: `assets/concepts/style/b-cobalt-glass.png`.
