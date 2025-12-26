# Development Tasks - Demo 12 (PulseForge Gym)

Source docs:

- `pulse-force/demo12.md`
- Reference format: `cafe-restaurant-demo/Demo 1 - Cafe - Restaurant - Tasks.md`

How to use:

- Mark items complete by changing `- [ ]` to `- [x]`.
- Work top-to-bottom; later phases depend on earlier setup.

## Phase 0 - Project Decisions

- [x] Confirm GitHub Pages repo name for Astro `base` (must be `"/<repo>/"`).
- [x] Confirm primary CTA wording used site-wide: Start Free Trial vs Book a Session.
- [x] Choose islands framework: SolidJS OR Preact (pick one and stick to it).
- [x] Confirm styling approach: Tailwind + `src/styles/base.css` (required by brief).
- [x] Confirm fonts: Sora (headings) + Inter or Switzer (body).
- [x] Confirm site IA (pages): Home, Programs, Classes (Schedule), Trainers, Pricing, About, Contact.
- [x] Confirm whether `/classes/[slug]/` class detail pages are included (optional in brief).
- [x] Confirm business placeholders (gym name, phone, address area in Perth WA, hours, socials).

## Phase 1 - Astro Setup (SSG + GitHub Pages)

- [x] Create Astro 4 project (static output / SSG).
- [x] Configure `astro.config.mjs` with GitHub Pages `site` + `base` placeholders.
- [x] Enable Astro View Transitions globally.
- [x] Ensure internal links and asset URLs work under the base path (no hard-coded `/`).
- [x] Add/verify scripts: `dev`, `build`, `preview`.
- [x] Add Tailwind for Astro and confirm it builds.
- [x] Add required deps: `zod`, `@formkit/auto-animate`, `motion` (Motion One), plus Astro integration for Solid/Preact.
- [x] Add `src/assets/` placeholders (hero video poster/video, program images, trainers, OG image).

## Phase 2 - Design System (The Forge: Lighting Engine)

- [x] Extend `tailwind.config.mjs` with Forge tokens (exact):
  - [x] Void `#050505`, Armor `#121214`, Graphite `#1C1C1F`
  - [x] Volt `#D4FF00`, Flux `#2EFF7B`, Signal `#FF2E2E`
  - [x] Text Primary `#EDEDED`, Muted `#888888`
- [x] Create `src/styles/base.css` for global surfaces/utilities:
  - [x] Noise overlay: fixed `body::after` base64 noise texture, `opacity: 0.04`, `mix-blend-mode: overlay`
  - [x] Scrollbar styling (thin, dark track, Volt thumb)
  - [x] Border-as-light utilities (1px gradient border + subtle edge)
  - [x] Glass-dark utility (`backdrop-filter: blur(12px)` + `rgba(18, 18, 20, 0.8)`)
  - [x] Clip-path reveal keyframes/utilities (unmask, no slow fades)
  - [x] Charge button conic-gradient hover animation
- [x] Typography system:
  - [x] Headings use Sora with `font-feature-settings: "ss01", "cv01"` and `letter-spacing: -0.04em`
  - [x] H1 uses `clamp(2.2rem, 5vw, 4.5rem)`
- [x] Implement `prefers-reduced-motion` baseline (disable scroll-driven effects, reduce transitions).

## Phase 3 - Core Layout & Shared Components

- [x] Create `src/layouts/MainLayout.astro`:
  - [x] Global SEO/meta slots + canonical support
  - [x] Imports `src/styles/base.css`
  - [x] Header + footer slots/partials
- [x] Build `Header.astro` (sticky) with Volt CTA and secondary View Classes link.
- [x] Build `Footer.astro` with Service Area module (Perth, Subiaco, Leederville) + hours + contact links.
- [x] Build `MobileActionBar.astro` (mobile sticky): Trial / Classes / Call / Map.
- [x] Build required components:
  - [x] `ChargeButton.astro` (conic charge hover + heavy press + focus-visible Volt ring)
  - [x] `KineticText.astro` (slot-machine cycling words every 3s; reduced motion fallback)
  - [x] `BentoGrid.astro` (program bento layout + hover dim others to 0.5)
  - [x] `ClassRow.astro` (presentational row/card for a class session)
- [x] Add small UI primitives as needed: `Card`, `Tag`, `Badge` (Spots left), `SectionHeader`.

