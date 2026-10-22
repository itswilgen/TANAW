import { useMotionValue, useReducedMotion } from 'motion/react'
import { useEffect } from 'react'

/**
 * 1 normally, 0 when the visitor prefers reduced motion. A MotionValue (not a boolean)
 * so scroll-linked styles can multiply by it without changing the server-rendered markup.
 */
export function useMotionAllowed() {
  const reduce = useReducedMotion()
  const allowed = useMotionValue(1)
  useEffect(() => allowed.set(reduce ? 0 : 1), [reduce, allowed])
  return allowed
}
