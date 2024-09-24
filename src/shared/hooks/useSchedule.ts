import { computed, ref } from 'vue'

import type { TTimeInterval } from '../types'
import { defaultScheduler } from '../constants'

export const useSchedule = () => {
  const days = ref<Record<string, TTimeInterval[]>>(defaultScheduler)
  const isSelecting = ref(false)
  const selectionType = ref<'select' | 'deselect' | null>(null)

  const hours = computed(() => Array.from({ length: 24 }, (_, i) => i))

  const isHourSelected = (dayKey: string, hour: number) => {
    const minutes = hour * 60
    const dayIntervals = days.value[dayKey]
    return dayIntervals.some((interval) => minutes >= interval.bt && minutes <= interval.et)
  }

  const toggleAllDay = (dayKey: string) => {
    console.log('toggle')
    const isAllSelected =
      days.value[dayKey].length === 1 && days.value[dayKey][0].bt === 0 && days.value[dayKey][0].et === 1439
    days.value[dayKey] = isAllSelected ? [] : [{ bt: 0, et: 1439 }]
  }

  const startSelection = (dayKey: string, hour: number) => {
    isSelecting.value = true
    selectionType.value = isHourSelected(dayKey, hour) ? 'deselect' : 'select'
    updateSelection(dayKey, hour)
  }

  const dragSelection = (dayKey: string, hour: number) => {
    if (isSelecting.value) {
      updateSelection(dayKey, hour)
    }
  }

  const updateSelection = (dayKey: string, hour: number) => {
    const minutes = hour * 60
    let intervals = days.value[dayKey]
    if (selectionType.value === 'select') {
      if (!isHourSelected(dayKey, hour)) {
        intervals.push({ bt: minutes, et: minutes + 59 })
        days.value[dayKey] = mergeIntervals(intervals)
      }
    } else {
      days.value[dayKey] = intervals.filter((interval) => !(minutes >= interval.bt && minutes <= interval.et))
    }
  }

  const endSelection = () => {
    isSelecting.value = false
    selectionType.value = null
  }

  const mergeIntervals = (intervals: TTimeInterval[]) => {
    intervals.sort((a, b) => a.bt - b.bt)
    let merged: TTimeInterval[] = [intervals[0]]
    for (let i = 1; i < intervals.length; i++) {
      const current = intervals[i]
      const last = merged[merged.length - 1]
      if (current.bt <= last.et) {
        last.et = Math.max(last.et, current.et)
      } else {
        merged.push(current)
      }
    }
    return merged
  }

  return {
    days,
    isSelecting,
    selectionType,
    hours,
    isHourSelected,
    toggleAllDay,
    startSelection,
    dragSelection,
    updateSelection,
    endSelection,
  }
}
