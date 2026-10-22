import { ArrowUp } from 'lucide-react'
import { useRef } from 'react'
import { hours, nav, site, socials } from '../../../data/site'
import { formatTime } from '../../../lib/hours'
import { Container } from '../../ui/Container'
import { SocialIcon } from '../../ui/SocialIcon'
import { Wordmark } from '../../ui/Wordmark'
import { CreditsDialog } from './CreditsDialog'

const year = new Date().getFullYear()
const linkClass = 'text-oat/75 transition-colors hover:text-oat'

export function Footer() {
  const creditsRef = useRef<HTMLDialogElement>(null)

  return (
    <footer className="dark-section bg-roast text-oat">
      <Container className="pt-20 pb-10 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Wordmark className="text-display text-oat" />
            <p className="mt-6 max-w-[36ch] text-oat/70">
              {site.meaning}. Philippine coffee, poured slowly, in {site.address.locality}.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-7">
            <h2 className="eyebrow font-sans text-crema">Explore</h2>
            <ul className="mt-5 space-y-3">
              {nav.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="eyebrow font-sans text-crema">Hours</h2>
            <dl className="mt-5 space-y-3 text-oat/75">
              {hours.map((h) => (
                <div key={h.label}>
                  <dt className="text-sm text-oat/55">{h.label}</dt>
                  <dd className="tabular">
                    {formatTime(h.open)} – {formatTime(h.close)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-2">
            <h2 className="eyebrow font-sans text-crema">Follow</h2>
            <ul className="mt-5 space-y-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className={`${linkClass} inline-flex items-center gap-2.5`}>
                    <SocialIcon name={s.label} className="size-5" />
                    <span>
                      <span className="sr-only">{s.label}: </span>
                      {s.handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-line-dark pt-8 text-sm text-oat/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}
          </p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => creditsRef.current?.showModal()}
              className="underline-offset-4 transition-colors hover:text-oat hover:underline"
            >
              Photo credits
            </button>
            <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-oat">
              Back to top
              <ArrowUp className="size-4" strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>
        </div>
      </Container>
      <CreditsDialog ref={creditsRef} />
    </footer>
  )
}
