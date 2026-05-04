# Wanderlust Labs — Project Specification (`context.md`)

> Implementation-ready specification for the Wanderlust Labs frontend MVP. This document is the single source of truth for the build. A coding agent should be able to implement the entire project from this spec without additional design or product input.

---

## Product Overview

**Wanderlust Labs** is a frontend MVP for a travel-tech startup. The product is an **experience explorer** that allows users to discover, browse, and save curated travel experiences from around the world.

The app is **not** a booking platform. There is no checkout, no payment, no availability calendar, no traveler/date selection, and no real account system. It is a clean, modern, image-forward marketplace UI for browsing experiences and saving favorites locally in React state.

The visual direction is a **clean travel marketplace** with a soft blue/teal brand identity, white card surfaces, rounded corners, subtle shadows, and image-forward cards — inspired by Airbnb Experiences, GetYourGuide, and Tripadvisor.

---

## MVP Scope

The MVP must allow users to:

- Browse 100 curated travel experiences on an explorer page
- Search experiences by title (case-insensitive regex)
- Filter experiences by category
- Filter experiences by destination
- View a detail page for any single experience
- Favorite and unfavorite experiences via a heart icon
- View all favorited experiences on a dedicated favorites page
- View a simple mock profile page that shows the user's favorite count

That is the entire functional scope. Anything outside this list is out of scope (see **What Not to Build**).

---

## Tech Stack

- **Framework:** Next.js (latest stable) with the **App Router**
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **State:** React `useState` and `useEffect` only — no Redux, no Zustand, no Context-based global stores beyond simple lift-and-pass, no `localStorage`
- **Icons:** `lucide-react` (recommended) for heart, search, star, map pin, arrow icons
- **Data:** Local TypeScript file — no database, no external API, no fetch calls
- **Images:** Use `next/image` with remote URLs (Unsplash or similar) or static placeholders

---

## Required Routes

The app must implement exactly these five routes using the App Router:

| Route                  | Page                  | Purpose                                           |
| ---------------------- | --------------------- | ------------------------------------------------- |
| `/`                    | Home                  | Hero, category browse, trending experiences      |
| `/experiences`         | Explorer              | Search + filter + grid of all experiences        |
| `/experiences/[id]`    | Experience Detail     | Single experience view with favorite button     |
| `/favorites`           | Favorites             | All favorited experiences in a grid              |
| `/profile`             | Profile               | Mock user profile + favorite count               |

Suggested folder structure:

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                       # /
│   ├── experiences/
│   │   ├── page.tsx                   # /experiences
│   │   └── [id]/
│   │       └── page.tsx               # /experiences/[id]
│   ├── favorites/
│   │   └── page.tsx                   # /favorites
│   └── profile/
│       └── page.tsx                   # /profile
├── components/
├── hooks/
├── data/
│   └── experiences.ts
└── types/
    └── experience.ts
