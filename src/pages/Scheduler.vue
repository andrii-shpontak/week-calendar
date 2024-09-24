<template>
  <h2 class="uppercase underline my-4 font-bold text-inherit text-slate-700">Set schedule</h2>

  <div class="grid grid-cols-[3rem_3rem_repeat(8,_1fr)]">
    <div />
    <div class="uppercase pb-2 text-center">all day</div>

    <div v-for="(time, index) in timelineArray" :key="index" class="border-l text-center pb-4">
      {{ time }}
    </div>
  </div>

  <div class="grid grid-rows-7 gap-2">
    <div v-for="(_, dayKey) in days" :key="dayKey" class="grid grid-cols-[3rem_3rem_1fr] border">
      <div class="uppercase text-center border-r p-2 text-slate-500">{{ dayKey }}</div>
      <div class="font-bold mx-1 border-r cursor-pointer" @click="toggleAllDay(dayKey)">X</div>
      <div class="grid grid-cols-[repeat(24,_1fr)] gap-1">
        <div
          v-for="hour in hours"
          :key="hour"
          :class="[
            'h-10 text-center leading-10 cursor-pointer bg-gray-200 hour-slot',
            { 'bg-green-600 text-white': isHourSelected(dayKey, hour) },
          ]"
          @mousedown="startSelection(dayKey, hour)"
          @mouseenter="dragSelection(dayKey, hour)"
          @mouseup="endSelection"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useSchedule } from '../shared/hooks'
import { timelineArray } from '../shared/constants'

export default {
  setup() {
    const { days, hours, isHourSelected, toggleAllDay, startSelection, dragSelection, updateSelection, endSelection } =
      useSchedule()
    return {
      days,
      hours,
      isHourSelected,
      toggleAllDay,
      startSelection,
      dragSelection,
      updateSelection,
      endSelection,
      timelineArray,
    }
  },
  watch: {
    days: {
      handler(newDays) {
        console.log('Days changed:', newDays)
      },
      deep: true,
    },
  },
}
</script>
