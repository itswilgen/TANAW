# Tanaw Coffee

Landing page for a specialty café pouring single-origin Philippine coffee. A static site:
React 19 + TypeScript + Vite + Tailwind CSS v4 + Motion. `npm run build` writes a
prerendered, deployable `dist/` folder. No server, no database, no API calls.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check, build, prerender → dist/
npm run preview    # serve dist/ at http://localhost:4173
npm run lint
```

Requires Node 20+.

## Edit the content

Everything on the page comes from typed files in `src/data/`. You never need to touch components to change copy.

| File | What it holds |
| --- | --- |
| `src/data/site.ts` | Name, SEO title/description, address, map coordinates, phone, email, Messenger link, opening hours, socials, hero and story copy, bean origins |
| `src/data/menu.ts` | Menu categories (tabs) and every item: name, description, price (₱, whole number), tags, photo, alt text |
| `src/data/signatures.ts` | The four signature drinks: origin, tasting notes, price, photo |
| `src/data/process.ts` | The four bean-to-cup steps |
| `src/data/gallery.ts` | Interior photos and captions for "The space" (first photo gets the big tile) |

**Before launch, replace every value marked `PLACEHOLDER` in `src/data/site.ts`**: the domain (`url`), street address, map coordinates, phone, email, Messenger link, opening hours and social handles. The street address deliberately renders as `[Street address]` on the page so it can't ship by accident.

The `<title>`, meta description, Open Graph tags and the `CafeOrCoffeeShop` JSON-LD are generated from `site.ts` at build time (see `vite.config.ts`), so they stay in sync with the page.

Opening hours drive the live "Open now / Closed" status (computed in Asia/Manila time on the visitor's device) and the highlighted "Today" row.

## Photos

All photos are real, free-license Unsplash photos stored as WebP in `src/assets/images/`, in several widths for `srcset`. Credits are listed in [`CREDITS.md`](./CREDITS.md) and in the footer's "Photo credits" dialog.

To add or swap a photo:

1. Add an entry to `scripts/photos.json` (`name`, Unsplash photo `id` and `slug`, photographer, `username`, `widths`).
2. Run `npm run photos`. It downloads the WebP files and regenerates `src/data/photos.generated.ts` (dimensions + credits) and `CREDITS.md`.
3. Reference it by `name` in a data file. TypeScript will flag typos.

Using your own photos instead: put `name-<width>.webp` files in `src/assets/images/` and add matching entries to `src/data/photos.generated.ts`.

## Fonts

Self-hosted. Manrope comes straight from `@fontsource-variable/manrope`. Fraunces is subset from `@fontsource-variable/fraunces` into `src/assets/fonts/` by `scripts/subset-fonts.py`. The optical-size axis stays variable, the weight is pinned at 450 (the only weight used), and ₱ gets its own 1 kB file. That cut ~150 kB from the first load. Re-run it only if you upgrade the package or change the weight (`pip install fonttools brotli`, then `python3 scripts/subset-fonts.py`).

## Deploy

The build output is plain static files in `dist/`.

**Vercel:** import the repo. Vercel detects Vite. Build command `npm run build`, output directory `dist`.

**Netlify:** new site from Git. Build command `npm run build`, publish directory `dist`. Or drag the `dist/` folder onto app.netlify.com/drop.

**GitHub Pages:** for a project site served from `/<repo>/`, add `base: '/<repo>/'` to `defineConfig` in `vite.config.ts`, then publish `dist/` (for example with the `actions/deploy-pages` workflow).

After deploying, set `site.url` in `src/data/site.ts` to the real domain so canonical and Open Graph URLs are correct.

## How it's built

```
src/
  data/            content (edit these)
  components/
    sections/      Nav, Hero, Story, OriginMarquee, Signatures, menu/, Process, space/, Visit, footer/
    ui/            Button, Container, SectionHeading, Tag, Image, Wordmark, SocialIcon
  lib/             motion presets, image lookup, hours/status, formatting
  hooks/           body scroll lock, media query, live café status, reduced-motion value
  assets/          images (WebP) and subset fonts
scripts/           photo fetcher, font subsetter, prerender step
```

- **Design tokens** live in `@theme` in `src/index.css`: colors (oat, foam, espresso, roast, bean, clay, crema, sage), the type scale, radii and easing. Components use tokens only.
- **Prerendering:** `npm run build` also renders the app to HTML (`src/entry-server.tsx` → `scripts/prerender.mjs`) and inlines the CSS, so the page paints before JavaScript loads. React then hydrates it.
- **Motion:** shared variants in `src/lib/motion.ts`. The page-load sequence runs in CSS (`load-in` utilities) so it plays on first paint. Motion's animation code is loaded lazily via `LazyMotion`. Everything respects `prefers-reduced-motion`: fades only, no parallax, no marquee.
