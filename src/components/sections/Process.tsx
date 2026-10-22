import { m, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { processSteps } from '../../data/process'
import { useMotionAllowed } from '../../hooks/useMotionAllowed'
import { ease, fadeUp, reveal } from '../../lib/motion'
import { Container } from '../ui/Container'
import { FilmReveal } from '../ui/FilmReveal'
import { Image } from '../ui/Image'
import { SectionHeading } from '../ui/SectionHeading'

export function Process() {
  const listRef = useRef<HTMLOListElement>(null)
  // The rail fills as you read down the steps (fully drawn when motion is reduced).
  const allowed = useMotionAllowed()
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 55%'] })
  const rail = useTransform(() => (allowed.get() ? scrollYProgress.get() : 1))

  return (
    <section id="process" aria-labelledby="process-title" className="py-24 lg:py-40">
      <Container className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              id="process-title"
              eyebrow="From bean to cup"
              title="Four steps, and no shortcuts."
              intro="Good coffee is mostly patience. Here is where ours goes, from the farm to your table."
            />
          </div>
        </div>

        <ol ref={listRef} className="relative lg:col-span-7 lg:col-start-6">
          <span aria-hidden="true" className="absolute top-3 bottom-3 left-4.25 w-px bg-line" />
          <m.span
            aria-hidden="true"
            style={{ scaleY: rail }}
            className="absolute top-3 bottom-3 left-4.25 w-px origin-top bg-clay"
          />

          {processSteps.map((step, i) => (
            <li key={step.title} className="relative grid grid-cols-[2.25rem_1fr] gap-5 pb-16 last:pb-0 sm:gap-8">
              <m.span
                aria-hidden="true"
                {...reveal}
                className="relative mt-1 flex size-9 items-center justify-center rounded-full border border-line bg-oat"
              >
                <m.span
                  variants={{
                    hidden: { scale: 0, opacity: 0 },
                    show: { scale: 1, opacity: 1, transition: { duration: 0.4, ease, delay: 0.15 } },
                  }}
                  className="size-2.5 rounded-full bg-clay"
                />
              </m.span>

              <m.div {...reveal} variants={fadeUp} className="grid gap-6 sm:grid-cols-[1fr_14rem] sm:gap-8">
                <div>
                  <p className="tabular text-sm font-semibold text-clay-ink">
                    <span className="sr-only">Step </span>0{i + 1}
                  </p>
                  <h3 className="mt-2 text-2xl text-espresso">{step.title}</h3>
                  <p className="mt-3 max-w-[48ch] text-bean">{step.body}</p>
                  <p className="mt-4 text-sm font-medium text-espresso">{step.detail}</p>
                </div>
                <FilmReveal className="aspect-4/3 overflow-hidden rounded-md bg-foam sm:aspect-4/5">
                  <Image
                    name={step.photo.name}
                    alt={step.photo.alt}
                    sizes="(min-width: 640px) 224px, 85vw"
                    className="size-full object-cover"
                  />
                </FilmReveal>
              </m.div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
