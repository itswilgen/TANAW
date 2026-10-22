import { photoMeta, type PhotoName } from '../data/photos.generated'

// Every WebP in src/assets/images, keyed by path. Vite hashes and copies them at build.
const files = import.meta.glob<string>('../assets/images/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})

const variants = new Map<string, { width: number; url: string }[]>()
for (const [path, url] of Object.entries(files)) {
  const match = /\/([\w-]+)-(\d+)\.webp$/.exec(path)
  if (!match) continue
  const [, name, width] = match
  const list = variants.get(name) ?? []
  list.push({ width: Number(width), url })
  variants.set(name, list)
}
for (const list of variants.values()) list.sort((a, b) => a.width - b.width)

interface ResolvedImage {
  src: string
  srcSet: string
  width: number
  height: number
}

export function getImage(name: PhotoName): ResolvedImage {
  const list = variants.get(name)
  if (!list?.length) throw new Error(`Missing image files for "${name}". Run \`npm run photos\`.`)
  const { width, height } = photoMeta[name]
  return {
    // Middle size is a sensible fallback for browsers that ignore srcset.
    src: list[Math.floor((list.length - 1) / 2)].url,
    srcSet: list.map((v) => `${v.url} ${v.width}w`).join(', '),
    width,
    height,
  }
}

/** Unique photographers, for the credits dialog. */
export function getCredits() {
  const seen = new Map<string, { photographer: string; profileUrl: string; photos: string[] }>()
  for (const meta of Object.values(photoMeta)) {
    const entry = seen.get(meta.profileUrl) ?? { photographer: meta.photographer, profileUrl: meta.profileUrl, photos: [] }
    entry.photos.push(meta.sourceUrl)
    seen.set(meta.profileUrl, entry)
  }
  return [...seen.values()].sort((a, b) => a.photographer.localeCompare(b.photographer))
}
