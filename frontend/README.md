# 🚀 Next.js Boilerplate

A modern, production-ready Next.js boilerplate with TypeScript, Tailwind CSS, and comprehensive testing setup.

## ✨ Features

- ⚡️ **Next.js 16** - Latest React framework with App Router
- 🎨 **Tailwind CSS 4** - Utility-first CSS framework
- 📘 **TypeScript** - Type safety and better DX
- 🧪 **Vitest** - Fast unit testing with React Testing Library
- 📖 **Storybook** - Component development and documentation
- 🔍 **ESLint & Prettier** - Code quality and formatting
- 🔄 **TanStack Query** - Powerful data fetching and caching
- 🪝 **Husky** - Git hooks for code quality

## 🏗️ Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components (Atomic Design)
│   ├── _atoms/
│   ├── _molecules/
│   ├── _organisms/
│   └── _templates/
├── hooks/            # Custom React hooks
├── libs/             # Third-party library configurations
├── store/            # State management
├── styles/           # Global styles and fonts
└── utils/            # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📜 Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm test         # Run tests with Vitest
pnpm lint         # Lint code
pnpm lint:fix     # Fix linting issues
pnpm typecheck    # Type check with TypeScript
pnpm sb:dev       # Run Storybook
pnpm sb:build     # Build Storybook
```

## 🧪 Testing

This boilerplate includes a comprehensive testing setup with Vitest and React Testing Library.

```bash
pnpm test         # Run tests
```

## 🛠️ Tech Stack

| Technology     | Purpose               |
| -------------- | --------------------- |
| Next.js        | React framework       |
| TypeScript     | Type safety           |
| Tailwind CSS   | Styling               |
| TanStack Query | Data fetching         |
| Vitest         | Testing               |
| Storybook      | Component docs        |
| Framer Motion  | Animations            |
| Radix UI       | Accessible components |
