export const getNext7Days = (): Date[] => {
  const today = new Date()
  const next7Days = []

  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(today)
    nextDay.setDate(today.getDate() + i)
    next7Days.push(nextDay)
  }
  return next7Days
}

export const getDayOfWeek = (date: Date): string => {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  const dayIndex = date.getDay()

  return daysOfWeek[dayIndex]
}

export const isToday = (date: Date) => {
  const today = new Date()

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

// export const getHoursOfDayEvery15Minutes = (): string[] => {
//   const hoursOfDay = []
//   for (let hour = 0; hour < 24; hour++) {
//     for (let minute = 0; minute < 60; minute += 15) {
//       const hourString = hour < 10 ? `0${hour}` : `${hour}`
//       const minuteString = minute < 10 ? `0${minute}` : `${minute}`
//       hoursOfDay.push(`${hourString}:${minuteString}`)
//     }
//   }
//   return hoursOfDay
// }

export const getHoursOfDayEvery15Minutes = (
  today: Date = new Date()
): Date[] => {
  const now = today
  now.setHours(0, 0, 0, 0)

  const hoursOfDay = []
  for (let hour = 0; hour < 23; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const hourString = hour < 10 ? `0${hour}` : `${hour}`
      const minuteString = minute < 10 ? `0${minute}` : `${minute}`
      const dateString = `${hourString}:${minuteString}`
      const date = new Date(`${now.toDateString()} ${dateString}`)
      hoursOfDay.push(date)
    }
  }

  return hoursOfDay
}

export const getFormattedTime = (date: Date) => {
  const hour = date.getHours()
  const minute = date.getMinutes()
  const hourString = hour < 10 ? `0${hour}` : `${hour}`
  const minuteString = minute < 10 ? `0${minute}` : `${minute}`
  return `${hourString}:${minuteString}`
}

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  )
}
