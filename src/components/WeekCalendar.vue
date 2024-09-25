<template>
  <div>
    <div class="grid grid-cols-[3rem_3rem_repeat(8,_1fr)]">
      <div />
      <div class="uppercase pb-2 text-center">all day</div>

      <div v-for="(time, index) in timelineArray" :key="index" class="border-l text-center pb-4">
        {{ time }}
      </div>
    </div>

    <div class="grid grid-rows-7 gap-2">
      <div v-for="(_, dayKey) in props.days" :key="dayKey" class="grid grid-cols-[3rem_3rem_1fr] border">
        <div class="uppercase text-center border-r p-2 text-slate-500">{{ dayKey }}</div>
        <div
          class="font-bold border-r cursor-pointer bg-gray-500 flex justify-center items-center"
          @click="props.toggleAllDay(dayKey)"
        >
          <img
            v-if="props.isAllDaySelected(dayKey)"
            src="../assets/icons/okIcon.svg"
            alt="selected_icon"
            class="w-8 h-8"
          />
        </div>
        <div class="grid grid-cols-[repeat(24,_1fr)] gap-1">
          <div
            v-for="hour in props.hours"
            :key="hour"
            :class="[
              'h-10 text-center leading-10 cursor-pointer bg-gray-200 hour-slot',
              { 'bg-green-600 text-white': props.isHourSelected(dayKey, hour) },
            ]"
            @mousedown="props.startSelection(dayKey, hour)"
            @mouseenter="props.dragSelection(dayKey, hour)"
            @mouseup="props.endSelection"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { timelineArray } from '../shared/constants'
import type { IWeekCalendarProps } from '../shared/types'

const props = defineProps<IWeekCalendarProps>()
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WeekCalendar',
})
</script>
