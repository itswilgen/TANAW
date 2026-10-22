// Explicit index.ts path: this file is also loaded by vite.config.ts.
import type { Hours, NavLink, Social } from '../types/index.ts'
import type { PhotoName } from './photos.generated.ts'

/**
 * Everything brand-level lives here: name, copy, contact details, hours.
 * Values marked PLACEHOLDER must be replaced before launch.
 */
export const site = {
  name: 'Tanaw Coffee',
  meaning: '“Tanaw” is Filipino for view',
  // PLACEHOLDER — your production domain, used for canonical + Open Graph URLs.
  url: 'https://tanawcoffee.example',
  title: 'Tanaw Coffee · Philippine specialty coffee, poured slowly',
  description:
    'A specialty café pouring single-origin Philippine coffee from Benguet, Sagada, Batangas and Mt. Apo, with pastries baked every morning.',
  locale: 'en_PH',
  themeColor: '#2A1F19', // matches the dark hero behind the mobile browser bar

  // PLACEHOLDER — address, coordinates and contact details.
  address: {
    street: '[Street address]',
    locality: 'Baguio City',
    region: 'Benguet',
    postalCode: '2600',
    country: 'PH',
  },
  /** Used for the map embed and "Get directions". PLACEHOLDER: Session Road, Baguio. */
  geo: { lat: 16.4119, lng: 120.5961 },
  phone: '+63 900 000 0000', // PLACEHOLDER
  email: 'hello@tanawcoffee.example', // PLACEHOLDER
  messengerUrl: 'https://m.me/tanawcoffee', // PLACEHOLDER
} as const

export const nav: NavLink[] = [
  { label: 'Story', href: '#story' },
  { label: 'Menu', href: '#menu' },
  { label: 'Process', href: '#process' },
  { label: 'The space', href: '#space' },
  { label: 'Visit', href: '#visit' },
]

// PLACEHOLDER — opening hours. `days` uses 0 = Sunday … 6 = Saturday, times are 24h, Asia/Manila.
export const hours: Hours[] = [
  { label: 'Monday – Friday', days: [1, 2, 3, 4, 5], open: '07:00', close: '20:00' },
  { label: 'Saturday', days: [6], open: '08:00', close: '21:00' },
  { label: 'Sunday', days: [0], open: '08:00', close: '18:00' },
]

// PLACEHOLDER — social handles.
export const socials: Social[] = [
  { label: 'Instagram', handle: '@tanawcoffee', href: 'https://instagram.com/tanawcoffee' },
  { label: 'Facebook', handle: 'Tanaw Coffee', href: 'https://facebook.com/tanawcoffee' },
]

export const hero = {
  eyebrow: 'Single-origin Philippine coffee · Baguio',
  /** Words are animated one by one; `em` sets a word in italic; `then` lists words it cycles to. */
  headline: [
    { text: 'Highland' },
    { text: 'coffee,' },
    { text: 'poured', em: true },
    { text: 'slowly.', em: true, then: ['by hand.', 'to order.', 'with care.'] },
  ],
  intro:
    'We roast beans from four Philippine origins in small weekly batches and brew every cup to order. Sit by the window, take your time, and taste where it came from.',
  caption: 'Roasted in small batches, every week',
  /** Full-bleed, decorative background (no alt). Phones get a portrait crop (see scripts/photos.json). */
  image: {
    landscape: 'hero-roaster',
    portrait: 'hero-roaster-portrait',
  } as const satisfies { landscape: PhotoName; portrait: PhotoName },
}

export const story = {
  eyebrow: 'Our story',
  title: 'Named for the view from the ridge.',
  paragraphs: [
    'Tanaw began on a cold morning in Sagada, watching the sea of clouds lift off the valley with a cup of coffee grown a few kilometres away. It was the best cup we had ever had, and almost nobody outside the Cordillera knew about it.',
    'So we went looking. We now buy directly from growers in Benguet, Sagada, Batangas and Mt. Apo, roast in small batches every week, and pay for quality so the next harvest is better than the last.',
    'The café is our way of sharing that view: Philippine coffee, treated with the same care as any famous origin.',
  ],
  facts: [
    { value: '4', label: 'Philippine origins' },
    { value: 'Weekly', label: 'small-batch roasts' },
    { value: 'To order', label: 'every cup, every time' },
  ],
}

export const origins = [
  { name: 'Benguet', detail: 'Arabica · Cordillera' },
  { name: 'Sagada', detail: 'Arabica · Mountain Province' },
  { name: 'Batangas Barako', detail: 'Liberica · Southern Luzon' },
  { name: 'Mt. Apo', detail: 'Arabica · Davao' },
] as const
