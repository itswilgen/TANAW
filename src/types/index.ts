import type { PhotoName } from '../data/photos.generated'

export interface PhotoMeta {
  width: number
  height: number
  photographer: string
  profileUrl: string
  sourceUrl: string
}

/** A photo reference used in content files: which image, and what it shows. */
export interface Photo {
  name: PhotoName
  alt: string
}

export type Tag = 'Signature' | 'New' | 'Vegan option' | 'Iced' | 'Hot' | 'Local'

export type CategoryId = 'coffee' | 'non-coffee' | 'pastries' | 'brew-bar'

export interface Category {
  id: CategoryId
  label: string
  /** One line shown above the list, in the voice of the menu board. */
  note: string
}

export interface MenuItem {
  name: string
  description: string
  /** Price in pesos, whole numbers. */
  price: number
  category: CategoryId
  tags?: Tag[]
  image: PhotoName
  alt: string
}

export interface SignatureDrink {
  name: string
  origin: string
  notes: string[]
  description: string
  price: number
  photo: Photo
}

export interface ProcessStep {
  title: string
  body: string
  detail: string
  photo: Photo
}

export interface Hours {
  label: string
  /** 0 = Sunday … 6 = Saturday */
  days: number[]
  /** 24h "HH:MM", local café time */
  open: string
  close: string
}

export interface NavLink {
  label: string
  href: `#${string}`
}

export interface Social {
  label: 'Instagram' | 'Facebook'
  href: string
  handle: string
}
