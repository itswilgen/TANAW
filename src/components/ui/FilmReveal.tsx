import { m, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { curtain, lens } from '../../lib/motion'

/**
 * Photo frame that wipes open while the photo settles from a slight zoom.
 * Driven by the parent's `hidden` → `show` variants (e.g. a `reveal` wrapper).
 */
export function FilmReveal({ className, children }: { className?: string; children: ReactNode }) {
  const reduce = useReducedMotion()
  return (
    <m.div variants={curtain} custom={reduce} className={className}>
      <m.div variants={lens} className="size-full">
        {children}
      </m.div>
    </m.div>
  )
}
