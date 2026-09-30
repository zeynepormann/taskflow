# Repository Guidelines

## Project Structure & Module Organization

TaskFlow is a React + TypeScript application built with Vite and Tailwind CSS. `src/main.tsx` installs providers; `src/App.tsx` defines routes. Screens live in `src/pages/`, shared components in `src/components/`, and application shells in `src/layouts/`. Keep Axios configuration in `src/api/`, endpoint functions in `src/services/`, and React Query hooks in `src/hooks/`. Context providers belong in `src/context/`; shared types, Zod schemas, and fixtures belong in `src/types/`, `src/schema/`, and `src/data/`. Translation JSON lives in `public/locales/{tr,en}/`. Global theme tokens are defined in `src/index.css`. No automated test suite currently exists.

## Build, Test, and Development Commands

- `npm ci`: install dependencies from the committed lockfile.
- `npm run dev`: start the Vite development server.
- `npx tsc -b`: check TypeScript projects without bundling.
- `npm run build`: run TypeScript checks and create the production bundle.
- `npm run preview`: serve the production build locally.
- `npm run lint`: run Oxlint with `.oxlintrc.json` rules.

## Coding Style & Naming Conventions

Use typed function components, explicit props, and `import type` for type-only imports. Use two-space indentation in new files; preserve surrounding indentation when editing existing code. Name component files in PascalCase (`TaskTable.tsx`), hooks with a `use` prefix, and service functions in camelCase. Keep JSX readable across multiple lines. Oxlint is configured; no formatter is configured. Reuse shared page/card components and semantic Tailwind colors such as `bg-card` and `text-muted-foreground`. Add new interface text to both Turkish and English translation files.

## Testing Guidelines

There is no test runner, `npm test` script, coverage threshold, or established test naming convention. Run type checks, lint, and build before submitting. Manually verify affected routes, loading/error/empty states, CRUD behavior, language switching, and both themes. For layout changes, check narrow and wide screens and scroll long pages, including sidebar alignment. Document checks actually performed and any blockers.

## Commit & Pull Request Guidelines

History uses prefixes such as `feat:` and `refactor:` followed by short descriptions. Keep commits focused. PRs should describe the problem, changed behavior, verification results, and related issues when applicable. Include screenshots for visual changes. Preserve unrelated working-tree edits.

## Data & Configuration

DummyJSON is a demo service; successful writes do not guarantee persistent data. Keep API calls behind services and coordinate cache updates across affected screens. Never commit credentials or tokens.
