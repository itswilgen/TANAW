import { useSyncExternalStore } from 'react'
import { hours } from '../data/site'
import { getStatus } from '../lib/hours'

// Re-check once a minute so "Open now" flips at closing time without a reload.
const subscribe = (onChange: () => void) => {
  const id = window.setInterval(onChange, 60_000)
  return () => window.clearInterval(id)
}

// Snapshot is a string so React can compare it by value.
const getSnapshot = () => {
  const { today, isOpen } = getStatus(hours)
  return `${today ? hours.indexOf(today) : -1}|${isOpen}`
}

/** Live open/closed status. Null while prerendering, so build-time hours never get baked in. */
export function useCafeStatus() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => null)
  if (snapshot === null) return null
  const [index, open] = snapshot.split('|')
  return { today: hours[Number(index)] as (typeof hours)[number] | undefined, isOpen: open === 'true' }
}
