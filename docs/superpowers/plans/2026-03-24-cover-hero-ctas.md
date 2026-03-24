# Cover Hero CTAs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the CoverHero homepage section by adding a two-button CTA row ("View my work" scrolls to footer, "Get in touch" links to /contact).

**Architecture:** Five focused changes — global smooth-scroll, footer anchor id, Button atom refactored to support link rendering via a discriminated union type, secondary button variant CSS, and the CTA row added to CoverHero. Each task produces working, committed code.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS Modules (postcss-nested), Vitest + Testing Library (jsdom)

---

## File Map

| File                                                                           | Change                                        |
| ------------------------------------------------------------------------------ | --------------------------------------------- |
| `frontend/src/styles/base/global.css`                                          | Add `scroll-behavior: smooth` to `:root`      |
| `frontend/src/components/_organisms/Navigation/SiteFooter/SiteFooter.tsx`      | Add `id="footer"` to `<footer>`               |
| `frontend/src/components/_organisms/Navigation/SiteFooter/SiteFooter.test.tsx` | New — test footer id                          |
| `frontend/src/components/_atoms/Button/Button.tsx`                             | Discriminated union type + link rendering     |
| `frontend/src/components/_atoms/Button/Button.module.css`                      | Font resets on base + secondary variant       |
| `frontend/src/components/_atoms/Button/Button.test.tsx`                        | New — test button variants and link rendering |
| `frontend/src/components/_organisms/Heros/CoverHero/CoverHero.tsx`             | Add CTA row                                   |
| `frontend/src/components/_organisms/Heros/CoverHero/CoverHero.module.css`      | Add `&__ctaRow` styles                        |
| `frontend/src/components/_organisms/Heros/CoverHero/CoverHero.test.tsx`        | New — test CTA row renders                    |

---

## Task 1: Enable smooth scroll globally

**Files:**

- Modify: `frontend/src/styles/base/global.css`

No logic to test — CSS-only change.

- [ ] **Step 1: Add scroll-behavior to :root**

Open `frontend/src/styles/base/global.css`. The file currently starts with `:root { --siteMaxWidth: 120rem; }`. Add `scroll-behavior: smooth`:

```css
:root {
  --siteMaxWidth: 120rem;
  scroll-behavior: smooth;
}
```

- [ ] **Step 2: Commit**

```bash
cd frontend && git add src/styles/base/global.css
git commit -m "style: enable smooth scroll globally"
```

---

## Task 2: Add footer scroll anchor

**Files:**

- Modify: `frontend/src/components/_organisms/Navigation/SiteFooter/SiteFooter.tsx`
- Create: `frontend/src/components/_organisms/Navigation/SiteFooter/SiteFooter.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `frontend/src/components/_organisms/Navigation/SiteFooter/SiteFooter.test.tsx`:

```tsx
import { render, screen } from '@tests/configs/customRender';
import { SiteFooter } from './SiteFooter';

