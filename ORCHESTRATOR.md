# CodeCrafting Orchestrator Living Memory

This file is the compact source of truth for current architecture, conventions, decisions, risks, and state. Updated iteratively from explorations and subagent work. Thread rules: Spawn subagents for tasks (goal/files/conventions/verify); review/incorporate; maintain here.

## Current Architecture (Mapped 2026)

- **Frontend** (`/codecrafting`): React 19 + Vite 7 + Tailwind 4 + React Router 7. Entry: `index.html` → `main.jsx` → `App.jsx` (central `<Routes>`).
  - **Routes**:
    | Path | Component | Guard |
    |------|-----------|-------|
    | `/login` | LoginPage | Public |
    | `/admin` | AdminPage | ProtectedAdminRoute |
    | `/` | HomePage | Layout |
    | `/services`, `/portfolio`, `/projects/:id` | ServicesPage, PortfolioPage, ProjectDetailsPage | Layout |
    | `*` | NotFoundPage | Layout |
  - **Layers** (`src/`):
    | Dir | Role |
    |-----|------|
    | `components/` | UI (Navbar/Layout/Hero/AdminDashboard/ProjectCard(isPreview) /ProtectedAdminRoute; subdir `admin/`). |
    | `pages/` | Route views (HomePage/PortfolioPage/ProjectDetailsPage/AdminPage/etc.). |
    | `hooks/` | Data: `useProjects`, `useApprovedReviews` (Supabase + states). |
    | `utils/` | Helpers: `publicData.js`(truncateText/normalize), `supabase.js`, `emailHandler.js`, `waitlist.js`. |
    | `lib/` | Supabase client (`supabaseClient.js` – singleton, env-based). |
    | `data/` | Static JSON (projects/reviews/social). |
  - Configs: `eslint.config.js` (flat ESLint 9, React rules), `vercel.json` (rewrite to `/`), scripts (vite dev/build/lint).
- **Backend** (`/supabase`): Self-hosted. `config.toml`; migration SQL (projects/reviews tables + RLS + project-images bucket); Edge Functions (`email-handler/waitlist` in Deno/TS).
- **No Tests**: Manual verification.
- **Assets**: `public/`, `src/assets/pictures/` (portfolio images).

## Conventions & Patterns
- **Supabase**: Use `lib/supabaseClient.js` everywhere. `VITE_` envs. Client-side admin = `isAdminEmail(VITE_ADMIN_EMAIL)`.
- **Data Flow**: Hooks for public fetches (loading/error/mounted guards, newest-first). Normalize before render. Progressive load (Portfolio/Reviews).
- **UI**: Tailwind responsive, JSX pascal-case, skeletons/modals/scroll reveals.
- **Mutations** (Admin): Auth check → status msg → rollback on fail.
- **Subagents**: Prompt = goal + owned files + forbidden files + conventions + verify steps. Review → update here.

## Decisions Locked
- Admin: Email gate (fallback 'your@email.com' → replace).
- Storage: `project-images` bucket.
- Reviews: Default `approved=false`; public only approved.
- Routing: Layout wraps public; explicit guards.

## Fragile/Non-Obvious
- **Env**: No VITE_SUPABASE_* → client fails closed (warns).
- **Auth**: Client email-only (upgrade to full Supabase Auth?).
- **Build/Deploy**: Vite errors in logs; needs Node. Vercel static.
- **RLS/Storage**: UI assumes exact policies/bucket → mismatches break CRUD/uploads.
- **Edge Functions**: Separate deploy (Deno/private NPM).
- **No Tests/CI**: Regression-prone.

## Verification Workflow
1. Set VITE_SUPABASE_URL/KEY/ADMIN_EMAIL.
2. `npm run lint && npm run build`.
3. Test routes/auth/projects/reviews/uploads/public views.

## Living Status
- Mapped fully (structure/deps/entry/conventions/fragiles). No changes made.
- Last updated: Post-exploration. Ready for subagents/tasks.
- Thread compounds: Feedback/subagent outputs/decisions → updates here.
