import type { Hours } from '../types'

const TIME_ZONE = 'Asia/Manila'

/** "07:00" → "7:00 am" */
export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number)
  const suffix = h >= 12 ? 'pm' : 'am'
  const hour = h % 12 === 0 ? 12 : h % 12
  return `${hour}:${String(m).padStart(2, '0')} ${suffix}`
}

/** Current weekday (0–6) and minutes since midnight at the café. */
function nowAtCafe(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'))
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) }
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export function getStatus(hours: Hours[], date = new Date()) {
  const { day, minutes } = nowAtCafe(date)
  const today = hours.find((h) => h.days.includes(day))
  const isOpen = !!today && minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)
  return { today, isOpen }
}