describe('SiteFooter', () => {
  it('has id="footer" for scroll target', () => {
    render(<SiteFooter />);
    expect(document.getElementById('footer')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd frontend && pnpm test src/components/_organisms/Navigation/SiteFooter/SiteFooter.test.tsx
```

Expected: FAIL — `document.getElementById('footer')` returns null.

- [ ] **Step 3: Add id="footer" to SiteFooter**

In `frontend/src/components/_organisms/Navigation/SiteFooter/SiteFooter.tsx`, change:

```tsx
<footer className={clsx([styles.siteFooter])}>
```

to:

```tsx
<footer id="footer" className={clsx([styles.siteFooter])}>
```

- [ ] **Step 4: Run test to verify it passes**

```bash
cd frontend && pnpm test src/components/_organisms/Navigation/SiteFooter/SiteFooter.test.tsx
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/_organisms/Navigation/SiteFooter/SiteFooter.tsx src/components/_organisms/Navigation/SiteFooter/SiteFooter.test.tsx
git commit -m "feat: add footer scroll anchor id"
```

---

## Task 3: Refactor Button to support link rendering

**Files:**

- Modify: `frontend/src/components/_atoms/Button/Button.tsx`
- Create: `frontend/src/components/_atoms/Button/Button.test.tsx`

The existing `Button` renders only a `<button>`. We need it to render a Next.js `<Link>` (which outputs an `<a>`) when `href` is provided. We use a discriminated union so TypeScript enforces that button-only props can't be passed to the link branch.

**Note on next/link in tests:** Next.js `<Link>` renders a standard `<a>` element in jsdom. `setupTests.ts` already mocks `next/navigation` (which `<Link>` depends on internally), so `<Link>` renders without errors and can be found by `getByRole('link')`.

- [ ] **Step 1: Write the failing tests**

Create `frontend/src/components/_atoms/Button/Button.test.tsx`:

```tsx
import { render, screen } from '@tests/configs/customRender';
import { Button } from './Button';

describe('Button', () => {
  describe('button variant (no href)', () => {
    it('renders a <button> element', () => {
      render(<Button>Click me</Button>);
      expect(
        screen.getByRole('button', { name: 'Click me' }),
      ).toBeInTheDocument();
    });

    it('has type="button" to prevent form submission', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('calls onClick when clicked', async () => {
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Click me</Button>);
      await screen.getByRole('button').click();
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('link variant (with href)', () => {
    it('renders an <a> element', () => {
      render(<Button href="/contact">Get in touch</Button>);
      expect(
        screen.getByRole('link', { name: 'Get in touch' }),
      ).toBeInTheDocument();
    });

    it('has the correct href', () => {
      render(<Button href="/contact">Get in touch</Button>);
      expect(screen.getByRole('link')).toHaveAttribute('href', '/contact');
    });

    it('supports hash hrefs for scroll targets', () => {
      render(<Button href="#footer">View my work</Button>);
      expect(screen.getByRole('link')).toHaveAttribute('href', '#footer');
    });

    it('calls onClick when clicked', async () => {
      const onClick = vi.fn();
      render(
        <Button
          href="/contact"
          onClick={onClick}
        >
          Get in touch
        </Button>,
      );
      await screen.getByRole('link').click();
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd frontend && pnpm test src/components/_atoms/Button/Button.test.tsx
```

Expected: Multiple FAILs — link tests fail because `Button` only renders `<button>`.

- [ ] **Step 3: Implement the discriminated union and render logic**

Replace the entire content of `frontend/src/components/_atoms/Button/Button.tsx`:

```tsx
import clsx from 'clsx';
import Link from 'next/link';
import { type ComponentProps } from 'react';

import styles from './Button.module.css';

type ButtonAsButton = {
  href?: never;
  variant?: 'primary' | 'secondary';
} & ComponentProps<'button'>;

type ButtonAsLink = {
  href: string;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

type IButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = ({
  children,
  variant = 'primary',
  ...rest
}: IButtonProps) => {
  const className = clsx([styles.button, styles[`button__${variant}`]]);

  if ('href' in rest && rest.href) {
    return (
      <Link
        href={rest.href}
        onClick={(rest as ButtonAsLink).onClick}
        className={className}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={className}
      {...(rest as Omit<ButtonAsButton, 'variant'>)}
    >
      {children}
    </button>
  );
};
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd frontend && pnpm test src/components/_atoms/Button/Button.test.tsx
```

Expected: All PASS

- [ ] **Step 5: Typecheck**

```bash
cd frontend && pnpm typecheck
```

Expected: No errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/_atoms/Button/Button.tsx src/components/_atoms/Button/Button.test.tsx
git commit -m "feat: support link rendering in Button atom"
```

---

## Task 4: Add secondary variant CSS and fix base font resets

**Files:**

- Modify: `frontend/src/components/_atoms/Button/Button.module.css`

CSS-only — no new tests needed. The existing Button tests cover rendering; visual correctness is verified by eye.

**Why the font resets:** `global.css` applies `font-size: var(--text-lg)` and `font-weight: var(--font-weight-2)` to all `a` elements. Since `Button` can now render as an `<a>`, the base `.button` class needs `font-size: inherit` and `font-weight: inherit` to prevent those global styles leaking in.

- [ ] **Step 1: Update Button.module.css**

Replace the entire content of `frontend/src/components/_atoms/Button/Button.module.css`:

```css
.button {
  color: var(--text-secondary);
  padding: var(--spacing-padding-tight) var(--spacing-padding-base);
  border-radius: var(--radius-2);
  transition: background-color 0.2s ease-in-out;
  min-width: 6rem;
  font-size: inherit;
  font-weight: inherit;

  &__primary {
    background-color: var(--interactive-default);
    color: var(--text-tertiary);

    &:hover {
      color: var(--text-primary);
      background-color: var(--interactive-hover);
    }

    &:focus-visible {
      outline: 2px solid var(--border-focus);
      outline-offset: 3px;
    }
  }

  &__secondary {
    background-color: transparent;
    color: var(--text-primary);
    border: 1px solid var(--accent-base);

    &:hover {
      background-color: var(--interactive-accent);
      color: var(--text-primary);
    }

    &:focus-visible {
      outline: 2px solid var(--border-focus);
      outline-offset: 3px;
    }
  }
}
```

- [ ] **Step 2: Run existing Button tests to confirm no regression**

```bash
cd frontend && pnpm test src/components/_atoms/Button/Button.test.tsx
```

Expected: All PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/_atoms/Button/Button.module.css
git commit -m "feat: add secondary button variant and fix link font inheritance"
```

---

## Task 5: Add CTA row to CoverHero

**Files:**

- Modify: `frontend/src/components/_organisms/Heros/CoverHero/CoverHero.tsx`
- Modify: `frontend/src/components/_organisms/Heros/CoverHero/CoverHero.module.css`
- Create: `frontend/src/components/_organisms/Heros/CoverHero/CoverHero.test.tsx`

- [ ] **Step 1: Write the failing tests**

Create `frontend/src/components/_organisms/Heros/CoverHero/CoverHero.test.tsx`:

```tsx
import { render, screen } from '@tests/configs/customRender';
import { CoverHero } from './CoverHero';

const defaultProps = {
  title: 'Hi, I am Adam Hopkins',
  subtitle: 'Test subtitle',
  label: 'Software engineer',
};

describe('CoverHero', () => {
  it('renders a "View my work" link that scrolls to the footer', () => {
    render(<CoverHero {...defaultProps} />);
    const link = screen.getByRole('link', { name: 'View my work' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#footer');
  });

  it('renders a "Get in touch" link to the contact page', () => {
    render(<CoverHero {...defaultProps} />);
    const link = screen.getByRole('link', { name: 'Get in touch' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/contact');
  });

  it('renders the CTA row after the subtitle', () => {
    render(<CoverHero {...defaultProps} />);
    const subtitle = screen.getByText('Test subtitle');
    const viewMyWork = screen.getByRole('link', { name: 'View my work' });
    // CTA row should come after the subtitle in the DOM
    expect(subtitle.compareDocumentPosition(viewMyWork)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd frontend && pnpm test src/components/_organisms/Heros/CoverHero/CoverHero.test.tsx
```

Expected: FAIL — no CTA links rendered yet.

- [ ] **Step 3: Add CTA row to CoverHero.tsx**

Replace the content of `frontend/src/components/_organisms/Heros/CoverHero/CoverHero.tsx`:

```tsx
import { Badge } from '@atoms/Badge';
import { Button } from '@atoms/Button';
import clsx from 'clsx';
import NextImage from 'next/image';

import styles from './CoverHero.module.css';

interface ICoverHeroProps {
  title: string;
  subtitle: string;
  label: string;
}

export const CoverHero = ({ title, label, subtitle }: ICoverHeroProps) => {
  return (
    <section className={clsx([styles.coverHero])}>
      <div className={styles.coverHero__contentWrapper}>
        <div className={styles.coverHero__contentInner}>
          <Badge
            label={label}
            variant="primary"
          />
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <div className={styles.coverHero__ctaRow}>
            <Button
              href="#footer"
              variant="primary"
            >
              View my work
            </Button>
            <Button
              href="/contact"
              variant="secondary"
            >
              Get in touch
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.coverHero__imageWrapper}>
        <NextImage
          src="/adam.png"
          alt="adam hopkins"
          width={400}
          height={400}
        />
      </div>
    </section>
  );
};
```

- [ ] **Step 4: Add ctaRow styles to CoverHero.module.css**

In `frontend/src/components/_organisms/Heros/CoverHero/CoverHero.module.css`, add `&__ctaRow` inside `.coverHero {}` after `&__imageWrapper`:

```css
&__ctaRow {
  display: flex;
  gap: var(--spacing-gap-wide);
  flex-wrap: wrap;
  align-items: center;
}
```

The full file should look like:

```css
.coverHero {
  min-height: 200px;
  background-color: var(--bg-page);
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 40rem) {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }

  &__contentWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-block: var(--spacing-padding-wide);
    grid-column: span 8 / span 8;
  }

  &__contentInner {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-gap-base);
    padding-block: var(--spacing-padding-base);
    align-items: flex-start;

    @media (min-width: 40rem) {
      gap: var(--spacing-gap-wide);
    }

    h1 {
      font-size: var(--text-display-xl-size);
      line-height: var(--text-display-xl-leading);
      letter-spacing: var(--text-display-xl-tracking);
      font-family: var(--text-display-xl-font);
      font-weight: var(--text-display-xl-weight);
    }

    p {
      font-size: var(--font-size-fluid-lg);
    }
  }

  &__imageWrapper {
    @media (min-width: 40rem) {
      grid-column: span 4 / span 4;
    }

    img {
      width: 100%;
      object-fit: cover;
    }
  }

  &__label {
    color: var(--text-secondary);
    font-size: var(--text-body-lg-size) !important;
  }

  &__ctaRow {
    display: flex;
    gap: var(--spacing-gap-wide);
    flex-wrap: wrap;
    align-items: center;
  }
}
```

- [ ] **Step 5: Run all tests to verify they pass**

```bash
cd frontend && pnpm test src/components/_organisms/Heros/CoverHero/CoverHero.test.tsx
```

Expected: All PASS

- [ ] **Step 6: Run full test suite to check for regressions**

```bash
cd frontend && pnpm test
```

Expected: All PASS

- [ ] **Step 7: Typecheck**

```bash
cd frontend && pnpm typecheck
```

Expected: No errors.

- [ ] **Step 8: Commit**

```bash
git add src/components/_organisms/Heros/CoverHero/CoverHero.tsx src/components/_organisms/Heros/CoverHero/CoverHero.module.css src/components/_organisms/Heros/CoverHero/CoverHero.test.tsx
git commit -m "feat: add CTA row to CoverHero"
```

---

## Done

All five tasks complete. Verify visually by running `pnpm dev:frontend` from the repo root and checking the homepage at `http://localhost:3000`:

- "View my work" button (white fill) scrolls smoothly to the footer
- "Get in touch" button (outlined purple border) navigates to `/contact`
- Both buttons are keyboard-accessible and show focus rings on Tab
- CTA row wraps on narrow viewports
