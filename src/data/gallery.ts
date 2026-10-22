import type { Photo } from '../types'

export interface GalleryPhoto extends Photo {
  caption: string
}

/** Interior photos. Order matters: the grid layout gives the first photo the most space. */
export const gallery: GalleryPhoto[] = [
  {
    name: 'space-long-table',
    alt: 'A long wooden communal table under warm hanging bulbs',
    caption: 'The long table, for slow mornings and laptops',
  },
  {
    name: 'space-bar',
    alt: 'The espresso bar with open shelves, brewing gear and pendant lights',
    caption: 'The bar, where every cup is made',
  },
  {
    name: 'space-bench',
    alt: 'Round wooden tables beside a long dark leather banquette',
    caption: 'The banquette along the back wall',
  },
  {
    name: 'space-plants',
    alt: 'A bright, high-ceilinged room with potted plants, pale tables and a mezzanine',
    caption: 'Plants, daylight and room to spread out',
  },
  {
    name: 'space-counter',
    alt: 'A bright room with arched windows and a long wooden counter',
    caption: 'Morning light through the arched windows',
  },
  {
    name: 'space-tiles',
    alt: 'Empty wooden tables and stools on a patterned tile floor under warm lights',
    caption: 'After close, before the next day begins',
  },
]
