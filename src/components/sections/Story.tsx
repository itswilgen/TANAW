import { m, useInView } from 'motion/react'
import { useRef, type CSSProperties } from 'react'
import { story } from '../../data/site'
import { fadeUp, reveal, scaleIn, stagger } from '../../lib/motion'
import { Container } from '../ui/Container'
import { FilmReveal } from '../ui/FilmReveal'
import { Image } from '../ui/Image'
import { SectionHeading } from '../ui/SectionHeading'

// Float settings (see `float` in index.css): the small card drifts further, tilts, and runs out of phase.
const FLOAT_MAIN = { '--float-y': '-10px', '--float-duration': '9s' } as CSSProperties
const FLOAT_CARD = {
  '--float-y': '-16px',
  '--float-tilt': '-1.5deg',
  '--float-duration': '7s',
  '--float-delay': '-3s',
} as CSSProperties

export function Story() {
  const photosRef = useRef<HTMLDivElement>(null)
  const photosInView = useInView(photosRef, { margin: '100px' })

  return (
    <section id="story" aria-labelledby="story-title" className="py-24 lg:py-40">
      <Container className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        {/* Photo pair: the small cherry photo deliberately breaks out of the grid. */}
        {/* Reveal on the motion wrappers, float on the inner divs, so the two transforms don't clash. */}
        <m.div
          ref={photosRef}
          data-paused={photosInView ? undefined : ''}
          {...reveal}
          variants={stagger(0.15)}
          className="relative mr-6 sm:mr-12 lg:col-span-6 lg:mr-0"
        >
          <div style={FLOAT_MAIN} className="float">
            <FilmReveal className="aspect-4/5 overflow-hidden rounded-lg bg-foam">
              <Image
                name="story-sea-of-clouds"
                alt="Forested mountain ridges rising above a sea of clouds"
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="size-full object-cover object-[50%_80%]"
              />
            </FilmReveal>
          </div>
          <m.div variants={scaleIn} className="absolute -right-6 -bottom-10 w-[46%] sm:-right-12 lg:-right-16">
            <div
              style={FLOAT_CARD}
              className="float overflow-hidden rounded-md border-[6px] border-oat shadow-float"
            >
              <Image
                name="story-cherries"
                alt="Ripe red and unripe green coffee cherries on the branch"
                sizes="(min-width: 1024px) 20vw, 45vw"
                className="aspect-square size-full object-cover"
              />
            </div>
          </m.div>
        </m.div>

        <div className="lg:col-span-5 lg:col-start-8">
          <SectionHeading id="story-title" eyebrow={story.eyebrow} title={story.title} />
          <m.div {...reveal} variants={stagger(0.08, 0.15)} className="mt-8 max-w-[60ch] space-y-5 text-bean">
            {story.paragraphs.map((p) => (
              <m.p key={p.slice(0, 24)} variants={fadeUp}>
                {p}
              </m.p>
            ))}
          </m.div>

          <m.dl
            {...reveal}
            variants={stagger(0.08, 0.2)}
            className="mt-12 grid grid-cols-3 gap-6 border-t border-line pt-8"
          >
            {story.facts.map((fact) => (
              <m.div key={fact.label} variants={fadeUp} className="flex flex-col-reverse gap-1">
                <dt className="text-sm text-bean">{fact.label}</dt>
                <dd className="font-display text-xl tracking-display text-espresso sm:text-2xl">{fact.value}</dd>
              </m.div>
            ))}
          </m.dl>
        </div>
      </Container>
    </section>
  )
}
