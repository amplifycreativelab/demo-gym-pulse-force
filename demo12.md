# Senior Expert Prompt — “PulseForge Gym” (Astro + Dark Mode Physics / Kinetic Stealth)

## Role
You are a **Principal Frontend Architect & UX Engineer**.
Objective: Engineer a **high-velocity, conversion-centric** marketing site for a **performance gym in Perth, WA**.

Design Philosophy: **“Kinetic stealth.”**  
The UI should feel **heavy and solid** (like a barbell), but move with **explosive speed**. Dark, noisy surfaces with **neon cuts** that guide the eye. Motion is sharp, controlled, and purposeful—not playful.

---

## 0) Non-negotiables
- **Astro 4.x** in **Static Mode (SSG)**, deployable to **GitHub Pages**.
- Performance budget: motion must not tank UX. Keep main thread mostly idle.
- **prefers-reduced-motion** support is mandatory.
- Conversion-first: primary CTA visible everywhere: **“Start Free Trial”** / **“Book a Session”**.

---

## 1) Visual Design System: “The Forge” (Lighting Engine)
We are not using flat colors. Build a **lighting engine** using CSS variables + layered surfaces.

### Color & Light Tokens (exact)
- **Void:** `#050505` (deepest background, never pure black)
- **Armor:** `#121214` (card backgrounds)
- **Graphite:** `#1C1C1F` (borders/dividers base tone)
- **Volt:** `#D4FF00` (high-vis yellow — primary action)
- **Flux:** `#2EFF7B` (radioactive lime — success/active states)
- **Signal:** `#FF2E2E` (errors/urgent)

Text:
- **Primary:** `#EDEDED`
- **Muted:** `#888888`

### Surface treatment (CRUCIAL)
**A) Noise Overlay (global)**
- Implement a global fixed `body::after` overlay:
  - base64 noise texture
  - `opacity: 0.04`
  - `mix-blend-mode: overlay`
  - prevents banding on dark gradients

**B) Glass-Dark surfaces**
- Components can use:
  - `backdrop-filter: blur(12px)`
  - background `rgba(18, 18, 20, 0.8)`
- Use sparingly for hero overlays, nav, and feature callouts.

**C) Borders as light (no solid borders)**
- No thick solid borders.
- Use either:
  - subtle `rgba(255,255,255,0.08)` edges
  - 1px gradient borders to simulate light catching an edge
- Dividers: thin, low-contrast, but visible.

### Typography (aggressive technical)
- Headings: **Sora (Variable)**
  - set `font-feature-settings: "ss01", "cv01";`
  - `letter-spacing: -0.04em` tightness
- Body: **Inter** or **Switzer**
- H1 sizing: `clamp(2.2rem, 5vw, 4.5rem)` (strong, modern)

---

## 2) Motion Strategy: “Explosive Control”
Prefer **Scroll-Driven Animations (CSS)** to keep the main thread idle.
Use **Motion One** (smaller than Framer Motion) for complex sequencing.

### Core motion rules
- No slow fades. Everything feels like **equipment snapping into position**.
- Use transform + clip-path reveals.
- Keep loops purely CSS transform-based.
- Must implement `prefers-reduced-motion`:
  - disable scroll-driven effects
  - reduce transitions to quick opacity/translate

### Signature interactions (must implement)
**A) The “Charge” Button (Volt CTA)**
- Default: solid and calm.
- Hover: a **conic-gradient** spins behind the border creating a “charging” effect.
- Click:
  - scale to `0.92` (heavy press)
  - flash white using `mix-blend-mode: overlay` (brief)
- Accessibility: focus-visible ring uses Volt.

**B) Scroll Reveal: Unpack Motion**
- Elements don’t “fade in.”
- They slide up while **unmasking** via `clip-path` expansion, like unboxing gear.

**C) Navigation transitions**
- Use **Astro View Transitions** globally.
- For navigation between **Classes list** and **Class detail**, use a distinct directional slide transition to preserve context.

---

## 3) Architecture & Tech Stack
### Core
- **Astro 4.x** (Static Mode)
- Deployment: **GitHub Pages**
  - must support base path in `astro.config.mjs` properly

### Styling
- **Tailwind CSS** with a custom theme preset:
  - tokens for Void/Armor/Graphite/Volt/Flux/Signal
- Add a small `src/styles/base.css` for:
  - noise overlay
  - scrollbar styling
  - reusable gradients / border-light utilities

