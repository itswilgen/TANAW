import { AnimatePresence, m, useInView } from 'motion/react'
import { useRef, useState, type KeyboardEvent } from 'react'
import { categories, menu } from '../../../data/menu'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { cn } from '../../../lib/cn'
import { ease, spring } from '../../../lib/motion'
import type { CategoryId } from '../../../types'
import { Container } from '../../ui/Container'
import { SectionHeading } from '../../ui/SectionHeading'
import { CursorPreview } from './CursorPreview'
import { MenuItemRow } from './MenuItemRow'

export function Menu() {
  const [active, setActive] = useState<CategoryId>(categories[0].id)
  const [hovered, setHovered] = useState<number | null>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  // Cursor preview only for real hover pointers on wide screens, once the board is near.
  const canPreview = useMediaQuery('(hover: hover) and (pointer: fine) and (min-width: 1024px)')
  const near = useInView(sectionRef, { once: true, margin: '400px 0px' })

  const category = categories.find((c) => c.id === active) ?? categories[0]
  const items = menu.filter((item) => item.category === active)

  const select = (id: CategoryId) => {
    setActive(id)
    setHovered(null)
  }

  // Roving focus for the tablist: arrows, Home and End move and select.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const index = categories.findIndex((c) => c.id === active)
    const last = categories.length - 1
    const next =
      e.key === 'ArrowRight' ? (index === last ? 0 : index + 1)
      : e.key === 'ArrowLeft' ? (index === 0 ? last : index - 1)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last
      : null
    if (next === null) return
    e.preventDefault()
    select(categories[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <section
      ref={sectionRef}
      id="menu"
      aria-labelledby="menu-title"
      className="dark-section bg-roast py-24 text-oat lg:py-40"
    >
      <Container>
        <SectionHeading
          id="menu-title"
          tone="dark"
          eyebrow="The menu"
          title="Written on the board, brewed to order."
          intro="Prices in pesos. Oat milk, decaf and an extra shot available on any coffee drink."
        />

        <div
          role="tablist"
          aria-label="Menu categories"
          onKeyDown={onKeyDown}
          className="-mx-5 mt-14 flex overflow-x-auto border-b border-line-dark px-5 scrollbar-none sm:mx-0 sm:px-0"
        >
          {categories.map((c, i) => {
            const selected = c.id === active
            return (
              <button
                key={c.id}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                type="button"
                role="tab"
                id={`tab-${c.id}`}
                aria-selected={selected}
                aria-controls={`panel-${c.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(c.id)}
                className={cn(
                  'relative shrink-0 px-3 py-4 text-sm font-medium sm:text-base whitespace-nowrap transition-colors duration-200 first:pl-0 sm:px-6 sm:first:pl-0',
                  selected ? 'text-oat' : 'text-oat/60 hover:text-oat',
                )}
              >
                {c.label}
                {selected && (
                  <m.span
                    layoutId="menu-tab-underline"
                    transition={spring}
                    className={cn(
                      'absolute right-3 -bottom-px h-0.5 rounded-full bg-crema sm:right-6',
                      i === 0 ? 'left-0' : 'left-3 sm:left-6',
                    )}
                  />
                )}
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={active}
            role="tabpanel"
            id={`panel-${active}`}
            aria-labelledby={`tab-${active}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease } }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            <p className="mt-8 max-w-[60ch] font-display text-lg text-oat/70 italic">{category.note}</p>
            <ul className="mt-6 grid gap-x-20 lg:grid-cols-2">
              {items.map((item, i) => (
                <MenuItemRow
                  key={item.name}
                  item={item}
                  onHover={canPreview ? (on) => setHovered(on ? i : null) : undefined}
                />
              ))}
            </ul>
          </m.div>
        </AnimatePresence>
      </Container>

      {canPreview && near && <CursorPreview items={items} active={hovered} />}
    </section>
  )
}
