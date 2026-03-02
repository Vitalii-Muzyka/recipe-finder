# Recipe Finder App (Next.js)

Front-end test assessment implementation for a Recipe Finder application using Next.js App Router, Tailwind CSS, SSR, and Spoonacular API.

## Features

- Search form on `/` with:
  - recipe query
  - cuisine dropdown (full Spoonacular cuisine list)
  - diet dropdown
  - meal type dropdown
  - include ingredients input
  - max preparation time in minutes
- `Next` button is disabled until at least one field is filled.
- Navigation to `/recipes` with URL query params.
- Server-side recipe fetching on `/recipes` using Spoonacular `complexSearch` endpoint.
- API response caching for 1 minute (`revalidate: 60`).
- Pagination on recipes page (9 cards per page, 27 fetched results total).
- Recipe cards (title + image) linking to `/recipes/[id]`.
- Recipe details page with:
  - hero image, title, ready time, servings
  - summary, instructions, and recipe metadata badges
  - interactive ingredients checklist
  - `Copy ingredients` and `Clear selected` actions
  - localStorage persistence for selected ingredients per recipe
  - back navigation to `/recipes` with preserved filters and page
- Suspense-based loading fallbacks on list and details pages.
- Error handling UI for failed API requests.
- ESLint + Prettier configuration.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- TypeScript

## Project Structure

- `app/page.tsx` - search page (home)
- `app/components/` - reusable UI components for form and select controls
- `app/recipes/page.tsx` - SSR recipes list route composition
- `app/recipes/components/` - recipes list UI sections (filters bar, grid, pagination, fallback, results)
- `app/recipes/utils/` - recipes-specific utility functions
- `app/recipes/[id]/page.tsx` - SSR recipe details route composition
- `app/recipes/[id]/components/` - recipe details UI sections and ingredients checklist
- `lib/spoonacular.ts` - server API fetch utilities and cache settings
- `.env.example` - environment variable template

## Environment Variables

For security, `.env.local` is not committed. Use `.env.example` as a template.

Create `.env.local` in the project root:

```bash
cp .env.example .env.local
```

Then set your Spoonacular key:

```bash
SPOONACULAR_API_KEY=your_new_spoonacular_api_key
```

You can get a key from: https://spoonacular.com/food-api/docs#Authentication

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Open:

```text
http://localhost:3000
```

## Scripts

- `npm run dev` - run development server
- `npm run build` - production build
- `npm run start` - run production server
- `npm run lint` - run ESLint
- `npm run format` - check Prettier formatting
- `npm run format:write` - apply Prettier formatting

## Build

```bash
npm run build
npm run start
```

## Screenshots / Screencast

Search page:

Recipes list page:

Recipe details page:

## Notes

- Spoonacular free tier has rate limits.
- If API key is missing or invalid, the app shows a user-friendly error block on server-rendered pages.
