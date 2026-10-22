import { AnimatePresence, m, useInView, useReducedMotion, type Variants } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { ease } from '../../lib/motion'

const HOLD_MS = 2800

const word: Variants = {
  show: { transition: { staggerChildren: 0.035, delayChildren: 0.14 } },
  exit: { transition: { staggerChildren: 0.02 } },
}

// Each letter flips up into place around its horizontal axis, and flips away the same way.
const letter: Variants = {
  hidden: { opacity: 0, y: '0.4em', rotateX: -90 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.55, ease } },
  exit: { opacity: 0, y: '-0.3em', rotateX: 90, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
}

/**
 * Cycles through `words` in place while on screen. The first word is the server-rendered one;
 * reduced motion keeps it static. Give the parent heading an `aria-label`: the visible word changes.
 */
export function RotatingWord({ words }: { words: readonly string[] }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref)
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduce || !inView) return
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % words.length), HOLD_MS)
    return () => window.clearTimeout(id)
  }, [index, inView, reduce, words.length])

  const current = words[index]

  return (
    <span ref={ref} className="inline-grid whitespace-nowrap">
      {/* Invisible copies reserve the widest word so nothing reflows. Pseudo-element text stays out of the DOM text. */}
      {words.map((w) => (
        <span
          key={w}
          data-text={w}
          aria-hidden="true"
          className="invisible col-start-1 row-start-1 before:content-[attr(data-text)]"
        />
      ))}
      <AnimatePresence initial={false}>
        <m.span
          key={current}
          variants={word}
          initial="hidden"
          animate="show"
          exit="exit"
          className="col-start-1 row-start-1 perspective-distant"
        >
          {[...current].map((ch, i) =>
            ch === ' ' ? (
              ' '
            ) : (
              <m.span key={i} variants={letter} className="inline-block">
                {ch}
              </m.span>
            ),
          )}
        </m.span>
      </AnimatePresence>
    </span>
  )
}
