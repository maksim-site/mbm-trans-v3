# Style QA

## Rendered candidates

| Candidate | Render | Palette intent | Layout lock | Logo | Contrast | Decision |
|---|---|---|---|---|---|---|
| A - Brand Night | `assets/concepts/style/a-brand-night.png` | deep MBM navy, natural cargo color, orange accent | pass | transparent white source, correct ratio | pass | show |
| B - Cobalt Steel | `assets/concepts/style/b-cobalt-steel.png` | cool blue-steel, ice-blue accent, deep-cobalt CTA | pass | transparent white source, correct ratio | pass | show |
| C - Arctic Light | `assets/concepts/style/c-arctic-light.png` | pale steel, dark navy copy, official MBM blue | pass | transparent source recolored blue, correct ratio | pass | show |

## Browser audit

- Canvas: `1280 x 800` proportional preview of the `1440 x 900` target.
- Measured geometry is identical in all three themes: header `1216 x 92`, logo anchor `196 x 62`, nav shell `448 x 49`, hero grid `1178 x 330.7`, headline box `706 x 140.5`, primary CTA `232.8 x 50`, secondary CTA `183.9 x 50`.
- Shared font stack, copy, crop, line breaks, spacing and component radii are unchanged; the comparison isolates color and material treatment.
- No horizontal overflow at the desktop preview width.
- Logo source completed at intrinsic `438 x 168`; `object-fit: contain` preserves its ratio.
- Browser console: no errors or warnings.

## Contrast audit

- Brand Night CTA / white: `5.51:1`.
- Cobalt Steel CTA / white: `6.41:1`.
- Arctic Light CTA / white: `8.04:1`.
- Arctic Light headline / pale scrim: `7.36:1`.
- Brand orange / dark navy: `6.28:1`.
- Cobalt ice blue / dark steel: `8.56:1`.

## Divergence and prompt audit

- A / B distance: background hue, accent system, image temperature, surface color and motion accent differ; geometry remains locked.
- A / C distance: value mode, surface, accent system, text polarity, image treatment and motion tone differ.
- B / C distance: value mode, surface, text polarity, image treatment and motion tone differ.
- No candidate adds new UI, fake imagery, copy or interface structure.
- Result: all three candidates pass and are ready for user selection.

## Selected B refinement QA

- User direction: keep Cobalt Steel, restore the original blue header logo and make the CTA pair subtly glass-like.
- Final reference: `assets/concepts/style/b-cobalt-glass.png`, rendered at `1280 x 800`.
- Logo source: original `logo_h@2x.jpg`, intrinsic `466 x 176`; rendered at `160 x 60.4` with the correct aspect ratio inside a centered `196 x 68` anchor.
- CTA alignment: primary `252 x 54` at `x=50, y=662`; secondary `200 x 54` at `x=316, y=662`.
- Both CTA surfaces use `14 px` radius and the same `blur(16px) saturate(135%)` backdrop treatment.
- Horizontal overflow: none. Browser console: no errors or warnings.
- Result: passed; awaiting confirmation of the refined B hero before page-system expansion.