## Phase 4 - Data Layer (TypeScript + Zod Validation)

- [x] Define TypeScript models + Zod schemas:
  - [x] `ClassSession`, `Trainer`, `PricingTier`, `Program`
- [x] Create data files with runtime validation:
  - [x] `src/data/classes.ts` (include day/time bucket, type, intensity, spotsLeft)
  - [x] `src/data/trainers.ts`
  - [x] `src/data/pricing.ts`
  - [x] `src/data/programs.ts`
- [x] Fail fast if data is invalid (schema parse during import/build).

## Phase 5 - Schedule Island (Core Feature)

- [x] Build `ScheduleFilter.tsx` (Solid/Preact island):
  - [x] Filters: Day, Time (Morning/Lunch/Evening), Type (Strength/HIIT/Recovery), Intensity
  - [x] Instant filtering, minimal re-renders
  - [x] AutoAnimate for smooth row reflow (`@formkit/auto-animate`)
  - [x] Spots left badges + intensity tags
  - [x] Accessible controls (labels, pressed states, keyboard support)
- [x] If implementing class detail pages:
  - [x] Add `/classes/[slug]/` route and a slug field in class data
  - [x] Add directional slide View Transition between list and detail

## Phase 6 - Pages (IA + Conversion UX)

### Home (`src/pages/index.astro`)

- [x] Hero:
  - [x] Kinetic headline: TRAIN. ADAPT. EVOLVE. (cycling words via `KineticText.astro`)
  - [x] Background video atmosphere (muted/autoplay) with radial gradient mask (Volt/Flux center glow, Void edges)
  - [x] Primary CTA: ChargeButton (Volt) Start Free Trial
  - [x] Secondary CTA: View Classes
- [x] Programs section using `BentoGrid.astro`.
- [x] Include schedule preview/entry point (link to Classes).
- [x] Add trust modules as needed (trainer highlights, results/testimonials placeholders).

### Programs (`src/pages/programs/index.astro`)

- [x] Programs overview and links (Strength / HIIT / Recovery) consistent with bento.

### Classes (`src/pages/classes/index.astro`)

- [x] Full schedule page with `ScheduleFilter.tsx` island.

### Trainers (`src/pages/trainers/index.astro`)

- [x] Trainers list rendered from `src/data/trainers.ts`.

### Pricing (`src/pages/pricing/index.astro`)

- [x] Pricing tiers rendered from `src/data/pricing.ts` with clear trial CTA.

### About (`src/pages/about/index.astro`)

- [x] Brand story page (Perth performance intent, serious tone).

### Contact (`src/pages/contact/index.astro`)

- [x] Trial form UI (non-functional OK) + map image placeholder + hours.
- [x] Keep primary CTA visible and consistent.

## Phase 7 - Motion & View Transitions

- [x] Implement scroll reveal pattern: slide-up + clip-path unmask (avoid slow fades).
- [x] Keep loops CSS transform-only; no JS animation loops.
- [x] Ensure View Transitions are enabled globally and respect reduced motion.
- [x] Implement reduced motion behavior:
  - [x] Disable scroll-driven effects
  - [x] Replace transitions with quick opacity/translate

## Phase 8 - SEO & Perth Localization

- [x] Set per-page titles + meta descriptions (conversion-focused).
- [x] Canonical URLs respect `site` + `base`.
- [x] Add OpenGraph + Twitter meta with placeholder OG image.
- [x] Inject schema:
  - [x] `HealthClub` (or `LocalBusiness`) and `ExercisePlan` where relevant
  - [x] Consistent `@id` references
- [x] Footer Service Area module includes Perth + Subiaco + Leederville (natural language).

## Phase 9 - Accessibility, Performance & Deployment

- [x] Accessibility QA: one H1 per page, logical heading order, keyboard nav, focus-visible, contrast.
- [x] Performance QA: keep islands small, avoid layout shift, defer non-critical JS, validate video usage.
- [x] Verify build works under GitHub Pages base path (no broken links/assets).
- [x] Add `README.md` with install/dev/build/preview and GitHub Pages deploy + base path notes.

## Optional / Bonus

- [ ] Add "Book a Session" secondary conversion path (if not the primary CTA).
- [ ] Add a results/testimonials section with structured data (only if it supports conversion).