```

---

## Data Model

### TypeScript Interface

The project must define and export this exact interface:

```ts
// src/types/experience.ts
export interface Experience {
  id: string;
  title: string;
  description: string;
  category: "Adventure" | "Culture" | "Food" | "Wellness" | "Nature";
  destination: string;
  price: number;
  rating: number;
  imageUrl: string;
}
```

### Dataset

- Location: `src/data/experiences.ts`
- Must export an array of **100 experience objects** typed as `Experience[]`
- Each object must include all 8 fields above
- `id` should be a stable string (e.g. `"exp-001"` through `"exp-100"`)
- `category` must be one of the five literal values in the union
- `destination` should be a `"City, Country"` format (e.g. `"Ha Long Bay, Vietnam"`)
- `price` is a number representing USD starting price (e.g. `99`)
- `rating` is a number from `0` to `5` with one decimal (e.g. `4.8`)
- `imageUrl` should be a high-quality landscape travel image URL
- The dataset should have a healthy spread across all 5 categories and at least 15–20 unique destinations so filters feel real

A small example:

```ts
export const experiences: Experience[] = [
  {
    id: "exp-001",
    title: "Kayak & Cave Tour",
    description: "Paddle through emerald waters and hidden lagoons surrounded by towering limestone cliffs...",
    category: "Adventure",
    destination: "Ha Long Bay, Vietnam",
    price: 99,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/...",
  },
  // ...99 more
];
```

---

## URL Query Parameter Behavior

The Explorer page (`/experiences`) must keep search and filter state in the **URL query parameters** so links are shareable and the browser back/forward buttons work naturally.

### Supported query params

| Param         | Type     | Example                         |
| ------------- | -------- | ------------------------------- |
| `search`      | string   | `?search=sailing`               |
| `category`    | string   | `?category=Adventure`           |
| `destination` | string   | `?destination=Croatia`          |

These can stack:

```
/experiences?search=sailing&category=Adventure&destination=Croatia
```

### Required behavior

1. **On page load**, the Explorer page must read query params and pre-fill the search input and filter dropdowns to match.
2. **On user input**, when the user types in the search bar or changes a filter, the URL must update to reflect the new state.
3. **Filtering** must always derive from the URL state, not separate local state, to avoid drift.
4. The page must use Next.js navigation hooks: `useSearchParams`, `usePathname`, and `useRouter`.
5. Use `router.replace` (not `router.push`) when updating filters so the browser history is not flooded with intermediate states.
6. Search input updates should be **debounced** (~250–300ms) before writing to the URL to avoid excessive history churn.

### Important notes

- `useSearchParams` returns a read-only object. Build a new `URLSearchParams` instance from it before mutating.
- Empty/cleared values should be **removed** from the URL, not left as empty strings.
- The Explorer page must be wrapped in a `<Suspense>` boundary because `useSearchParams` requires it in the App Router.

---

## Search and Filter Logic

All filtering happens client-side against the local `experiences` array.

### Search (by title)

Use a **case-insensitive regex** match against the `title` field:

```ts
new RegExp(searchTerm, "i").test(experience.title)
```

The search must be wrapped in a try/catch because user input can produce an invalid regex (e.g. an unclosed bracket). On invalid regex, fall back to a plain case-insensitive `includes` match so the UI never throws.

### Category filter

If a category is selected, only show experiences whose `category` exactly matches. If the category is `"All categories"` or empty, do not filter by category.

### Destination filter

If a destination is selected, only show experiences whose `destination` exactly matches. If empty or `"All destinations"`, do not filter by destination.

### Combined filtering

All three filters (search + category + destination) must stack with AND logic. Any combination of zero, one, two, or three active filters must work correctly.

### No-results state

When the filtered array is empty, the Explorer page must show a friendly empty state with:

- A short message ("No experiences match your filters")
- A "Clear filters" button that resets all query params

---

## Favorites State Plan

Favorites are managed entirely in React `useState`.

### Rules

- **Storage:** A single `string[]` of favorited experience IDs in React state
- **Location:** Lifted to the root layout (or a top-level client component that wraps the app) so all pages share the same state
- **No persistence:** Refreshing the page resets favorites — this is acceptable and explicitly required
- **No `localStorage`**, no `sessionStorage`, no cookies, no Redux, no Zustand, no Jotai, no external state libraries

### Sharing state across pages

Because the App Router uses Server Components by default, favorites state lives in a client component. Two acceptable approaches:

1. **Recommended:** A small `FavoritesProvider` client component using React Context, where the `value` is `{ favorites, toggleFavorite, isFavorite }` derived from a single `useState`. Wrap the app in `app/layout.tsx`.
2. Alternative: Pass favorites and setters down via props from a top-level client wrapper.

Either way, **no external state library** is allowed. React Context backed by `useState` is fine — it is a built-in React feature, not a "state management library."

### API

The `useFavorites` hook (see Custom Hooks) must expose:

```ts
{
  favorites: string[];           // array of experience IDs
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  count: number;                 // favorites.length
}
```

### Visual behavior

- Unfavorited cards show an **outlined heart** icon in the top-right corner of the image
- Favorited cards show a **filled red heart** icon
- Clicking the heart toggles state immediately (optimistic, since it's local)
- The heart button must `stopPropagation` so clicking it does not also navigate to the detail page
- The detail page has a larger "Saved" / "Save" pill button in the top-right that reflects the same state

---

## Component Plan

Build these reusable components. Co-locate them under `src/components/`.

### Required components

| Component         | Purpose                                                                          |
| ----------------- | -------------------------------------------------------------------------------- |
| `Navbar`          | Top navigation: logo, links to Home / Explorer / Favorites / Profile, avatar    |
| `ExperienceCard`  | Image, title, destination, rating, price, heart icon                             |
| `ExperienceGrid`  | Responsive grid wrapper that renders an array of `ExperienceCard`s              |
| `SearchBar`       | Text input with search icon, controlled value, debounced onChange                |
| `FilterBar`       | Wraps category + destination dropdowns (and an optional sort dropdown)           |
| `CategoryPill`    | Icon + label tile for the homepage "Browse by category" row                      |
| `EmptyState`      | Reusable empty-state block (used on Explorer no-results and empty Favorites)     |
| `HeartButton`     | Self-contained favorite toggle button with filled/outlined states                |

### Component notes

- `ExperienceCard` must accept the full `Experience` object as a prop and link to `/experiences/${id}` when the card body (not the heart) is clicked.
- `SearchBar` and `FilterBar` are **controlled** components driven by URL state.
- The `Navbar` is shared across all 5 pages and must show the active route with an underline or accent color (matching the mockup).

---

## Custom Hooks

The project must include **at least one** meaningful custom hook. Recommended: build all three.

### `useFavorites()`

Reads from the favorites context and returns `{ favorites, isFavorite, toggleFavorite, count }`. This is the primary custom hook the rest of the app uses.

### `useFilters()`

Encapsulates the URL query param logic for the Explorer page. Returns:

```ts
{
  search: string;
  category: string;
  destination: string;
  setSearch: (value: string) => void;
  setCategory: (value: string) => void;
  setDestination: (value: string) => void;
  clearAll: () => void;
}
```

Internally uses `useSearchParams`, `usePathname`, and `useRouter`. Updates the URL via `router.replace` whenever a setter is called.

### `useExperiences(filters)`

Takes the current filter state and returns the filtered `Experience[]`. Encapsulates the search regex + category + destination logic in one place so the Explorer page stays thin.

### Meaningful `useEffect` usage

The project must use `useEffect` at least once in a meaningful way. Acceptable uses:

- Syncing local input state from URL query params on mount and when the URL changes
- Updating `document.title` on the experience detail page to match the experience title
- Debouncing the search input before pushing to the URL

**Warning to implementer:** Be careful with dependency arrays. Do not put unstable references (like new objects or arrays created in render) in the dep array — this causes infinite loops. If syncing from `searchParams`, depend on the specific string values, not the `searchParams` object itself.

---

## Page-by-Page UI Requirements

### `/` — Home Page

Sections, top to bottom:

1. **Navbar** (shared across all pages)
2. **Hero section**
   - Two-column layout on desktop: left has headline + subheadline + CTA, right has a large travel image with rounded corners
   - Headline: **"Discover experiences worth traveling for"**
   - Subheadline: short copy about curated adventures
   - Primary CTA button: **"Explore Experiences"** with arrow icon, links to `/experiences`
   - Secondary inline search bar below the CTA — submitting it navigates to `/experiences?search=<term>`
3. **Browse by category** row
   - Section title: "Browse by category"
   - Five category tiles (Adventure, Culture, Food & Drink, Nature, Wellness) each with an icon and label
   - Clicking a tile navigates to `/experiences?category=<Category>`
   - A "View all" link on the right of the section header
4. **Trending experiences** row
   - Section title: "Trending experiences"
   - Horizontal row of 4–5 `ExperienceCard`s pulled from the dataset (just slice the first N or pick a curated handful)
   - "View all" link on the right linking to `/experiences`

Keep the homepage focused. Do not add testimonials, newsletter signup, footer CTAs, or marketing sections beyond what's in the mockup.

---

### `/experiences` — Explorer Page (the most important page)

Sections, top to bottom:

1. **Navbar**
2. **Page title:** "Explore experiences"
3. **Search bar** — full-width, with search icon, placeholder "Search experience titles…"
4. **Filter row** — three dropdowns laid out horizontally:
   - **Category** (`All categories`, `Adventure`, `Culture`, `Food`, `Wellness`, `Nature`)
   - **Destination** (`All destinations`, then unique destinations from the dataset)
   - **Sort by** *(optional visual polish — see note below)*
5. **Grid of `ExperienceCard`s** — 4 columns on desktop, responsive
6. **Pagination** *(optional visual polish — see note below)*
7. **Empty state** when filters return zero matches

#### About Sort and Pagination

The mockup shows a "Sort by: Recommended" dropdown and `1 2 3 >` pagination. These are **optional visual polish**, not core functional requirements. Acceptable implementations:

- **Sort dropdown:** Render it for visual fidelity, but it can be either non-functional (purely visual) or implement only one or two simple sorts (Price low→high, Rating high→low). Do not over-engineer this.
- **Pagination:** Either render the pagination UI as a static visual element OR show all matching experiences in the grid (no pagination). For 100 experiences, a single scrollable grid is acceptable. If implemented, paginate at ~12 per page.

Neither is a hard requirement. Prioritize search and filtering correctness first.

---

### `/experiences/[id]` — Experience Detail Page

Sections, top to bottom:

1. **Navbar**
2. **Top bar:**
   - "← Back to results" link on the left, navigates to `/experiences`
   - "Saved" / "Save" pill button on the right with heart icon
3. **Hero image** — large, rounded, full-width
4. **Thumbnail strip** *(optional visual polish — render 4–5 small thumbnails of the same image or related stock images for visual fidelity; no real image gallery functionality required)*
5. **Title block:**
   - Large title (the experience's `title`)
   - Subline: `{destination} · {category}`
   - Star rating with review count, and price aligned right (`From $99`)
6. **Description paragraph** — uses the experience's `description` field
7. **Highlight cards row** — 4 small static info pills with icons. These are **decorative, not data-driven** — use sensible defaults like:
   - 🕒 **Duration** — `4–5 hours`
   - 👥 **Small group** — `Max 12 people`
   - 🎯 **Beginner friendly** — `No experience needed`
   - ❤️ **Best for couples & friends**

Implementation notes:

- The page is dynamic via `[id]`. Look up the experience from `src/data/experiences.ts` by ID.
- If no experience matches the ID, render a "Not found" state or call `notFound()` from `next/navigation`.
- Use `useEffect` to update `document.title` to the experience title (good meaningful useEffect usage).
- Do **not** build a booking flow, date picker, traveler counter, calendar, "Reserve" button, or checkout. The Save button is the only action.

---

### `/favorites` — Favorites Page

Sections, top to bottom:

1. **Navbar**
2. **Header row:**
   - Title: **"My Favorites"**
   - Saved count badge: e.g. `8 saved` (pulled from `useFavorites().count`)
   - Subtitle: "Your saved experiences"
3. **Grid of favorited `ExperienceCard`s** — same card component as the Explorer
4. **Empty state** when no favorites are saved:
   - Friendly message: "Find more to love"
   - Subtext: "Explore new places and save your favorites"
   - CTA button: "Explore experiences" → `/experiences`

The favorites grid uses the exact same `ExperienceGrid` and `ExperienceCard` components as the Explorer.

---

### `/profile` — Profile Page

This is a **mock** profile page. None of the data is real or editable.

Sections, top to bottom:

1. **Navbar**
2. **Profile header:**
   - Circular avatar (use a static image URL or placeholder)
   - Name: **"Emma Walker"** (hardcoded)
   - Handle: `@emmaexplores` (hardcoded)
   - Location: `Austin, Texas, USA` (hardcoded)
   - Short bio (hardcoded)
3. **Stats row** — three stat cards:
   - **Favorites** — number, pulled live from `useFavorites().count`
   - **Explored destinations** — static number (e.g. `12`)
   - **Experiences explored** — static number (e.g. `18`)

   Only the **Favorites** stat is dynamic. The others are static placeholder values.
4. **Travel highlights** *(optional visual polish — three static info cards)*:
   - Top category: `Adventure`
   - Most explored region: `Asia`
   - Travel style: `Explorer`

   These are purely decorative and hardcoded.
5. **Recently saved** *(optional visual polish)* — horizontal strip of the most recently favorited experiences. If favorites is empty, hide the section.

Do **not** build account settings, edit profile, payment methods, booking history, notifications settings, or any account management UI.

---

## Visual Design System

Match the mockup's clean, modern, travel-focused aesthetic.

### Brand Identity

- **Primary brand color:** soft teal/blue. Suggested: Tailwind `cyan-700` (`#0E7490`) or `teal-700` (`#0F766E`). Pick one and use it consistently for the logo, primary buttons, active nav links, links, and price text.
- **Accent color (favorites):** red. Tailwind `red-500` (`#EF4444`) for filled hearts.
- **Star rating color:** amber/yellow. Tailwind `amber-400` (`#FBBF24`).

