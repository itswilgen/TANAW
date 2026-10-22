import { m } from 'motion/react'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { press } from '../../lib/motion'

type Variant = 'primary' | 'secondary' | 'outline-light'
type Size = 'md' | 'sm'

const variants: Record<Variant, string> = {
  primary: 'bg-clay text-foam hover:bg-clay-ink',
  secondary: 'border border-espresso/20 text-espresso hover:border-espresso/45 hover:bg-foam',
  'outline-light': 'border border-oat/30 text-oat hover:border-oat/60 hover:bg-oat/10',
}

const sizes: Record<Size, string> = {
  md: 'h-12 px-6 text-base',
  sm: 'h-10 px-4 text-sm',
}

interface Props extends Omit<ComponentProps<typeof m.a>, 'children'> {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  children: ReactNode
}

/** Link styled as a button. Every CTA on this site navigates, so it is always an <a>. */
export function Button({ variant = 'primary', size = 'md', icon, className, children, ...rest }: Props) {
  return (
    <m.a
      {...press}
      className={cn(
        'inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap',
        'transition-colors duration-200 select-none',
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
      {icon && <span aria-hidden="true" className="-mr-1 inline-flex">{icon}</span>}
    </m.a>
  )
}
