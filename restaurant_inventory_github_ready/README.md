# Restaurant Inventory & Operations

GitHub-ready frontend integration of the 29-screen Stitch restaurant inventory/operations prototype.

## What this package does

- Provides one Vite + React entry point.
- Preserves all 29 cleaned Stitch screens under `public/screens/`.
- Adds application-level hash routing.
- Bridges existing screen links/actions to the correct screen route.
- Keeps the project frontend-only: no Supabase, API, database, or secret keys are included.
- Keeps each screen's existing prototype JavaScript behavior intact.

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Static validation:

```bash
npm run check
```

## Main routes

Examples:

- `#dashboard`
- `#inventory`
- `#add-ingredient`
- `#ingredient-detail`
- `#add-stock`
- `#stock-counts`
- `#wastage`
- `#transfers`
- `#purchases`
- `#suppliers`
- `#recipes`
- `#production`
- `#reports`
- `#staff`
- `#settings`

See `src/routes.js` for all 29 screen routes.

## GitHub → Google AI Studio

1. Create a new GitHub repository.
2. Upload/push the contents of this folder to the repository root.
3. Keep secrets out of the repository.
4. Import that GitHub repository into Google AI Studio Build.
5. Verify `npm install` / `npm run build` before adding backend integrations.

## Backend status

No backend is connected yet. Supabase integration should be added only after the frontend workflows are accepted. Do not place a Supabase secret/service key in client-side code.
