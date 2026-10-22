import { X } from 'lucide-react'
import type { Ref } from 'react'
import { getCredits } from '../../../lib/images'

const credits = getCredits()

/** Native <dialog>: focus trap, Esc and backdrop come for free. Opened with showModal(). */
export function CreditsDialog({ ref }: { ref: Ref<HTMLDialogElement> }) {
  return (
    <dialog
      ref={ref}
      aria-labelledby="credits-title"
      onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
      className="m-auto max-h-[85vh] w-[calc(100%-2rem)] max-w-lg rounded-lg bg-foam p-0 text-espresso backdrop:bg-espresso/60"
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-6">
          <h2 id="credits-title" className="text-2xl">
            Photo credits
          </h2>
          <form method="dialog">
            <button
              type="submit"
              className="-mt-1 -mr-2 inline-flex size-11 items-center justify-center rounded-full hover:bg-espresso/5"
            >
              <X className="size-5" strokeWidth={1.75} aria-hidden="true" />
              <span className="sr-only">Close credits</span>
            </button>
          </form>
        </div>
        <p className="mt-3 text-sm text-bean">
          Every photo is from{' '}
          <a href="https://unsplash.com" target="_blank" rel="noreferrer" className="text-clay-ink underline underline-offset-2">
            Unsplash
          </a>{' '}
          and used under the{' '}
          <a
            href="https://unsplash.com/license"
            target="_blank"
            rel="noreferrer"
            className="text-clay-ink underline underline-offset-2"
          >
            Unsplash License
          </a>
          . Thank you to these photographers:
        </p>
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {credits.map((c) => (
            <li key={c.profileUrl} className="flex items-baseline justify-between gap-4 py-2.5 text-sm">
              <a href={c.profileUrl} target="_blank" rel="noreferrer" className="text-espresso hover:text-clay-ink">
                {c.photographer}
              </a>
              <span className="tabular text-bean">
                {c.photos.length} {c.photos.length === 1 ? 'photo' : 'photos'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  )
}
