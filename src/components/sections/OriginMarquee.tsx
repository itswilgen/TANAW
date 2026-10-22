import { origins } from '../../data/site'
import { cn } from '../../lib/cn'

function OriginList({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className={cn(
        'flex shrink-0 items-center motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-3',
        hidden && 'motion-reduce:hidden',
      )}
    >
      {origins.map((o) => (
        <li key={o.name} className="flex items-center">
          <span className="font-display text-xl tracking-display whitespace-nowrap text-oat sm:text-2xl">{o.name}</span>
          <span className="ml-3 text-sm whitespace-nowrap text-oat/60">{o.detail}</span>
          {/* The looping ribbon needs a separator after every item; the static list doesn't. */}
          <span
            aria-hidden="true"
            className="mx-8 size-1.5 rounded-full bg-crema sm:mx-12 motion-reduce:[li:last-child>&]:hidden"
          />
        </li>
      ))}
    </ul>
  )
}

/**
 * A slow ribbon of bean origins. Pauses on hover. With reduced motion it becomes a
 * static, wrapping list (pure CSS, so the prerendered markup is the same for everyone).
 */
export function OriginMarquee() {
  return (
    <section aria-label="Our four origins" className="dark-section overflow-hidden border-y border-line-dark bg-roast py-6">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none motion-reduce:justify-center motion-reduce:px-5">
        <OriginList />
        <OriginList hidden />
      </div>
    </section>
  )
}
