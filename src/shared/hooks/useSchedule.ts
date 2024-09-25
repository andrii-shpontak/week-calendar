import { cloneObject, isNotEqual } from '../helpers'
import { ref, watch } from 'vue'

import type { TTimeInterval } from '../types'
import { defaultScheduler } from '../constants'

export const useSchedule = () => {
  const days = ref<Record<string, TTimeInterval[]>>(cloneObject(defaultScheduler))
  const isSelecting = ref(false)
  const selectionType = ref<'select' | 'deselect' | null>(null)
  const isChanged = ref(false)

  const resetSchedule = () => {
    days.value = cloneObject(cloneObject(defaultScheduler))
    isChanged.value = false
  }

  const saveSchedule = () => {
    console.log('Current schedule:', days.value)
  }

  const hours = Array.from({ length: 24 }, (_, i) => i)

  const isHourSelected = (dayKey: string, hour: number) => {
    const minutes = hour * 60
    const dayIntervals = days.value[dayKey]
    return dayIntervals.some((interval) => minutes >= interval.bt && minutes <= interval.et)
  }

  const toggleAllDay = (dayKey: string) => {
    const isAllSelected =
      days.value[dayKey].length === 1 && days.value[dayKey][0].bt === 0 && days.value[dayKey][0].et === 1439
    days.value[dayKey] = isAllSelected ? [] : [{ bt: 0, et: 1439 }]
  }

  const mergeIntervals = (intervals: TTimeInterval[]) => {
    if (!intervals.length) return []
    intervals.sort((a, b) => a.bt - b.bt)

    let merged: TTimeInterval[] = [intervals[0]]

    for (let i = 1; i < intervals.length; i++) {
      const current = intervals[i]
      const last = merged[merged.length - 1]

      if (current.bt <= last.et + 1) {
        last.et = Math.max(last.et, current.et)
      } else {
        merged.push(current)
      }
    }

    return merged
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

  const endSelection = () => {
    isSelecting.value = false
    selectionType.value = null
  }

  const isAllDaySelected = (dayKey: string) => {
    const intervals = days.value[dayKey]
    return intervals.length === 1 && intervals[0].bt === 0 && intervals[0].et === 1439
  }

  watch(
    days,
    (newValue) => {
      isChanged.value = isNotEqual(newValue, defaultScheduler)
    },
    { deep: true }
  )

  return {
    days,
    hours,
    isHourSelected,
    toggleAllDay,
    startSelection,
    dragSelection,
    endSelection,
    resetSchedule,
    saveSchedule,
    isAllDaySelected,
    isChanged,
  }
}
