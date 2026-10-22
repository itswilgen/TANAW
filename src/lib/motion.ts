import type { Transition, Variants } from 'motion/react'
import type { CSSProperties } from 'react'

/** Shared timing so every section moves the same way. */
export const ease = [0.22, 1, 0.36, 1] as const

/** Snappy spring for UI: buttons, tabs, the cursor preview. */
export const spring: Transition = { type: 'spring', stiffness: 380, damping: 30 }

/** Heavier spring for large surfaces (panels, lightbox). */
export const softSpring: Transition = { type: 'spring', stiffness: 120, damping: 20 }

/** Stagger between siblings: 60ms, the same step as the CSS page-load sequence. */
const STEP = 0.06

/** Position in the CSS page-load sequence (see `load-in` in index.css): delay = n × 60ms. */
export const loadStep = (n: number) => ({ '--step': n }) as CSSProperties

/** Rise + fade, used for scroll reveals. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 1.06 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.55, ease } },
}

export const stagger = (step = STEP, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
})

/** Spread onto a motion element to reveal it once when it scrolls into view. */
export const reveal = {
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, margin: '0px 0px -12% 0px' },
} as const

/** Slow in, slow out: film-style wipes and title rises. */
export const cinematicEase = [0.76, 0, 0.24, 1] as const

/**
 * A photo frame wiping open from the bottom (see FilmReveal). `custom` is the reduced-motion
 * flag: then it appears at once. The clip is dropped afterwards so floats and shadows aren't cut.
 */
export const curtain: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  show: (reduce: boolean | null) => ({
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: reduce ? { duration: 0 } : { duration: 1.1, ease: cinematicEase },
    transitionEnd: { clipPath: 'none' },
  }),
}

/** The photo inside a curtain settles from a slight zoom, like a lens finding focus. */
export const lens: Variants = {
  hidden: { scale: 1.2 },
  show: { scale: 1, transition: { duration: 1.6, ease } },
}

/** A heading rising from behind a mask (the parent clips it). */
export const maskRise: Variants = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 0.9, ease: cinematicEase } },
}

/** Button micro-interactions. */
export const press = {
  whileHover: { y: -2 },
  whileTap: { scale: 0.97 },
  transition: spring,
} as const
