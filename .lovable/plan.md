## Premium dark agency site — build plan

A one-page scrolling agency site at `/`, built exactly to the supplied spec (colors, typography, motion, assets).

### Stack notes (adapting the spec to this project)
- This project uses TanStack Start, so there is no `App.tsx`. The page assembles in `src/routes/index.tsx`; components live in `src/components/`.
- `framer-motion` (Motion for React) and `lucide-react` get installed/used as specified.
- Outfit font loaded via `<link>` tags in `src/routes/__root.tsx` (weights 300–900), referenced as `--font-sans` in `@theme`.

### Design tokens (`src/styles.css`)
- Dark-only palette converted to oklch tokens: background `#0c1128`, foreground white, muted grays `#9ca3af` / `#d1d5db` / `#4b5563`.
- Custom tokens: `--color-neon-blue` (#00f0ff), `--color-neon-purple` (#b026ff).
- Radius scale kept large (pill/`rounded-3xl` usage), `selection:bg-blue-500/30` and `overflow-x-hidden` on body.

### Components
1. **Navbar.tsx** — fixed `top-6`, centered, `max-w-5xl` pill; scroll-driven `useTransform` mapping `[0,50]px` → bg opacity `0.02→0.08` and blur `8px→24px`; links Services / Work / Agency / Contact with expanding underline span; white "Start Project" CTA; mobile toggle expands pill to `rounded-3xl` with `aria-label`.
2. **Hero.tsx** — `h-[300vh]` wrapper, `sticky top-0 h-screen` inner. Base layer: outline city image + "Imagine the Future". Top layer: realistic city image + "Build the Reality", revealed via `clipPath` circle `0%→150%` on scroll, background `scale 1→1.15`. Single `<h1>` on the page. Bouncing chevron indicator.
3. **Clients.tsx** — "Trusted by 300+ businesses" header with "Interested" pill; infinite ticker animating `x: ["0%","-50%"]`, 40s linear infinite, duplicated track; Lucide icons (Camera, ShoppingBag, Hexagon, Tv, Globe2, CreditCard) with brand labels; left/right `#0c1128` fade gradients.
4. **Services.tsx** — 2x2 glass cards (UI/UX, Visual Graphic, Strategy, Business Growth), `bg-white/5 backdrop-blur-md rounded-3xl border-white/10`, icons inside quarter-circle corner backgrounds.
5. **Work.tsx** — `max-w-[1400px]`, header "Our Works" + "View All Projects". Flex accordion gallery, `h-[400px]`, horizontal on desktop / vertical stack on mobile; active `flex: 4`, inactive `flex: 0.8`, transition `0.6s` ease `[0.25,1,0.5,1]`; image `group-hover:scale-105 duration-1000`; active panel reveals title, description, CTA. 5 projects with the exact provided webp URLs, `loading="lazy"`.
6. **About.tsx** — `lg:grid-cols-2`; left bold headline "Design is not just what it looks like. It's how it feels."; right paragraphs + stats (10+ Years Experience, 150+ Global Clients); centered absolute `bg-purple-500/5 blur-[120px]` circle.
7. **Footer.tsx** — massive CTA headline "Let's create something epic." + "Start a Project" button; 4-column grid (brand, nav links, socials); bottom bar with copyright, Privacy Policy, Terms of Service.

Shared motion preset for section entrances: `initial {opacity:0,y:20}` → `whileInView {opacity:1,y:0}`, `viewport {once:true, margin:"-100px"}`, `duration 0.8`.

### Page assembly & SEO
- `src/routes/index.tsx` replaces the placeholder: renders `<Navbar />`, `<main>` with Hero/Clients/Services/Work/About sections, `<Footer />`.
- Route `head()` with agency-specific title, description, og:title/og:description, og:type, twitter:card, and `og:image`/`twitter:image` pointing at the absolute hero city URL.
- Semantic `header`/`main`/`section`/`footer`, alt text on every image, single `h1`, aria-labels on icon-only buttons, visible focus rings.

### Technical details
- Install `framer-motion`; `lucide-react` already available.
- Buttons: `rounded-full`, `hover:scale-105`, `active:scale-95`, `shadow-[0_0_20px_rgba(255,255,255,0.2)]`.
- Below-fold images use `loading="lazy"`; hero images eager.
- Verify the rendered page in a headless browser at desktop and mobile widths before finishing.
