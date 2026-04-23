# JobCard Carousel / Grid Layout

## Summary

Restyle the `JobCardModule` so job cards display as a horizontal scroll-snap carousel on mobile and switch to an auto-fit CSS grid at `64rem`. CSS-only changes in `JobCardModule.module.css` — no markup or component changes required.

## Files Changed

- `frontend/src/components/_organisms/Modules/JobCardModule/JobCardModule.module.css`

## Design

### Mobile (< 64rem): Carousel with Peek

The slide wrapper is a horizontal flex container with scroll-snap. Each card is sized to `calc(85% - var(--spacing-gap-wide))` so one full card is visible with ~15% of the next card peeking in from the right, signaling swipability. No navigation indicators — the peek is sufficient.

**`.jobCardModule`**

- No changes. Remains the overflow wrapper.

**`.jobCardModule__slideWrapper`**

- `display: flex`
- `gap: var(--spacing-gap-wide)` (replaces hardcoded `40px`)
- `overflow-x: auto`
- `scroll-snap-type: x mandatory`
- `scroll-behavior: smooth`
- `-webkit-overflow-scrolling: touch`
- Hide scrollbar: `scrollbar-width: none` + `::-webkit-scrollbar { display: none }`

**`.jobCardModule__slide`**

- `width: calc(85% - var(--spacing-gap-wide))`
- `flex-shrink: 0`
- `scroll-snap-align: start`
- Remove dev artifacts: `background: #eee`, `transform`, `transition`, `transform-origin`

### Desktop (>= 64rem): Auto-fit Grid

At the `@media (min-width: 64rem)` breakpoint, the layout switches from a scroll carousel to a full-width grid.

**`.jobCardModule__slideWrapper`** at breakpoint:

- `display: grid`
- `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`
- `gap: var(--spacing-gap-extra-wide)`
- `overflow-x: visible`

**`.jobCardModule__slide`** at breakpoint:

- `width: 100%` (let grid sizing take over)

## Design Tokens Used

- `--spacing-gap-wide` (`var(--space-4)` = 16px) — carousel gap
- `--spacing-gap-extra-wide` (`var(--space-6)` = 24px) — grid gap
- Grid min column width: `280px`
- Carousel card width: `85%` of container minus gap
- Breakpoint: `64rem`
