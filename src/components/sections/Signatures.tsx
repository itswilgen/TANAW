import { m } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { signatures } from '../../data/signatures'
import { formatPrice } from '../../lib/format'
import { fadeUp, reveal } from '../../lib/motion'
import { Container } from '../ui/Container'
import { FilmReveal } from '../ui/FilmReveal'
import { Image } from '../ui/Image'
import { SectionHeading } from '../ui/SectionHeading'

export function Signatures() {
  return (
    <section id="signatures" aria-labelledby="signatures-title" className="bg-foam py-24 lg:py-40">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="signatures-title"
            eyebrow="Signatures"
            title="Four cups we’d order first."
            intro="Each one is built around a single origin, so you can taste the difference a mountain makes."
          />
          <a
            href="#menu"
            className="group inline-flex shrink-0 items-center gap-2 font-semibold text-clay-ink hover:text-espresso"
          >
            See the full menu
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
              strokeWidth={2}
            />
          </a>
        </div>

        {/* Two staggered columns: every second card sits lower, like a magazine spread. */}
        <ul className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 sm:pb-28 lg:mt-20 lg:gap-x-16">
          {signatures.map((drink, i) => (
            <li key={drink.name} className={i % 2 === 1 ? 'sm:translate-y-28' : undefined}>
              <m.article {...reveal} variants={fadeUp} className="group">
                <FilmReveal className="aspect-4/5 overflow-hidden rounded-lg bg-oat">
                  <Image
                    name={drink.photo.name}
                    alt={drink.photo.alt}
                    sizes="(min-width: 640px) 45vw, 92vw"
                    className="size-full object-cover transition-transform duration-400 ease-out-soft group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </FilmReveal>
                <div className="mt-6 flex items-baseline gap-4">
                  <span className="tabular text-sm font-semibold text-clay-ink">0{i + 1}</span>
                  <span className="text-sm text-bean">{drink.origin}</span>
                </div>
                <div className="mt-2 flex items-baseline justify-between gap-6">
                  <h3 className="text-2xl text-espresso">{drink.name}</h3>
                  <p className="tabular font-display text-xl text-espresso">
                    <span className="sr-only">Price: </span>
                    {formatPrice(drink.price)}
                  </p>
                </div>
                <p className="mt-3 max-w-[48ch] text-bean">{drink.description}</p>
                <ul aria-label="Tasting notes" className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-sm text-espresso/80">
                  {drink.notes.map((note, n) => (
                    <li key={note} className="flex items-center gap-3">
                      {n > 0 && <span aria-hidden="true" className="size-1 rounded-full bg-espresso/30" />}
                      {note}
                    </li>
                  ))}
                </ul>
              </m.article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
