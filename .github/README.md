# Eclipse

> **Work in progress** — personal portfolio site for Adam Hopkins.

## Overview

Eclipse is a personal site built with a modern, type-safe stack. The project is structured as a pnpm monorepo
with a Next.js frontend and a standalone Sanity Studio for content management.

## Stack

### Frontend (`/frontend`)

- **[Next.js 16](https://nextjs.org/)** — React framework with App Router
- **[React 19](https://react.dev/)** — UI library
- **[TypeScript](https://www.typescriptlang.org/)** — type safety throughout
- **[Tailwind CSS 4](https://tailwindcss.com/)** — utility-first styling
- **[TanStack Query](https://tanstack.com/query)** — data fetching and caching
- **[Zod](https://zod.dev/)** — runtime schema validation

### CMS (`/studio`)

- **[Sanity](https://www.sanity.io/)** — headless CMS with standalone Studio
- Structured content for pages (Home, About) with a namespaced schema (`page.*`)

### Monorepo

- **[pnpm workspaces](https://pnpm.io/workspaces)** — package management
- **[Husky](https://typicode.github.io/husky/)** + **[Commitlint](https://commitlint.js.org/)** — commit hooks and
  conventional commits
- **[ESLint](https://eslint.org/)** + **[Prettier](https://prettier.io/)** — linting and formatting

### Testing

- **[Vitest](https://vitest.dev/)** — unit testing
- **[Testing Library](https://testing-library.com/)** — component testing
- **[Storybook](https://storybook.js.org/)** — component development and visual testing

## Project Structure

```
eclipse-portfolio/
├── frontend/       # Next.js application
├── studio/         # Sanity Studio (CMS)
└── package.json    # Root workspace config
```

## Getting Started

Install dependencies from the root:

```bash
pnpm install
```

Run both the frontend and studio in development:

```bash
pnpm dev:next      # Next.js on http://localhost:3000
pnpm dev:studio    # Sanity Studio on http://localhost:3333
```
