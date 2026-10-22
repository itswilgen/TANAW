import { m, useScroll, useTransform } from 'motion/react'
import { ArrowDown, MapPin } from 'lucide-react'
import { useRef } from 'react'
import { hero } from '../../data/site'
import { useCafeStatus } from '../../hooks/useCafeStatus'
import { useMotionAllowed } from '../../hooks/useMotionAllowed'
import { formatTime } from '../../lib/hours'
import { getImage } from '../../lib/images'
import { loadStep } from '../../lib/motion'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { RotatingWord } from '../ui/RotatingWord'
import { BaristaScene } from './BaristaScene'

// Load-in order (the nav is step 0): eyebrow → words → intro → CTAs → photo.
const WORDS_START = 2
const INTRO_STEP = WORDS_START + hero.headline.length
const CTA_STEP = INTRO_STEP + 1
const IMAGE_STEP = CTA_STEP + 2

// The last word cycles, so the heading's accessible name is pinned to the original line.
const TITLE = hero.headline.map((w) => w.text).join(' ')

// Art direction: a portrait crop for phones, the full frame elsewhere.
// Media queries must match HERO_SOURCES in vite.config.ts (the preloads).
const landscape = getImage(hero.image.landscape)
const portrait = getImage(hero.image.portrait)

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const status = useCafeStatus()

  // Scrolling away plays like a camera pull-back: the photo drifts slower than the page and
  // pushes in slightly while the copy lifts and fades. All of it is off under reduced motion.
  const allowed = useMotionAllowed()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(() => `${scrollYProgress.get() * 7 * allowed.get()}%`)
  const scale = useTransform(() => 1 + scrollYProgress.get() * 0.08 * allowed.get())
  const contentY = useTransform(() => scrollYProgress.get() * -120 * allowed.get())
  // The fade waits until a third of the hero has scrolled by, so the barista (lower down on phones) is seen at full strength.
  const contentOpacity = useTransform(
    () => 1 - Math.min(1, Math.max(0, (scrollYProgress.get() - 0.3) / 0.5)) * allowed.get(),
  )

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="dark-section relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-roast pt-32 text-oat lg:min-h-[max(100svh,46rem)]"
    >
      {/* Backdrop: photo → load-in cover → scrim. All decorative layers sit behind the text. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <m.div style={{ y, scale }} className="absolute inset-x-0 top-[-8%] h-[116%] will-change-transform">
          <picture>
            <source
              media="(orientation: portrait)"
              srcSet={portrait.srcSet}
              sizes="100vw"
              width={portrait.width}
              height={portrait.height}
            />
            <img
              src={landscape.src}
              srcSet={landscape.srcSet}
              sizes="100vw"
              width={landscape.width}
              height={landscape.height}
              alt=""
              fetchPriority="high"
              decoding="sync"
              className="size-full object-cover object-[68%_50%] portrait:object-center"
            />
          </picture>
        </m.div>
        {/* Fading a roast-coloured cover reads as the photo fading in, but lets it paint at once. */}
        <div style={loadStep(IMAGE_STEP)} className="absolute inset-0 load-cover bg-roast" />
        {/* Scrim: dark where the type sits (bottom up to tablets, left from 1024px). */}
        <div className="absolute inset-0 bg-linear-to-t from-roast from-40% via-roast/85 via-75% to-roast/30 lg:bg-linear-to-r lg:from-roast lg:from-10% lg:via-roast/75 lg:via-45% lg:to-roast/10" />
        {/* Top band keeps the nav legible; bottom band grounds the meta strip on the right. */}
        <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-roast/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 hidden h-56 bg-linear-to-t from-roast/85 to-transparent lg:block" />
      </div>

      <m.div style={{ y: contentY, opacity: contentOpacity }}>
        <Container className="pb-12 sm:pb-16 lg:pb-20">
          <div className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="max-w-3xl lg:col-span-7">
              <p style={loadStep(1)} className="eyebrow load-in text-crema">
                {hero.eyebrow}
              </p>

              {/* Widths chosen so the title wraps the same in Fraunces and its fallback (no jump on font swap). */}
              <h1 id="hero-title" aria-label={TITLE} className="mt-6 max-w-[11ch] text-display text-oat md:max-w-[6.92em]">
                {hero.headline.map((word, i) => (
                  <span key={word.text}>
                    <span
                      style={loadStep(WORDS_START + i)}
                      className={word.em ? 'inline-block load-in text-crema italic' : 'inline-block load-in'}
                    >
                      {word.then ? <RotatingWord words={[word.text, ...word.then]} /> : word.text}
                    </span>
                    {i < hero.headline.length - 1 && ' '}
                  </span>
                ))}
              </h1>

              <p style={loadStep(INTRO_STEP)} className="mt-8 max-w-[52ch] load-in text-lg text-oat/80">
                {hero.intro}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <div style={loadStep(CTA_STEP)} className="load-in">
                  <Button href="#menu" icon={<ArrowDown className="size-4" strokeWidth={2} />}>
                    See the menu
                  </Button>
                </div>
                <div style={loadStep(CTA_STEP + 1)} className="load-in">
                  <Button href="#visit" variant="outline-light" icon={<MapPin className="size-4" strokeWidth={2} />}>
                    Find us
                  </Button>
                </div>
              </div>
            </div>

            {/* The animated barista, last in the load-in sequence: under the buttons on phones and
                tablets (offset right), in the right column from 1024px. */}
            <div
              style={loadStep(IMAGE_STEP)}
              className="mt-14 ml-auto w-[72%] max-w-xs load-in lg:col-span-4 lg:col-start-9 lg:mt-0 lg:w-full lg:max-w-none"
            >
              <BaristaScene />
            </div>
          </div>

          {/* Meta strip: live status (client-only, depends on the visitor's time) + photo caption. */}
          <div
            style={loadStep(CTA_STEP + 1)}
            className="mt-14 flex load-in flex-col gap-2 border-t border-line-dark pt-5 text-sm text-oat/70 sm:flex-row sm:items-center sm:justify-between lg:mt-20"
          >
            <p className="flex min-h-6 items-center gap-2.5">
              {status && (
                <>
                  <span
                    aria-hidden="true"
                    className={status.isOpen ? 'size-2 rounded-full bg-sage' : 'size-2 rounded-full bg-oat/35'}
                  />
                  <span className="tabular">
                    {status.isOpen && status.today
                      ? `Open now · until ${formatTime(status.today.close)}`
                      : status.today
                        ? `Closed now · today ${formatTime(status.today.open)} – ${formatTime(status.today.close)}`
                        : 'Closed today'}
                  </span>
                </>
              )}
            </p>
            <p>{hero.caption}</p>
          </div>
        </Container>
      </m.div>
    </section>
  )
}