### Surface Colors

- **Page background:** very light gray/blue. Suggested: `slate-50` or `#F5F8FA`
- **Card background:** pure white (`#FFFFFF`)
- **Borders:** soft gray (`slate-200`)

### Typography

- Use a clean modern sans-serif. **Inter** via `next/font/google` is recommended.
- Headings: bold, tight tracking
- Body: regular weight, comfortable line height
- Prices: semibold, brand color

### Card Design

- White background
- Rounded corners: `rounded-2xl` (or `rounded-xl`)
- Subtle shadow: `shadow-sm` resting, `shadow-md` on hover
- Image takes full card width with rounded top corners
- Heart icon absolutely positioned top-right of image with a soft white circular background for legibility
- Below image: title (semibold), destination (gray subtext), rating + price row

### Buttons

- Primary: filled brand color, white text, rounded (`rounded-full` or `rounded-lg`), medium padding
- Secondary: white background, brand-color border + text
- Hover states on all interactive elements

### Navbar

- White background, sticky to top
- Logo on the left (small mountain/triangle icon + "Wanderlust Labs" wordmark)
- Nav links centered or right: Home, Explorer, Favorites, Profile
- Active link: brand color text + underline accent
- Avatar on the far right (static image)
- Bell icon next to avatar is **decorative only** — no notifications functionality

