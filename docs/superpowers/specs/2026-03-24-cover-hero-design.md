# CoverHero Design Spec

**Date:** 2026-03-24
**Status:** Approved

## Overview

Complete the `CoverHero` organism on the homepage by adding a two-button CTA row. This also requires:

- Adding the CSS for the `secondary` variant to the `Button` atom (the TypeScript type already declares it)
- Extending `Button` to render as a Next.js `<Link>` when an `href` prop is provided
- Fixing the `Button` base CSS to neutralise conflicting global `a {}` styles
- Adding `id="footer"` to `SiteFooter`
- Adding `scroll-behavior: smooth` to `:root`

## Layout & Structure

The hero keeps its existing layout:

- 12-column CSS grid, `8/4` content/image split on desktop
- Single column (stacked) on mobile (`< 40rem`)
- Background: `--bg-page` (near-black)

The `coverHero__contentInner` flex column gains one new child below the subtitle `<p>`:

```
Badge ("Software engineer")
h1   ("Hi, I am Adam Hopkins")
p    (placeholder subtitle)
[CTA row]  ← new
```

## CTA Row

A `div` with class `coverHero__ctaRow`:

```css
display: flex;
gap: var(--spacing-gap-wide); /* 16px */
flex-wrap: wrap;
align-items: center;
```

Contains two `<Button>` atoms:

| Button    | Label          | Variant     | Behaviour                                     |
| --------- | -------------- | ----------- | --------------------------------------------- |
| Primary   | "View my work" | `primary`   | `href="#footer"` — smooth scroll to footer    |
| Secondary | "Get in touch" | `secondary` | `href="/contact"` — Next.js client navigation |

Both buttons use the `href` prop. No `<a>` element wrapping a `<button>` element.

## Button Atom Changes

### 1. TypeScript interface

Replace `IButtonProps extends ComponentProps<'button'>` with a discriminated union:

```tsx
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
```

Key decisions:

- When `href` is present, only `variant`, `children`, and `onClick` are accepted — no button-only DOM props leak onto `<Link>`.
- `onClick` is forwarded on both variants: via `...rest` spread on `<button>`; explicitly on `<Link>`.
- `next/link`'s `<Link>` natively accepts `onClick`, so no casting is needed.
- The link branch intentionally does not expose `className` — consumers style via `variant` only.

### 2. Component render logic

```tsx
// Pseudocode
if (href) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(styles.button, styles[`button__${variant}`])}
    >
      {children}
    </Link>
  );
} else {
  return (
    <button
      type="button"
      className={clsx(styles.button, styles[`button__${variant}`])}
      {...rest}
    >
      {children}
    </button>
  );
}
```

`type="button"` is explicit on the `<button>` branch to prevent accidental form submission.

### 3. Button base CSS: neutralise global `a {}` styles

`global.css` applies `font-size: var(--text-lg)` and `font-weight: var(--font-weight-2)` to all `a` elements. The `.button` base class does not currently set these, so they would apply when `Button` renders as a `<Link>`. Add resets to the `.button` base in `Button.module.css`:

```css
.button {
  /* existing rules... */
  font-size: inherit; /* prevent global a { font-size } from leaking in */
  font-weight: inherit; /* prevent global a { font-weight } from leaking in */
}
```

### 4. Secondary variant CSS

Add `.button__secondary` to `Button.module.css`. The base `.button` sets `color: var(--text-secondary)` — the secondary variant overrides this:

```css
&__secondary {
  background-color: transparent;
  color: var(--text-primary); /* white — overrides base --text-secondary */
  border: 1px solid var(--accent-base); /* --purple-300, bright purple on dark bg */

  /* transition: background-color 0.2s ease-in-out — inherited from .button base */

  &:hover {
    background-color: var(
      --interactive-accent
    ); /* --purple-700 — dark purple, visible on near-black */
    color: var(--text-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--border-focus);
    outline-offset: 3px;
  }
}
```

`--interactive-subtle` (`--purple-100`, light lavender) was not used — it is too light against `--bg-page`.

## SiteFooter: add scroll anchor

Add `id="footer"` to the `<footer>` element in `SiteFooter.tsx` so the "View my work" CTA can scroll to it:

```tsx
<footer id="footer" className={clsx([styles.siteFooter])}>
```

## global.css: enable smooth scroll

Add to `:root` in `global.css`:

```css
scroll-behavior: smooth;
```

## Props Change: CoverHero

No new props required. CTAs use static copy and static hrefs.

## Files Changed

| File                                                                      | Change                                                                                               |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `frontend/src/components/_atoms/Button/Button.tsx`                        | Discriminated union type; render as `<Link>` when `href` present, `<button type="button">` otherwise |
| `frontend/src/components/_atoms/Button/Button.module.css`                 | Add `font-size: inherit; font-weight: inherit` to base; add `.button__secondary` ruleset             |
| `frontend/src/components/_organisms/Heros/CoverHero/CoverHero.tsx`        | Add `coverHero__ctaRow` div with two `<Button href="...">`                                           |
| `frontend/src/components/_organisms/Heros/CoverHero/CoverHero.module.css` | Add `&__ctaRow` styles                                                                               |
| `frontend/src/components/_organisms/Navigation/SiteFooter/SiteFooter.tsx` | Add `id="footer"` to `<footer>` element                                                              |
| `frontend/src/styles/base/global.css`                                     | Add `scroll-behavior: smooth` to `:root`                                                             |

## Acceptance Criteria

- [ ] Both CTA buttons render in the hero below the subtitle paragraph
- [ ] "View my work" smoothly scrolls to the footer (`id="footer"` present on `<footer>` in `SiteFooter`)
- [ ] `scroll-behavior: smooth` is present on `:root` in `global.css`
- [ ] "Get in touch" navigates to `/contact` via Next.js client navigation (no full page reload)
- [ ] Primary button: white fill (`--interactive-default`), near-black text (`--text-tertiary`)
- [ ] Secondary button: transparent background, white text (`--text-primary`), purple border (`--accent-base`)
- [ ] Secondary button hover: dark purple background (`--interactive-accent`)
- [ ] Both buttons have a visible `:focus-visible` outline
- [ ] Both buttons are keyboard-focusable and Tab-navigable
- [ ] CTA row wraps gracefully on narrow viewports without overflow
- [ ] No `<button>` element nested inside an `<a>` element (valid HTML)
- [ ] `Button` renders `type="button"` when used as a button element
- [ ] Link-variant `Button` renders correct font size and weight (not overridden by global `a {}`)
- [ ] TypeScript compiles without errors; no `any` casting in Button

## Out of Scope

- Animated entrance / scroll effects
- Social proof indicators
- Icon on buttons
- Mobile-specific button sizing beyond `flex-wrap`
- Creating the `/contact` page
