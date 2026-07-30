# Composition QA

## Interface and scope gate

| Candidate | Full first viewport | Navigation | CTA | Asset truth | Familiarity | Decision |
|---|---|---|---|---|---|---|
| A - Route Split | pass | pass | pass | pass | pass | show |
| B - Project Mosaic | pass | pass | pass | pass | pass | show |
| C - Cargo Horizon | pass | pass | pass | pass | pass | show |

All three show one header and one complete hero. No partial next section, contact rail, giant CTA, scroll cue or second motion state is visible.

## Prompt-to-result audit

| Requirement | Priority | Visible result | Status | Next action |
|---|---|---|---|---|
| Existing MBM logo and real media | P0 | Recognizable logo and source photographs retained | matched | none |
| Shared navigation | P0 | Same light 72 px header and five links | matched | none |
| Locked headline and CTA | P0 | Correct Russian headline and both actions | matched | none |
| One complete 1440:900-equivalent viewport | P0 | Each render is 1586 x 992 at the same 1.6 ratio | matched | none |
| No partial next section | P0 | Bottom edge is the hero fold in every render | matched | none |
| Route interaction staging | P1 | Same route motif appears in three different spatial roles | matched | animate only after visual selection |
| Proof points | P1 | 20 years, up to 365 t and 500+ projects visible | matched | verify final microcopy before build |
| Neutral comparison mode | P1 | Shared graphite, off-white, cool grey and muted rust | matched | palette remains unlocked |
| Mobile collapse inferable | P1 | A stacks copy/media; B reduces mosaic; C separates media/copy | matched | formalize after composition selection |

## Pairwise bounded divergence

| Pair | Fingerprint distance | Silhouette distance | Decision |
|---|---:|---|---|
| A / B | 6/7 | strong | pass |
| A / C | 5/7 | medium | pass: full-height split versus full-bleed image with lower overlay |
| B / C | 7/7 | strong | pass |

## Candidate scores

Scores use the 1–5 gate from `concept-generation.md`.

| Criterion | A | B | C |
|---|---:|---:|---:|
| Niche relevance | 5 | 5 | 5 |
| Screen-scope clarity | 5 | 5 | 5 |
| Interface familiarity | 5 | 5 | 5 |
| CTA proportionality | 5 | 5 | 5 |
| Navigation appropriateness | 5 | 5 | 5 |
| Structural distinctness | 5 | 5 | 4 |
| Silhouette strength | 5 | 5 | 4 |
| Typographic hierarchy | 5 | 5 | 5 |
| Responsive viability | 5 | 4 | 5 |
| Signature-interaction feasibility | 5 | 4 | 5 |
| Production feasibility | 5 | 4 | 5 |
| P0 fidelity | 5 | 5 | 5 |

## Director view

- A is the most balanced corporate evolution.
- B is the most distinctive and makes the project archive feel valuable, but requires the most careful mobile collapse.
- C creates the strongest immediate scale and is the simplest to implement, but it is closest to a conventional cinematic logistics hero.

final result: passed
