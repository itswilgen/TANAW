import { cn } from '../../lib/cn'

/** Ridge-and-sun mark + name. The mark is the "view" in Tanaw. */
export function Wordmark({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5 font-display tracking-display', className)}>
      <svg viewBox="0 0 32 32" aria-hidden="true" className={cn('size-[1.15em] shrink-0', markClassName)}>
        <circle cx="20" cy="11.5" r="3.6" className="fill-crema" />
        <path
          d="M3.5 24.5 11 15.5l4.2 4.8 3.8-3.8 9.5 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>Tanaw</span>
    </span>
  )
}
