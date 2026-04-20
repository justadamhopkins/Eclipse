# JobCard Compound Component Design

## Context

The portfolio site needs a card component to display high-level CV items (job roles). The card should house a company logo, position title, meta info (dates/location), and a brief description. It needs to stand out visually with a gradient accent while maintaining a transparent, minimal aesthetic. This establishes the first compound component pattern in the project.

## Component API

Dot-notation compound pattern with free composition (consumer controls order/omission):

```tsx
import { JobCard } from '@molecules/JobCard';

<JobCard>
  <JobCard.Logo
    src="/logos/company.svg"
    alt="Company"
  />
  <JobCard.Title>Senior Engineer</JobCard.Title>
  <JobCard.Meta>2022 — Present</JobCard.Meta>
  <JobCard.Description>Built payment infrastructure...</JobCard.Description>
</JobCard>;
```

### Sub-components

| Component             | Element     | Props                                           | Purpose                               |
| --------------------- | ----------- | ----------------------------------------------- | ------------------------------------- |
| `JobCard`             | `<article>` | `className`, `children`                         | Root container with stripe and layout |
| `JobCard.Logo`        | `<img>`     | `src`, `alt`, `size?` (default 32), `className` | Company brand mark                    |
| `JobCard.Title`       | `<h3>`      | `children`, `className`                         | Position/role title                   |
| `JobCard.Meta`        | `<span>`    | `children`, `className`                         | Dates, location, tags                 |
| `JobCard.Description` | `<p>`       | `children`, `className`                         | Brief role summary                    |

All sub-components accept optional `className` via `TWithClassName`.

## Visual Design

### Card Container

- Background: `transparent`
- No border on the card body
- Top gradient accent stripe: `3px` height, gradient from `var(--accent-base)` to `var(--purple-500)`
- Border radius: `var(--radius-card)` — stripe clips to top corners
- Padding: `var(--spacing-padding-base)`

### Content Layout

- Flex column with `var(--spacing-gap-base)` between children
- Logo: natural size (32–40px default)
- Title: `var(--text-h6)` sizing, `var(--text-primary)` color
- Meta: `var(--text-caption-md)` sizing, `var(--text-muted)` color
- Description: `var(--text-body-sm)` sizing, `var(--text-secondary)` color

### Hover State

- Subtle `var(--elevation-low)` shadow appears
- Transition: `var(--motion-fast)`

## File Structure

```
frontend/src/components/_molecules/JobCard/
├── JobCard.tsx            # Root + sub-components
├── JobCard.module.css     # All styles
├── index.ts              # Re-export compound component
```

## Implementation Pattern

```tsx
// JobCard.tsx
import { type PropsWithChildren } from 'react';
import { type TWithClassName } from '@typings/utils';
import clsx from 'clsx';
import styles from './JobCard.module.css';

// --- Sub-components ---

type TLogoProps = TWithClassName<{ src: string; alt: string; size?: number }>;

const Logo = ({ src, alt, size = 32, className }: TLogoProps) => (
  <img
    src={src}
    alt={alt}
    width={size}
    height={size}
    className={clsx(styles.jobCard__logo, className)}
  />
);

const Title = ({ children, className }: TWithClassName<PropsWithChildren>) => (
  <h3 className={clsx(styles.jobCard__title, className)}>{children}</h3>
);

const Meta = ({ children, className }: TWithClassName<PropsWithChildren>) => (
  <span className={clsx(styles.jobCard__meta, className)}>{children}</span>
);

const Description = ({
  children,
  className,
}: TWithClassName<PropsWithChildren>) => (
  <p className={clsx(styles.jobCard__description, className)}>{children}</p>
);

// --- Root component ---

const JobCardRoot = ({
  children,
  className,
}: TWithClassName<PropsWithChildren>) => (
  <article className={clsx(styles.jobCard, className)}>
    <div
      className={styles.jobCard__stripe}
      aria-hidden="true"
    />
    <div className={styles.jobCard__content}>{children}</div>
  </article>
);

// --- Compound export ---

export const JobCard = Object.assign(JobCardRoot, {
  Logo,
  Title,
  Meta,
  Description,
});
```

## CSS Module Structure

```css
.jobCard {
  position: relative;
  width: 100%;
  background-color: transparent;
  border-radius: var(--radius-card);
  overflow: hidden;
  transition: box-shadow var(--motion-fast);

  &:hover {
    box-shadow: var(--elevation-low);
  }

  &__stripe {
    height: 3px;
    background: linear-gradient(
      to right,
      var(--accent-base),
      var(--purple-500)
    );
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-gap-base);
    padding: var(--spacing-padding-base);
  }

  &__logo {
    display: block;
    object-fit: contain;
  }

  &__title {
    font-size: var(--text-h6-size);
    font-weight: var(--text-h6-weight);
    line-height: var(--text-h6-leading);
    color: var(--text-primary);
    margin: 0;
  }

  &__meta {
    font-size: var(--text-caption-md-size);
    line-height: var(--text-caption-md-leading);
    color: var(--text-muted);
  }

  &__description {
    font-size: var(--text-body-sm-size);
    line-height: var(--text-body-sm-leading);
    color: var(--text-secondary);
    margin: 0;
  }
}
```

## Index Export

```tsx
// index.ts
export { JobCard } from './JobCard';
```

Single import gives consumers access to all sub-components via `JobCard.Logo`, `JobCard.Title`, etc.

## Verification

1. Run `pnpm typecheck` from root — no type errors
2. Run `pnpm lint` from root — passes lint
3. Render the component in Storybook or a page to confirm:
   - Gradient stripe appears at top
   - Sub-components render in consumer-defined order
   - Hover elevation works
   - `className` overrides apply correctly