### Interactivity (Islands)
- Use **SolidJS or Preact** for the schedule and filters (fast, minimal hydration).
- Use **Zod** to validate typed JSON/TS data:
  - classes, trainers, pricing
- Keep islands small. No full SPA.

---

## 4) Site Structure & Conversion UX
### Pages
- `/` Home
- `/programs/` Programs (bento grid)
- `/classes/` Schedule (core) + optional `/classes/[slug]/` detail
- `/trainers/`
- `/pricing/`
- `/about/`
- `/contact/` (trial form + map + hours)

### Global conversion elements
- Sticky header with Volt CTA: **Start Free Trial**
- Secondary CTA: **View Classes**
- Mobile sticky action bar: `Trial` / `Classes` / `Call` / `Map`

---

## 5) Enhanced Component Specs (must-follow)

### 5.1 Hero: “The Kinetic Pulse”
**Visual**
- Large kinetic typography: **“TRAIN. ADAPT. EVOLVE.”**
- Words automatically cycle every **3 seconds** with a **slot-machine vertical slide** effect.

**Background**
- A muted autoplay video element as atmosphere (no sound).
- Heavily obscured by a radial gradient map:
  - center glow (Volt/Flux very subtle)
  - fade to Void edges

**CTAs**
- Primary: ChargeButton (Volt) “Start Free Trial”
- Secondary: “View Classes”

### 5.2 Programs section: “Bento Grid”
Instead of boring cards, build a **bento layout**:
- Large square: Strength (video background)
- Tall rectangle: HIIT (action shot)
- Small square: Recovery
- Wide rectangle: Join Now

**Interaction**
- Hovering one item dims the others to `opacity: 0.5` (focus effect).
- Clicking goes to program detail section/page.

### 5.3 Schedule Island (core feature)
**Function**
- Reactive schedule table/list with filtering:
  - Day, Time (Morning/Lunch/Evening), Type (Strength/HIIT/Recovery), Intensity

**UX**
- When toggles change, rows reflow smoothly using **AutoAnimate** (`@formkit/auto-animate`).
- No jarring layout shifts.
- Add “Spots left” badges and intensity tags.

**Performance**
- Filtering must be instant, minimal re-renders.
- Validate class data with Zod.

---

## 6) SEO & Localization (Perth performance intent)
### Schema
Inject:
- `LocalBusiness` (or `HealthClub`) + `ExercisePlan` where relevant.
- Ensure consistent `@id` references.

### Geo-targeting
- Footer includes a styled **Service Area** module:
  - show Perth + Subiaco + Leederville
- Include a static map image (Mapbox static API or similar placeholder pattern).
- Mention Perth neighborhoods naturally in copy.

---

## 7) Implementation Deliverables (AI output requirements)

### Config
- `astro.config.mjs`
  - GitHub Pages `site` + `base` placeholders
  - View Transitions enabled
- `tailwind.config.mjs`
  - theme extended with Forge tokens
  - utilities for gradient borders, volt glow, glass-dark

### Global styles
- `src/styles/base.css` includes:
  - noise overlay with base64 texture
  - scrollbar customization (thin, dark, Volt thumb)
  - clip-path reveal keyframes
  - charge button conic gradient animation

### Data models (TypeScript + Zod)
- `ClassSession`, `Trainer`, `PricingTier`, `Program`
- Zod schemas + runtime validation

### Components (modular, separated logic/view)
Required:
- `MainLayout.astro` (SEO, noise overlay, base styles)
- `KineticText.astro` (slot machine cycling words)
- `ChargeButton.astro` (conic charge + heavy press)
- `BentoGrid.astro` (program bento layout)
- `ScheduleFilter.tsx` (island logic + filters + auto-animate)
- `ClassRow.astro` or equivalent presentational view component
- `Header.astro`, `Footer.astro`, `MobileActionBar.astro`

### Final Output Requirement
- Code must be **modular**.
- Do **not** dump everything into one file.
- Separate **Logic** (data/filtering/validation) from **View** (Astro components).
- Provide:
  - folder structure
  - full code for pages/components/islands
  - README with GitHub Pages deploy instructions and base path notes
  - `prefers-reduced-motion` behavior notes

---

## Quality Bar
This must feel like a performance gym brand: **dark, dense, and serious**, with motion that’s **fast and controlled**. The site should look expensive, load fast, and push users toward **trial + classes** with unmistakable CTAs.
