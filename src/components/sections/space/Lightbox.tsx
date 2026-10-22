import { AnimatePresence, m } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { GalleryPhoto } from '../../../data/gallery'
import { photoMeta } from '../../../data/photos.generated'
import { useLockBody } from '../../../hooks/useLockBody'
import { ease } from '../../../lib/motion'
import { Image } from '../../ui/Image'

interface Props {
  photos: GalleryPhoto[]
  index: number | null
  onClose: () => void
  onChange: (index: number) => void
}

const controlClass =
  'inline-flex size-12 items-center justify-center rounded-full border border-line-dark text-oat transition-colors hover:bg-oat/10'

/** Full-screen photo viewer. Esc closes, ←/→ navigate, Tab stays inside. */
export function Lightbox({ photos, index, onClose, onChange }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [direction, setDirection] = useState(1)
  const open = index !== null

  useLockBody(open)

  useEffect(() => {
    if (open) closeRef.current?.focus()
  }, [open])

  const go = (step: 1 | -1) => {
    if (index === null) return
    setDirection(step)
    onChange((index + step + photos.length) % photos.length)
  }

  // Keys are handled on window so they work wherever focus sits while the viewer is open.
  useEffect(() => {
    if (index === null) return
    const step = (dir: 1 | -1) => {
      setDirection(dir)
      onChange((index + dir + photos.length) % photos.length)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
      else if (e.key === 'Tab') {
        // Focus trap over the controls that are actually visible at this breakpoint.
        const focusable = [...(dialogRef.current?.querySelectorAll<HTMLElement>('button, a[href]') ?? [])].filter(
          (el) => el.getClientRects().length > 0,
        )
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        const inside = dialogRef.current?.contains(document.activeElement)
        if (e.shiftKey && (document.activeElement === first || !inside)) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && (document.activeElement === last || !inside)) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [index, photos.length, onChange, onClose])

  const photo = index === null ? null : photos[index]
  const credit = photo ? photoMeta[photo.name] : null

  return (
    <AnimatePresence>
      {photo && credit && index !== null && (
        <m.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Photos of the café"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          transition={{ duration: 0.25 }}
          className="dark-section fixed inset-0 z-50 flex flex-col bg-espresso/95 text-oat"
        >
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <p className="tabular text-sm text-oat/70" aria-live="polite">
              {String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
            </p>
            <button ref={closeRef} type="button" onClick={onClose} className={controlClass}>
              <X className="size-5" strokeWidth={1.75} aria-hidden="true" />
              <span className="sr-only">Close photo viewer</span>
            </button>
          </div>

          <div
            className="relative flex-1 overflow-hidden"
            onClick={(e) => e.target === e.currentTarget && onClose()}
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <m.div
                key={photo.name}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 48 }),
                  center: { opacity: 1, x: 0 },
                  exit: (d: number) => ({ opacity: 0, x: d * -48 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease }}
                className="pointer-events-none absolute inset-0 flex items-center justify-center px-5 sm:px-24"
              >
                <Image
                  name={photo.name}
                  alt={photo.alt}
                  sizes="100vw"
                  priority
                  className="pointer-events-auto h-auto max-h-full w-auto max-w-full rounded-md object-contain"
                />
              </m.div>
            </AnimatePresence>

            <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 justify-between px-6 sm:flex">
              <button type="button" onClick={() => go(-1)} className={`${controlClass} pointer-events-auto`}>
                <ChevronLeft className="size-5" strokeWidth={1.75} aria-hidden="true" />
                <span className="sr-only">Previous photo</span>
              </button>
              <button type="button" onClick={() => go(1)} className={`${controlClass} pointer-events-auto`}>
                <ChevronRight className="size-5" strokeWidth={1.75} aria-hidden="true" />
                <span className="sr-only">Next photo</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-6 px-5 py-5 sm:px-8">
            <div className="min-w-0">
              <p className="font-display text-lg text-oat">{photo.caption}</p>
              <p className="mt-0.5 text-sm text-oat/60">
                Photo:{' '}
                <a href={credit.sourceUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-oat">
                  {credit.photographer} on Unsplash
                </a>
              </p>
            </div>
            <div className="flex shrink-0 gap-2 sm:hidden">
              <button type="button" onClick={() => go(-1)} className={controlClass}>
                <ChevronLeft className="size-5" strokeWidth={1.75} aria-hidden="true" />
                <span className="sr-only">Previous photo</span>
              </button>
              <button type="button" onClick={() => go(1)} className={controlClass}>
                <ChevronRight className="size-5" strokeWidth={1.75} aria-hidden="true" />
                <span className="sr-only">Next photo</span>
              </button>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
