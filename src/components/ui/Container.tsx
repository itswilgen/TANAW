import type { ComponentProps } from 'react'
import { cn } from '../../lib/cn'

/** Page gutter + max width. Every section aligns to this. */
export function Container({ className, ...rest }: ComponentProps<'div'>) {
  return <div className={cn('mx-auto w-full max-w-360 px-5 sm:px-8 lg:px-12', className)} {...rest} />
}
