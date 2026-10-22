import { m } from 'motion/react'
import { Expand } from 'lucide-react'
import { useRef, useState } from 'react'
import { gallery } from '../../../data/gallery'
import { cn } from '../../../lib/cn'
import { fadeUp, reveal, stagger } from '../../../lib/motion'
import { Container } from '../../ui/Container'
import { FilmReveal } from '../../ui/FilmReveal'
import { Image } from '../../ui/Image'
import { SectionHeading } from '../../ui/SectionHeading'
import { Lightbox } from './Lightbox'

/** Grid placement per tile, in gallery order: one feature photo, then a calmer rhythm. */
const layout = [
  { tile: 'col-span-2 row-span-2 lg:col-span-7', sizes: '(min-width: 1024px) 55vw, 100vw' },
  { tile: 'lg:col-span-5', sizes: '(min-width: 1024px) 38vw, 50vw' },
  { tile: 'lg:col-span-5', sizes: '(min-width: 1024px) 38vw, 50vw' },
  { tile: 'lg:col-span-4', sizes: '(min-width: 1024px) 30vw, 50vw' },
  { tile: 'lg:col-span-4', sizes: '(min-width: 1024px) 30vw, 50vw' },
  { tile: 'col-span-2 lg:col-span-4', sizes: '(min-width: 1024px) 30vw, 100vw' },
]

export function Space() {
  const [open, setOpen] = useState<number | null>(null)
  const tiles = useRef<(HTMLButtonElement | null)[]>([])

  const close = () => {
    const last = open
    setOpen(null)
    // Return focus to the photo that was opened.
    if (last !== null) requestAnimationFrame(() => tiles.current[last]?.focus())
  }

  return (
    <section id="space" aria-labelledby="space-title" className="pb-24 lg:pb-40">
      <Container>
        <SectionHeading
          id="space-title"
          eyebrow="The space"
          title="Stay as long as the coffee lasts."
          intro="Warm light, good chairs and the espresso bar at the centre of it all. Laptops are welcome on weekdays; the window seats go first."
        />

        <m.ul
          {...reveal}
          variants={stagger(0.07)}
          className="mt-14 grid auto-rows-42 grid-cols-2 gap-3 sm:auto-rows-60 lg:mt-20 lg:auto-rows-[clamp(14rem,20vw,19rem)] lg:grid-cols-12 lg:gap-4"
        >
          {gallery.map((photo, i) => (
            <m.li key={photo.name} variants={fadeUp} className={layout[i]?.tile}>
              <button
                ref={(el) => {
                  tiles.current[i] = el
                }}
                type="button"
                onClick={() => setOpen(i)}
                aria-haspopup="dialog"
                className="group relative block size-full overflow-hidden rounded-md bg-foam"
              >
                <FilmReveal className="size-full">
                  <Image
                    name={photo.name}
                    alt={photo.alt}
                    sizes={layout[i]?.sizes ?? '50vw'}
                    className="size-full object-cover transition-transform duration-400 ease-out-soft group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </FilmReveal>
                <span
                  className={cn(
                    'absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-sm bg-foam/95 px-3 py-2 text-left text-sm text-espresso',
                    'translate-y-2 opacity-0 transition duration-300 ease-out-soft',
                    'group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100',
                  )}
                >
                  <span className="truncate">{photo.caption}</span>
                  <Expand aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.75} />
                </span>
                <span className="sr-only">Open larger: {photo.caption}</span>
              </button>
            </m.li>
          ))}
        </m.ul>
      </Container>

      <Lightbox photos={gallery} index={open} onClose={close} onChange={setOpen} />
    </section>
  )
}
