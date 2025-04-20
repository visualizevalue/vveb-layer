import { DateTime } from 'luxon'

export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const daysInSeconds = (days: number): number => days * 60 * 60 * 24

export const nowInSeconds = (): number => Math.floor(Date.now() / 1000)

export const asUTCDate = (date: Date | null) =>
  date
    ? DateTime.utc(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
      )
    : null

const now = ref<number>(nowInSeconds())
let nowInterval: NodeJS.Timeout
export const useSeconds = () => {
  if (import.meta.client && !nowInterval) {
    nowInterval = setInterval(() => {
      now.value = nowInSeconds()
    }, 1000)
  }

  return now
}

export const useCountDown = (s: Ref<Number | BigInt>, showSecondsWithin: number = 60) => {
  const duration = computed(() => Math.abs(parseInt(`${s.value}`)))

  const seconds = computed(() => duration.value % 60)
  const minutes = computed(() => Math.floor(duration.value / 60) % 60)
  const hours = computed(() => Math.floor(duration.value / 60 / 60) % 24)
  const days = computed(() => Math.floor(duration.value / 60 / 60 / 24))

  const str = computed(() =>
    [
      days.value ? `${days.value}d` : null,
      hours.value ? `${hours.value}h` : null,
      minutes.value ? `${minutes.value}m` : null,
      duration.value < showSecondsWithin && seconds.value ? `${seconds.value}s` : null,
    ]
      .filter((s) => !!s)
      .join(' '),
  )

  return {
    seconds,
    minutes,
    hours,
    str,
  }
}

export const useSecondsAgo = (time: Ref<string | undefined>) => {
  const ago = ref()
  const now = useSeconds()

  watch(
    now,
    () => {
      ago.value = DateTime.fromISO(time.value!).toRelative({ style: 'short', locale: 'us' })
    },
    {
      immediate: true,
    },
  )

  return ago
}
