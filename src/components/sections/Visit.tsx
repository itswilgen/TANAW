import { m } from 'motion/react'
import { ArrowUpRight, MessageCircle, Phone } from 'lucide-react'
import { hours, site } from '../../data/site'
import { cn } from '../../lib/cn'
import { useCafeStatus } from '../../hooks/useCafeStatus'
import { formatTime } from '../../lib/hours'
import { fadeUp, reveal, stagger } from '../../lib/motion'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

const { lat, lng } = site.geo
const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed`
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`

export function Visit() {
  const status = useCafeStatus()
  const today = status?.today
  const { street, locality, region, postalCode } = site.address

  return (
    <section id="visit" aria-labelledby="visit-title" className="border-t border-line bg-foam py-24 lg:py-40">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading
            id="visit-title"
            eyebrow="Visit us"
            title="Come up for a cup."
            intro="Walk-ins only, no reservations. Coming with eight or more? Send us a message first and we’ll save you the long table."
          />

          <m.div {...reveal} variants={stagger(0.08, 0.1)}>
            {/* Client-only: depends on the visitor's current time. */}
            <m.p variants={fadeUp} className="mt-10 flex min-h-6 items-center gap-2.5 text-sm font-medium" role="status">
              {status && (
                <>
                  <span aria-hidden="true" className={cn('size-2 rounded-full', status.isOpen ? 'bg-sage' : 'bg-bean/40')} />
                  {status.isOpen && today ? `Open now · until ${formatTime(today.close)}` : 'Closed right now'}
                </>
              )}
            </m.p>

            <m.table variants={fadeUp} className="mt-5 w-full max-w-md text-left">
              <caption className="sr-only">Opening hours</caption>
              <tbody>
                {hours.map((h) => {
                  const isToday = h === today
                  return (
                    <tr key={h.label} className="border-b border-line">
                      <th scope="row" className={cn('py-3.5 pr-4 font-normal', isToday ? 'text-espresso' : 'text-bean')}>
                        {h.label}
                        {isToday && (
                          <span className="ml-2 rounded-full bg-oat px-2 py-0.5 text-sm text-espresso">Today</span>
                        )}
                      </th>
                      <td
                        className={cn(
                          'tabular py-3.5 text-right whitespace-nowrap',
                          isToday ? 'font-semibold text-espresso' : 'text-bean',
                        )}
                      >
                        {formatTime(h.open)} – {formatTime(h.close)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </m.table>

            <m.address variants={fadeUp} className="mt-10 text-lg not-italic">
              <span className="block text-espresso">{street}</span>
              <span className="block text-bean">
                {locality}, {region} {postalCode}
              </span>
              <a
                href={`tel:${site.phone.replace(/\s/g, '')}`}
                className="tabular mt-4 block w-fit text-clay-ink underline-offset-4 hover:underline"
              >
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="block w-fit text-clay-ink underline-offset-4 hover:underline">
                {site.email}
              </a>
            </m.address>

            <m.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
              <Button
                href={site.messengerUrl}
                target="_blank"
                rel="noreferrer"
                icon={<MessageCircle className="size-4" strokeWidth={2} />}
              >
                Message us
              </Button>
              <Button
                href={`tel:${site.phone.replace(/\s/g, '')}`}
                variant="secondary"
                icon={<Phone className="size-4" strokeWidth={2} />}
              >
                Call
              </Button>
            </m.div>
          </m.div>
        </div>

        <m.div
          {...reveal}
          variants={fadeUp}
          className="flex flex-col lg:col-span-6 lg:col-start-7"
        >
          <div className="relative min-h-88 flex-1 overflow-hidden rounded-lg border border-line bg-oat">
            <iframe
              title={`Map showing ${site.name} in ${locality}`}
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full saturate-[0.7]"
            />
          </div>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="group mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-clay-ink"
          >
            Get directions in Google Maps
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </a>
        </m.div>
      </Container>
    </section>
  )
}
