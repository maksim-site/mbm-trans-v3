# UX foundation

- Source: `ui-ux-pro-max`, `design-taste-frontend`, `emil-design-eng` and director synthesis.
- Selected interface pattern: familiar corporate gateway with project-first proof and one expressive transport interaction.
- Rejected recommendations: portfolio-only home, mega menu, Login, horizontal scroll journey, floating action button, certificate carousel, generic bento grid and any suggested palette as a composition-stage decision.

## Navigation

- Desktop: one 72 px horizontal header.
- Logo left.
- Links: «Услуги», «Проекты», «О компании», «Клиенты», «Контакты».
- Phone and compact header CTA are optional in the initial hero state so navigation remains on one line. In the implemented sticky state, the CTA may appear after the hero if it fits without crowding.
- Mobile: logo, phone action and accessible menu button; full nav opens as a simple drawer with focus management.

## CTA hierarchy

- Primary: «Рассчитать перевозку».
- Optional secondary: «Смотреть проекты».
- Primary height: 50 px; horizontal padding: 26 px; content width; minimum touch target 44 x 44 px.
- Secondary is a text link or quiet outline button and never equals the primary contrast.
- Same component geometry in all three composition candidates.

## Content hierarchy

1. What MBM moves and why it can be trusted.
2. One conversion action.
3. Proof above fold: 20 years, up to 365 t, 500+ projects.
4. Services and project evidence.
5. Process with route interaction.
6. Fleet, documents, clients and contact.

## Component grammar

- Use surfaces only when they communicate hierarchy.
- Prefer large media, spacing, dividers and controlled overlap over repeated cards.
- Hero headline maximum two lines.
- Hero supporting copy maximum 20 words in the visual comps.
- One accent and one radius system will be selected later.
- UI transitions 150–250 ms; active feedback 100–160 ms.

## Screen scope

- Selection route: Home.
- Selection frame: first viewport only.
- Exact viewport: 1440 x 900.
- Full header and hero only.
- No partial next section.
- One static route-animation state per candidate.

## Responsive

- Explicit checks: 375, 768, 1024 and 1440 px; implementation also 320 and 414 px.
- Complex grids collapse to one column below 768 px.
- Copy comes before image on mobile.
- Hero image retains an identifiable truck/cargo focal point.
- No horizontal page scroll.

## Accessibility

- Body text minimum 16 px on mobile.
- Normal text contrast at least 4.5:1.
- Visible focus states and logical tab order.
- Skip link before navigation.
- Hover preview also has a keyboard/tap control.
- `prefers-reduced-motion` removes travel, parallax, scrub and autoplay while preserving all content and controls.
- Media dimensions are reserved; off-screen loops pause.
