import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type HtmlTagDescriptor, type Plugin } from 'vite'
import { hero, hours, site } from './src/data/site.ts'

/** Art-directed hero backdrop. Must match the <picture> in Hero.tsx. */
const HERO_SOURCES = [
  { name: hero.image.portrait, media: '(orientation: portrait)' },
  { name: hero.image.landscape, media: '(orientation: landscape)' },
]

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

/** Injects SEO tags and JSON-LD from src/data/site.ts, plus build-time preloads. */
function siteMeta(): Plugin {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    name: site.name,
    description: site.description,
    url: site.url,
    image: `${site.url}/og-image.jpg`,
    telephone: site.phone,
    email: site.email,
    servesCuisine: ['Coffee', 'Pastries'],
    priceRange: '₱₱',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    openingHoursSpecification: hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days.map((d) => dayNames[d]),
      opens: h.open,
      closes: h.close,
    })),
  }

  const meta = (attrs: Record<string, string>): HtmlTagDescriptor => ({ tag: 'meta', attrs, injectTo: 'head' })

  let base = '/'
  return {
    name: 'site-meta',
    configResolved(config) {
      base = config.base
    },
    transformIndexHtml(_html, ctx) {
      const tags: HtmlTagDescriptor[] = [
        { tag: 'title', children: site.title, injectTo: 'head' },
        meta({ name: 'description', content: site.description }),
        meta({ name: 'theme-color', content: site.themeColor }),
        { tag: 'link', attrs: { rel: 'canonical', href: site.url }, injectTo: 'head' },
        meta({ property: 'og:type', content: 'website' }),
        meta({ property: 'og:site_name', content: site.name }),
        meta({ property: 'og:locale', content: site.locale }),
        meta({ property: 'og:title', content: site.title }),
        meta({ property: 'og:description', content: site.description }),
        meta({ property: 'og:url', content: site.url }),
        meta({ property: 'og:image', content: `${site.url}/og-image.jpg` }),
        meta({ property: 'og:image:width', content: '1200' }),
        meta({ property: 'og:image:height', content: '630' }),
        meta({ property: 'og:image:alt', content: 'Freshly roasted coffee beans pouring from a drum roaster' }),
        meta({ name: 'twitter:card', content: 'summary_large_image' }),
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: JSON.stringify(jsonLd),
          injectTo: 'head',
        },
      ]

      // Hashed asset names only exist at build time.
      if (ctx.bundle) {
        const files = Object.keys(ctx.bundle)
        const find = (re: RegExp) => files.find((f) => re.test(f))
        const font = find(/fraunces-normal-[\w-]+\.woff2$/)
        if (font) {
          tags.push({
            tag: 'link',
            attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href: `${base}${font}`, crossorigin: '' },
            injectTo: 'head-prepend',
          })
        }
        for (const { name, media } of HERO_SOURCES) {
          const srcset = files
            .map((f) => [f, new RegExp(`/${name}-(\\d+)-[\\w-]+\\.webp$`).exec(f)?.[1]] as const)
            .filter(([, w]) => w)
            .sort(([, a], [, b]) => Number(a) - Number(b))
            .map(([f, w]) => `${base}${f} ${w}w`)
            .join(', ')
          if (!srcset) continue
          tags.push({
            tag: 'link',
            // `media` makes each device fetch only the crop it will show.
            attrs: { rel: 'preload', as: 'image', imagesrcset: srcset, imagesizes: '100vw', media, fetchpriority: 'high' },
            // After <meta viewport>: before it, the preload scanner would size 100vw at 980px.
            injectTo: 'head',
          })
        }
      }
      return tags
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), siteMeta()],
  build: { assetsInlineLimit: 0 },
})
