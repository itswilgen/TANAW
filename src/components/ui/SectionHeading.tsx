import { m } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { fadeUp, maskRise, reveal, stagger } from '../../lib/motion'

interface Props {
  id: string
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  tone?: 'light' | 'dark'
  className?: string
}

/** Eyebrow + h2 + optional intro. `id` is used for the section's aria-labelledby. */
export function SectionHeading({ id, eyebrow, title, intro, tone = 'light', className }: Props) {
  const dark = tone === 'dark'
  return (
    <m.header {...reveal} variants={stagger(0.08)} className={cn('max-w-2xl', className)}>
      <m.p variants={fadeUp} className={cn('eyebrow', dark ? 'text-crema' : 'text-clay-ink')}>
        {eyebrow}
      </m.p>
      {/* Mask for the rise; the padding keeps descenders from being clipped. */}
      <div className="mt-4 -mb-[0.15em] overflow-hidden pb-[0.15em]">
        <m.h2 id={id} variants={maskRise} className={cn('text-3xl', dark ? 'text-oat' : 'text-espresso')}>
          {title}
        </m.h2>
      </div>
      {intro && (
        <m.p
          variants={fadeUp}
          className={cn('mt-5 max-w-[60ch] text-lg', dark ? 'text-oat/70' : 'text-bean')}
        >
          {intro}
        </m.p>
      )}
    </m.header>
  )
}
