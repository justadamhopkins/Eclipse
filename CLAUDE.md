# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Eclipse is a personal portfolio monorepo with two packages managed by pnpm workspaces:

- `frontend/` — Next.js 16 app (App Router, React 19, CSS Modules + PostCSS)
- `studio/` — Sanity Studio v5 (content management)

Sanity project ID: `o7fi7oqy`, dataset: `production`

## Commands

All commands should be run from the repo root unless otherwise noted.

### Development

```bash
pnpm dev:frontend     # Start Next.js dev server (localhost:3000)
pnpm dev:studio       # Start Sanity Studio dev server
```

### Quality

```bash
pnpm lint             # Lint all packages
pnpm lint:fix         # Auto-fix lint issues across all packages
pnpm typecheck        # Type-check all packages
pnpm prettier:fix     # Format all files
```

### Testing (run from `frontend/`)

```bash
pnpm test             # Run all tests with Vitest
pnpm test -- --reporter=verbose   # Run with verbose output
pnpm test -- path/to/file.test.ts # Run a single test file
```

### Storybook (run from `frontend/`)

```bash
pnpm sb:dev           # Start Storybook on port 6006
pnpm sb:build         # Build Storybook static output
```

### Sanity Schema

```bash
# From frontend/ — extracts schema from studio and regenerates TypeScript types
pnpm sanity:typegen

# From studio/ — deploy schema to Sanity cloud
pnpm deploy
```

## Architecture

### Frontend (`frontend/`)

**Path aliases** (configured in `tsconfig.json` and `vitest.config.ts`):

- `@atoms/*` → `src/components/_atoms/*`
- `@molecules/*` → `src/components/_molecules/*`
- `@organisms/*` → `src/components/_organisms/*`
- `@templates/*` → `src/components/_templates/*`
- `@core/*` → `src/components/core/*`
- `@hooks/*` → `src/hooks/*`
- `@libs/*` → `src/libs/*`
- `@utils/*` → `src/utils/*`
- `@helpers/*` → `src/helpers/*`
- `@constants/*` → `src/constants/*`
- `@typings/*` → `src/types/*`
- `@styles/*` → `src/styles/*`
- `@tests/*` → `src/tests/*`

**Component architecture** follows Atomic Design:

- `_atoms/` — primitive UI elements
- `_molecules/` — composed atoms
- `_organisms/` — complex UI sections
- `_templates/` — page-level layouts
- `core/` — foundational wrappers (e.g., `AppContainer`)

**Sanity integration** lives in `src/libs/sanity/`:

- `client.ts` — `sanityFetch()` with ISR cache control; Sanity client configured from env vars
- `queries/queries.ts` — GROQ queries defined with `defineQuery`
- `types/` — generated Sanity types

**Environment variables** are validated with Zod in `src/constants/environment.ts`:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `SANITY_READ_TOKEN`

**Styling** uses a two-layer CSS custom property system in `src/styles/variables/`:

- `primitives/` — raw design tokens (colors in OKLCH, spacing scale, typography, etc.)
- `semantics/` — purpose-mapped tokens that reference primitives (e.g., `--surface-primary: var(--twilight-indigo)`)

All styles are imported via `src/styles/index.css`. Components use CSS Modules with PostCSS (postcss-nested for nesting support).

**Data fetching** uses TanStack Query for client-side and `sanityFetch()` for server-side (ISR).

### Studio (`studio/`)

**Path alias**: `@features/*` → `src/features/*`

Schema types are registered in `src/schemaTypes/index.ts` and located in `src/schemaTypes/documents/`. Current document types:

- `page.home` — Home page singleton
- `page.about` — About page singleton (inferred)

Studio structure is customized in `src/features/structure/structure.ts`.

The root `sanity.schema.json` is the extracted schema used by the frontend for TypeGen — regenerate it when schema changes with `pnpm sanity:typegen` from `frontend/`.

## Git Hooks

Pre-commit runs `lint-staged` which applies Prettier + ESLint auto-fix to staged files. Commit messages follow Conventional Commits (enforced by commitlint).

## Sanity Best Practice Rules

Extended Sanity development rules (schema, GROQ, Next.js integration, TypeGen, Visual Editing, Studio Structure, images, Portable Text, project structure) are stored in `studio/CLAUDE.md` at the repo root. Consult that file when working on any Sanity-related code./

## Git Commit Guidelines

When creating commits:

- Follow conventional commit format
- Keep the first line under 50 characters
- Do not include AI attribution in commit messages
