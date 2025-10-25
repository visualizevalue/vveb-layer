import { DateTime } from 'luxon'

export const formatDate = (date: string) => {
  return DateTime.fromISO(date).setLocale('en').toLocaleString(DateTime.DATE_MED)
}

export const formatDateUTC = (date: string) => {
  return DateTime.fromISO(date).toUTC().setLocale('en').toLocaleString(DateTime.DATE_MED)
}

export const formatDateTime = (date: string) => {
  return DateTime.fromISO(date).setLocale('en-US').toLocaleString({
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
}

export const formatTime = (date: string) => {
  return DateTime.fromISO(date)
    .setLocale('en-US')
    .toLocaleString({ hour: 'numeric', minute: 'numeric' })
}

export const timeAgo = (time: string) => {
  const date = DateTime.fromISO(time)

  return DateTime.now().diff(date).as('days') > 2
    ? formatDate(time)
    : date.toRelative({ style: 'short', locale: 'us' })
}
