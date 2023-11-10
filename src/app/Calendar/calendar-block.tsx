import { PlusCircleIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CalendarEvent, QUARTER_HOUR_CELL_HEIGHT } from './utils'
import { MouseEvent } from 'react'

export const CalendarBlock = ({
  datetime,
  event,
  addEvent
}: {
  datetime: Date
  event: CalendarEvent | null
  addEvent: (event: CalendarEvent) => void
}) => {
  if (event) {
    console.log({ event })

    return (
      <>
        <div
          className="cursor-pointer w-full flex flex-col justify-center items-center rounded overflow-hidden bg-blue-300 text-white text-sm [&:nth-child(4n+1)]:border-b"
          style={{ height: QUARTER_HOUR_CELL_HEIGHT * 4 }}
        >
          {event.name}
        </div>
        <div className="hidden" />
        <div className="hidden" />
        <div className="hidden" />
      </>
    )
  }

  const handleClick = ({
    event,
    datetime
  }: {
    event: MouseEvent
    datetime: Date
  }) => {
    if ((event.target as HTMLElement).getAttribute('data-state')) return

    const end = new Date(datetime.getTime())
    end.setMinutes(end.getMinutes() + 15)
    console.log({ event, datetime, end })
    addEvent({ id: '1', name: 'test', start: datetime, end })
  }

  return (
    <>
      <div
        className={`w-full [&:nth-child(4n+1)]:border-b flex justify-center items-center group cursor-pointer`}
        style={{ height: QUARTER_HOUR_CELL_HEIGHT }}
      >
        <div className="w-full h-full hidden group-hover:block">
          <Dialog>
            <DialogTrigger className="block w-full h-full">
              <div className="w-full h-full flex justify-center items-center">
                <PlusCircleIcon className="w-6 h-6 text-green-300" />
              </div>
            </DialogTrigger>
            <DialogContent onClick={e => e.stopPropagation()}>
              <DialogHeader>
                <DialogTitle className="mb-4">Add an event</DialogTitle>
                <DialogDescription>
                  <Input className="mb-4" placeholder="Event name" />
                  <Button
                    className="w-full"
                    onClick={event => handleClick({ event, datetime })}
                  >
                    Add Event
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  )
}