### Spacing and Layout

- Generous whitespace between sections
- Max content width around `max-w-7xl` centered with horizontal padding
- Section vertical padding: `py-12` to `py-16` between major blocks

---

## Responsive Requirements

The app must be responsive across mobile, tablet, and desktop.

### Breakpoints (Tailwind defaults)

- **Mobile** (`< 640px`): single column grids, stacked filters, hamburger or simplified navbar
- **Tablet** (`640px – 1024px`): 2-column card grids, filters in a row
- **Desktop** (`> 1024px`): 3–4 column card grids, full horizontal navbar, side-by-side hero

### Specific responsive behaviors

- `ExperienceGrid`: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- Hero: stacked on mobile, two-column on `md:` and up
- Filter bar: stacks vertically on mobile, horizontal on `sm:` and up
- Navbar: nav links can collapse to a simple hamburger or hide on small screens — a polished mobile menu is **optional polish**, not required

Test at minimum: iPhone-sized viewport, iPad-sized viewport, and 1440px desktop.

---

## README Requirements

The README must include a section titled exactly:

```md
## Design References
```

This section must reference **2–3 real-world products** that inspired the design and briefly explain how each influenced the build. Suggested references:

- **Airbnb Experiences** — card-based browsing, image-forward discovery, clean detail pages
- **GetYourGuide** — search/filter placement, category pills, marketplace UX
- **Tripadvisor** — rating + price card pattern, destination filtering

