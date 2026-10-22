import { m, useMotionValue, useReducedMotion, useSpring, useTransform, useVelocity } from 'motion/react'
import { useEffect } from 'react'
import type { MenuItem } from '../../../types'
import { spring } from '../../../lib/motion'
import { Image } from '../../ui/Image'

interface Props {
  items: MenuItem[]
  /** Index of the hovered row in `items`, or null when nothing is hovered. */
  active: number | null
}

const follow = { stiffness: 300, damping: 30, mass: 0.6 }

/**
 * Floating photo that trails the cursor over the menu board (desktop pointers only).
 * All photos of the current category are stacked and cross-faded, so moving between
 * rows never flashes an empty frame. Decorative: each row already has its own <img> alt.
 */
export function CursorPreview({ items, active }: Props) {
  const reduce = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const x = useSpring(pointerX, follow)
  const y = useSpring(pointerY, follow)

  // Lean into the direction of travel, then settle.
  const velocity = useVelocity(x)
  const tilt = useSpring(useTransform(velocity, [-1600, 1600], [-9, 9], { clamp: true }), spring)

  // Sit to the right of the cursor, or flip to the left near the window's right edge.
  const side = useTransform(pointerX, (v): number => (v > window.innerWidth - 320 ? -272 : 32))
  const offset = useSpring(side, spring)

  const visible = active !== null

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointerX.set(e.clientX)
      pointerY.set(e.clientY)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [pointerX, pointerY])

  // Appear exactly at the cursor instead of flying in from the last position.
  useEffect(() => {
    if (!visible) return
    x.jump(pointerX.get())
    y.jump(pointerY.get())
  }, [visible, x, y, pointerX, pointerY])

  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-30"
      style={reduce ? { x: pointerX, y: pointerY } : { x, y, rotate: tilt }}
    >
      {/* Always mounted (hidden) so the category's photos are already decoded on first hover. */}
      <m.div
        initial={false}
        animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: reduce ? 1 : 0.85 }}
        transition={visible ? spring : { duration: 0.15 }}
        style={{ x: reduce ? side : offset }}
        className="relative aspect-4/5 w-60 -translate-y-1/2 overflow-hidden rounded-md bg-espresso shadow-float"
      >
        {items.map((item, i) => (
          <Image
            key={item.name}
            name={item.image}
            alt=""
            sizes="240px"
            loading="eager"
            className="absolute inset-0 size-full object-cover transition-opacity duration-200"
            style={{ opacity: i === active ? 1 : 0 }}
          />
        ))}
      </m.div>
    </m.div>
  )
}
