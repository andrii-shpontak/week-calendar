export type TTimeInterval = {
  bt: number
  et: number
}

export type TScheduler = Record<string, TTimeInterval[]>

export interface IWeekCalendarProps {
  days: TScheduler
  hours: number[]
  isHourSelected: (dayKey: string, hour: number) => boolean
  toggleAllDay: (dayKey: string) => void
  startSelection: (dayKey: string, hour: number) => void
  dragSelection: (dayKey: string, hour: number) => void
  endSelection: () => void
  isAllDaySelected: (dayKey: string) => boolean
}

export interface IScheduleButtonsProps {
  resetSchedule: () => void
  saveSchedule: () => void
  isChanged: boolean
}
