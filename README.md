````
# TaskFlow

TaskFlow is a modern task management application that helps teams manage projects, tasks, and users from a single dashboard.

The application is built with React, TypeScript, Vite, and Tailwind CSS. Data is currently fetched from the DummyJSON API; a persistent backend and SQL integration will be added in a later phase.

## Features

- User authentication and protected routes
- Personal dashboard with open, completed, and overdue task summaries
- Create, edit, and delete tasks
- Monthly task calendar
- Project list, favorites, and project detail pages
- User list with pagination, editing, and deletion
- Team activity feed
- Read/unread notification management
- Light and dark theme support
- English and Turkish localization
- Responsive sidebar and application layout

## Technologies

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack React Query
- Axios
- React Hook Form
- Zod
- i18next
- Lucide React

## Project Structure

```text
src/
├── api/          # Axios configuration
├── components/   # Reusable UI components
├── context/      # Theme, authentication, and project state
├── data/         # Local mock data
├── hooks/        # React Query query and mutation hooks
├── layouts/      # Authentication and application layouts
├── pages/        # Route-level screens
├── schema/       # Zod form validation schemas
├── services/     # DummyJSON API requests
├── types/        # TypeScript types
└── lib/          # Shared configuration, such as QueryClient
````

## Installation

```
npm install
npm run dev
```

The application runs on the local address provided by Vite.

## Commands

```
npm run dev
```

Starts the development server.

```
npx tsc -b
```

Runs TypeScript type checking.

```
npm run lint
```

Runs code-quality checks with Oxlint.

```
npm run build
```

Creates a production build.

```
npm run preview
```

Previews the production build locally.

## Localization

The default application language is English. English and Turkish translation files are located in:

```
public/locales/en/
public/locales/tr/
```

New interface text should not be hardcoded in components. Add a translation key for every new string in both languages.

## Data Management

Task, user, and authentication data are managed through React Query, Context API, and DummyJSON.

DummyJSON supplies the initial task/user data and demo login only. Task and user changes are stored as validated, versioned, user-scoped `sessionStorage` overlays and are merged in the frontend data layer. They survive refreshes in the same browser tab but are not server persistence, team synchronization, or authorization.

The route guard is frontend-only. A future backend can replace the service/repository boundary without changing screen components.

When the real backend is introduced, the existing service layer can be connected to real API endpoints and SQL-backed persistent storage.

## Development Notes

- Keep shared UI components in `src/components/`.
- Do not make API requests directly inside pages; use `src/services/`.
- Keep data queries and mutations in `src/hooks/`.
- Create new screens in `src/pages/` and register routes in `src/App.tsx`.
- Add both English and Turkish localization for all new UI text.
