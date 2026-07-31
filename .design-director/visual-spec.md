# Visual specification

## Selected identity

- Direction: Cobalt Steel / RTL Motion geometry.
- Header mark: original blue `assets/css/imgs/logo_h@2x.jpg`, intrinsic ratio `466 / 176`, rendered on a white identity plate without filters.
- Hero source: `assets/images/work/hero-vessel.webp` with cool/desaturated treatment; content remains recognisable.
- Brand tone: engineering precision, real scale and calm control.

## Color tokens

| Token | Value | Use |
|---|---|---|
| `--ink-950` | `#050d1e` | page base |
| `--ink-900` | `#08162f` | section base |
| `--ink-850` | `#0b1d3b` | elevated solid surface |
| `--cobalt-700` | `#1248c8` | primary control |
| `--cobalt-600` | `#1b5dff` | active accent / links |
| `--ice-400` | `#73b8ff` | route, focus and highlight |
| `--text-100` | `#f4f8ff` | primary text |
| `--text-300` | `#b7c7df` | supporting text |
| `--line` | `rgba(171,207,255,.18)` | dividers and borders |
| `--danger` | `#ff6b79` | validation only |

## Typography

- Font stack is local/system only: `Inter`, `Manrope`, `Arial`, sans-serif fallback; do not request Google Fonts.
- Display: `clamp(48px, 6.2vw, 104px)`, weight 650–720, line-height .92–.98, tracking -0.045em.
- H2: `clamp(36px, 4.3vw, 68px)`, line-height .98–1.04.
- H3: 22–32 px depending on role.
- Body large: 18–22 px / 1.5; body: 16–18 px / 1.65; metadata: 12–14 px with restrained tracking.
- Paragraph measure: 55–72ch; legal copy 65–75ch.

## Shape and spacing

- Section rhythm: `clamp(84px, 10vw, 156px)` vertical.
- Content cards/media frames: 20–24 px radius.
- Fields: 16 px radius.
- Buttons: 14 px or full pill only for compact header controls; height 50–56 px.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Shadows stay cool and broad; no black floating-card shadows on every element.

## Matte-glass recipe

- Interactive surface: `rgba(18,72,200,.54)` or `rgba(8,22,47,.58)`.
- Border: one-pixel top/outer highlight `rgba(200,225,255,.28)` plus darker lower edge.
- Backdrop: `blur(18px) saturate(135%)`; never required for legibility.
- Internal lens: radial highlight positioned by `--mx/--my`, opacity <= .28.
- Solid fallback: `--cobalt-700` / `--ink-850` when blur or reduced transparency applies.

## Image treatment

- Real project images are never stretched; use `object-fit: cover` for photographic scenes and `contain` for certificates/logos.
- Hero and section media receive a navy gradient and subtle `saturate(.78) contrast(1.05)`; do not erase cargo detail.
- Client logo tiles use an off-white neutral ground with ample breathing room.
- No stock photography, generated truck, fake video frame or decorative 3D object.

## Component rules

- Primary CTA includes text plus a contained arrow tile; secondary CTA uses lower-opacity dark glass.
- No button label wraps; mobile may switch to full-width before wrapping.
- Eyebrows are limited to hero, projects and contact across the nine home sections.
- Every icon has a label or accessible name; arrows use inline SVG/CSS, not third-party libraries.
- `transition: all` is forbidden; list exact properties.

## Reference lock

- Selected hero reference: `.design-director/assets/concepts/style/b-cobalt-glass.png` at 1280 x 800.
- Implementation hero must be compared at the same viewport; logo plate, headline anchor, CTA baseline, proof cluster, route line and photograph crop are P0 landmarks.
