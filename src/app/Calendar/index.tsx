'use client'

import { useEffect, useRef, useState } from 'react'
import {
  getDayOfWeek,
  getHoursOfDayEvery15Minutes,
  getFormattedTime,
  getNext7Days,
  isToday
} from '../date'
import { cn } from '@/app/cn'
import { CalendarBlock } from './calendar-block'
import { QUARTER_HOUR_CELL_HEIGHT, type CalendarEvent } from './utils'

export const Calendar = () => {
  const next7days = getNext7Days()
  const calendarContentRef = useRef<HTMLElement>(null)
  const [events, setEvents] = useState<CalendarEvent[]>([])

  function addEvent(event: CalendarEvent) {
    setEvents(ps => [...ps, event])
  }

  useEffect(() => {
    function scrollToCurrentTime() {
      const now = new Date()
      const currentHour = now.getHours()
      const currentMinute = now.getMinutes()
      const totalMinutes = currentHour * 60 + currentMinute
      const scrollAmount =
        Math.floor(totalMinutes / 15) * QUARTER_HOUR_CELL_HEIGHT
      calendarContentRef.current?.scrollTo({ top: scrollAmount })
    }
    scrollToCurrentTime()
  }, [])

  return (
    <div
      className="w-full h-full overflow-auto bg-white"
      ref={calendarContentRef as any}
    >
      {JSON.stringify({ events }, null, 2)}
      <div className="flex sticky top-0 bg-white">
        <div className="w-[100px] border" />
        <header className="w-full flex flex-1">
          {next7days.map(day => (
            <div
              className="flex flex-1 flex-col gap-3 items-center border-t border-r border-b py-4"
              key={day.toDateString()}
            >
              <div className="">{getDayOfWeek(day)}</div>
              <div
                className={cn(
                  'w-8 h-8 flex justify-center items-center rounded-full',
                  {
                    'bg-blue-300': isToday(day)
                  }
                )}
              >
                {day.getDate()}
              </div>
            </div>
          ))}
        </header>
      </div>
      <div className="flex">
        <div className="w-[100px] flex flex-col items-center border border-t-0">
          {getHoursOfDayEvery15Minutes().map(time => (
            <div
              className={`text-sm text-gray-700 italic`}
              style={{ height: QUARTER_HOUR_CELL_HEIGHT }}
              key={time.toLocaleTimeString()}
            >
              {getFormattedTime(time)}
            </div>
          ))}
        </div>
        <div className="flex flex-1">
          {next7days.map(day => (
            <div
              className="flex flex-1 flex-col items-center border-r bg-gray-50"
              key={day.toDateString()}
            >
              {getHoursOfDayEvery15Minutes(day).map(time => (
                <CalendarBlock
                  key={time.toLocaleTimeString()}
                  datetime={time}
                  event={
                    events.find(ev => ev.start.getTime() === time.getTime()) ??
                    null
                  }
                  addEvent={addEvent}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