Each reference should have 1–2 sentences explaining its influence. Example:

> **Airbnb Experiences** — inspired the image-forward card design, the rounded corners and soft shadows, and the placement of the favorite heart icon on the top-right of each card image.

The README should also include standard sections:

- Project title and short description
- Tech stack
- Getting started (`npm install`, `npm run dev`)
- Project structure overview
- Notes on local-only state (favorites do not persist on refresh — this is intentional)

---

## What Not to Build

These features are **explicitly out of scope**. Do not implement them, even partially.

- ❌ Checkout flow
- ❌ Booking flow (date picker, traveler counter, "Reserve" button beyond visual)
- ❌ Payment methods or payment forms
- ❌ User authentication, sign-up, or login
- ❌ Database (no Postgres, no SQLite, no Prisma, no Supabase)
- ❌ External APIs (no fetch calls to real travel APIs)
- ❌ Real user accounts or user profiles backed by data
- ❌ Itinerary builder
- ❌ Availability calendar
- ❌ Date selection or traveler-count controls
- ❌ Advanced dashboards or analytics
- ❌ Account settings page (edit profile, change password, etc.)
- ❌ `localStorage`, `sessionStorage`, or cookie-based persistence
- ❌ Redux, Zustand, Jotai, Recoil, MobX, or any external state library
- ❌ Server actions for mutations (favorites are pure client state)
- ❌ Email signup, newsletter, or marketing forms
- ❌ Real notifications (the bell icon is decorative)
- ❌ Reviews/comments system
- ❌ Map view or geolocation features

If a decision feels like it's expanding scope, it probably is. **When in doubt, leave it out.**

---

## Suggested Implementation Phases

Build in this order. Do not move to the next phase until the current one works.

### Phase 1 — Project setup

- Initialize Next.js with TypeScript, Tailwind, and App Router
- Install `lucide-react`
- Set up Inter font via `next/font/google`
- Configure Tailwind theme with brand color
- Create folder structure (`components/`, `hooks/`, `data/`, `types/`)

### Phase 2 — Data and types

- Create `src/types/experience.ts` with the `Experience` interface
- Create `src/data/experiences.ts` with 100 experience objects spread across all 5 categories and 15+ destinations

### Phase 3 — Shared components

- Build `Navbar` and wire it into `app/layout.tsx`
- Build `ExperienceCard`, `ExperienceGrid`, `HeartButton`
- Build `EmptyState`

