<template>
  <h2 class="uppercase underline my-4 font-bold text-inherit text-slate-700">Set schedule</h2>

  <WeekCalendar
    :days="days"
    :hours="hours"
    :isHourSelected="isHourSelected"
    :toggleAllDay="toggleAllDay"
    :startSelection="startSelection"
    :dragSelection="dragSelection"
    :endSelection="endSelection"
    :isAllDaySelected="isAllDaySelected"
  />

  <ScheduleButtons :resetSchedule="resetSchedule" :saveSchedule="saveSchedule" :isChanged="isChanged" />
</template>

<script lang="ts">
import WeekCalendar from '../components/WeekCalendar.vue'
import ScheduleButtons from '../components/ScheduleButtons.vue'
import { useSchedule } from '../utils/hooks'

export default {
  components: {
    WeekCalendar,
    ScheduleButtons,
  },
  setup() {
    const {
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
    } = useSchedule()

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
  },
}
</script>
