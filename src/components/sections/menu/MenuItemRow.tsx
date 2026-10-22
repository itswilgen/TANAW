import type { MenuItem } from '../../../types'
import { formatPrice } from '../../../lib/format'
import { Image } from '../../ui/Image'
import { Tag } from '../../ui/Tag'

interface Props {
  item: MenuItem
  onHover?: (hovering: boolean) => void
}

/** One line of the menu board: name ········ price, with the photo inline on touch screens. */
export function MenuItemRow({ item, onHover }: Props) {
  return (
    <li
      onPointerEnter={onHover && (() => onHover(true))}
      onPointerLeave={onHover && (() => onHover(false))}
      className="group flex gap-4 border-b border-line-dark py-6 sm:gap-5"
    >
      {/* Desktop shows the photo as a cursor preview instead. */}
      <Image
        name={item.image}
        alt={item.alt}
        sizes="88px"
        className="size-20 shrink-0 rounded-md bg-espresso object-cover sm:size-22 can-hover:lg:hidden"
      />
      <div className="min-w-0 flex-1">
        {/* items-end: when a long name wraps, leader and price sit on its last line. */}
        <div className="flex items-end text-oat">
          <h3 className="font-display text-xl tracking-display transition-colors duration-200 group-hover:text-crema">
            {item.name}
          </h3>
          <span aria-hidden="true" className="leader" />
          <p className="tabular shrink-0 font-display text-xl">
            <span className="sr-only">Price: </span>
            {formatPrice(item.price)}
          </p>
        </div>
        <p className="mt-1.5 max-w-[52ch] text-sm text-oat/70">{item.description}</p>
        {item.tags && (
          <ul aria-label="Tags" className="mt-3 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <li key={tag}>
                <Tag name={tag} tone="dark" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  )
}
