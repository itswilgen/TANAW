import { AnimatePresence, m, useScroll, useTransform } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { nav } from '../../data/site'
import { useLockBody } from '../../hooks/useLockBody'
import { cn } from '../../lib/cn'
import { fadeUp, loadStep, softSpring, stagger } from '../../lib/motion'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { Wordmark } from '../ui/Wordmark'

const subscribeScroll = (onChange: () => void) => {
  window.addEventListener('scroll', onChange, { passive: true })
  return () => window.removeEventListener('scroll', onChange)
}

export function Nav() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  // Transparent over the hero; oat surface + hairline + soft shadow once the page moves.
  const { scrollY } = useScroll()
  const surface = useTransform(scrollY, [0, 96], [0, 1])

  // Light text while the bar floats over the dark hero photo; dark once the oat surface is
  // mostly in (or the oat mobile panel is open). Server snapshot is `true`: the prerendered page is at the top.
  const atTop = useSyncExternalStore(subscribeScroll, () => window.scrollY < 48, () => true)
  const light = atTop && !open

  useLockBody(open)

  useEffect(() => {
    if (!open) return
    firstLinkRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      toggleRef.current?.focus()
    }
    const desktop = window.matchMedia('(min-width: 1024px)')
    const onResize = () => desktop.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onResize)
    }
  }, [open])

  return (
    <header style={loadStep(0)} className="fixed inset-x-0 top-0 z-40 load-in">
      <m.div
        aria-hidden="true"
        style={{ opacity: open ? 1 : surface }}
        className="absolute inset-0 border-b border-line bg-oat shadow-nav"
      />

      <Container className="relative flex h-16 items-center justify-between gap-6 lg:h-20">
        <a
          href="#top"
          className={cn('text-xl transition-colors duration-300', light ? 'text-oat' : 'text-espresso')}
          aria-label="Tanaw Coffee — back to top"
        >
          <Wordmark />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {nav.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    'relative py-2 text-sm font-medium transition-colors duration-300',
                    'after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out-soft hover:after:scale-x-100',
                    light ? 'text-oat/80 after:bg-crema hover:text-oat' : 'text-espresso/75 after:bg-clay hover:text-espresso',
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Wrapper owns visibility: Button's own inline-flex would override `hidden`. */}
          <div className="hidden sm:block">
            <Button href="#visit" size="sm">
              Find us
            </Button>
          </div>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={cn(
              '-mr-2 inline-flex size-11 items-center justify-center rounded-full transition-colors duration-300 lg:hidden',
              light ? 'text-oat hover:bg-oat/10' : 'text-espresso hover:bg-espresso/5',
            )}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <AnimatePresence initial={false} mode="wait">
              <m.span
                key={open ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.15 }}
                className="inline-flex"
              >
                {open ? <X className="size-6" strokeWidth={1.75} /> : <Menu className="size-6" strokeWidth={1.75} />}
              </m.span>
            </AnimatePresence>
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <>
            <m.div
              key="backdrop"
              aria-hidden="true"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 top-16 bottom-0 bg-espresso/25 lg:hidden"
            />
            <m.nav
              key="panel"
              id="mobile-menu"
              aria-label="Main"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
              transition={softSpring}
              className="absolute inset-x-0 top-full border-b border-line bg-oat lg:hidden"
            >
              <Container className="pt-4 pb-8">
                <m.ul variants={stagger(0.05, 0.05)} initial="hidden" animate="show">
                  {nav.map((link, i) => (
                    <m.li key={link.href} variants={fadeUp} className="border-b border-line">
                      <a
                        ref={i === 0 ? firstLinkRef : undefined}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between py-4 font-display text-2xl tracking-display text-espresso"
                      >
                        {link.label}
                        <span aria-hidden="true" className="tabular text-sm text-bean">
                          0{i + 1}
                        </span>
                      </a>
                    </m.li>
                  ))}
                </m.ul>
                <Button href="#visit" onClick={() => setOpen(false)} className="mt-8 w-full">
                  Find us
                </Button>
              </Container>
            </m.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