### Phase 4 — Favorites state

- Create `FavoritesProvider` (Context + `useState`) and wrap the app
- Build `useFavorites()` hook
- Wire `HeartButton` into `ExperienceCard`

### Phase 5 — Explorer page

- Build `SearchBar` and `FilterBar`
- Build `useFilters()` hook (URL query param logic)
- Build `useExperiences(filters)` hook (filter logic with regex search)
- Wire everything into `/experiences/page.tsx` with a `<Suspense>` boundary
- Test all filter combinations and the no-results state

### Phase 6 — Detail page

- Build `/experiences/[id]/page.tsx`
- Look up experience by ID; handle not-found
- Use `useEffect` to update `document.title`
- Wire the Save button to `useFavorites`

### Phase 7 — Home page

- Build hero, category browse row, trending experiences row
- Wire category tiles to `/experiences?category=X` links
- Wire homepage search to `/experiences?search=X` on submit

### Phase 8 — Favorites page

- Build `/favorites/page.tsx`
- Render filtered grid + count + empty state

### Phase 9 — Profile page

- Build `/profile/page.tsx` with hardcoded user info
- Wire favorites count to `useFavorites().count`

### Phase 10 — Polish and README

- Responsive review at all breakpoints
- Hover states on cards and buttons
- Write README with `## Design References` section
- Final cleanup

---

## Final Build Checklist

Before considering the project done, verify every item:

### Routes
- [ ] `/` renders the home page with hero, category row, and trending row
- [ ] `/experiences` renders the explorer with search, filters, and grid
- [ ] `/experiences/[id]` renders a working detail page for any valid ID
- [ ] `/favorites` renders the favorites grid with count and empty state
- [ ] `/profile` renders the mock profile with live favorites count

### Data
- [ ] `src/types/experience.ts` exports the `Experience` interface exactly as specified
- [ ] `src/data/experiences.ts` exports 100 experiences typed as `Experience[]`
- [ ] All 5 categories are represented in the dataset
- [ ] At least 15 unique destinations exist in the dataset

### Search and Filters
- [ ] Search uses case-insensitive regex (`new RegExp(searchTerm, "i").test(...)`)
- [ ] Search is wrapped in try/catch to handle invalid regex input
- [ ] Category filter works
- [ ] Destination filter works
- [ ] All three filters stack correctly with AND logic
- [ ] No-results state renders when filters return zero matches with a "Clear filters" button

### URL Query Params
- [ ] `search`, `category`, and `destination` are reflected in the URL
- [ ] `/experiences?search=sailing&category=Adventure&destination=Croatia` loads pre-filtered
- [ ] Inputs and dropdowns are pre-filled from query params on page load
- [ ] Updating filters uses `router.replace` (not `push`)
- [ ] Cleared filters are removed from the URL, not left as empty strings
- [ ] Explorer page is wrapped in `<Suspense>`

### Favorites
- [ ] Favorites stored in React `useState` (no `localStorage`)
- [ ] No external state library used
- [ ] Heart icon toggles correctly on every card
- [ ] Heart icon's click does not trigger card navigation (`stopPropagation`)
- [ ] Detail page Save button reflects the same state
- [ ] `/favorites` shows only favorited experiences
- [ ] `/profile` favorites count updates live as favorites change

### Hooks and Effects
- [ ] At least one custom hook exists (`useFavorites`, `useFilters`, or `useExperiences`)
- [ ] At least one meaningful `useEffect` is used
- [ ] No infinite loops or missing dependency warnings in the console

### Visual
- [ ] Brand color is consistent across logo, buttons, links, and active nav state
- [ ] Cards have white background, rounded corners, subtle shadow, hover lift
- [ ] Heart icons are outlined (unfavorited) or filled red (favorited)
- [ ] Star ratings are amber/yellow
- [ ] Navbar shows the active route with an accent
- [ ] Layout is responsive at mobile, tablet, and desktop breakpoints

### Out of Scope
- [ ] No checkout, booking, payments, or auth code anywhere in the project
- [ ] No `localStorage`, `sessionStorage`, or external state libraries
- [ ] No external API calls or database
- [ ] No date pickers, traveler counters, or calendars

### README
- [ ] README has a `## Design References` section with 2–3 real references
- [ ] Each reference has 1–2 sentences explaining its influence
- [ ] Standard project sections are included (description, tech stack, getting started)

---

**End of specification.** This document is the complete, implementation-ready spec for Wanderlust Labs. Build the project according to this spec.