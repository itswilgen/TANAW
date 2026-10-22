import type { Tag as TagName } from '../../types'
import { cn } from '../../lib/cn'

const dot: Record<TagName, string> = {
  Signature: 'bg-crema',
  New: 'bg-sage',
  'Vegan option': 'bg-sage',
  Local: 'bg-clay',
  Iced: 'bg-current opacity-40',
  Hot: 'bg-current opacity-40',
}

/** Small label with a colour dot. Text stays high-contrast; the dot carries the accent. */
export function Tag({ name, tone = 'light' }: { name: TagName; tone?: 'light' | 'dark' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 text-sm leading-6 font-medium',
        tone === 'dark' ? 'border-line-dark text-oat/80' : 'border-line text-bean',
      )}
    >
      <span aria-hidden="true" className={cn('size-1.5 rounded-full', dot[name])} />
      {name}
    </span>
  )
}
