<template>
  <div class="flex gap-4 mt-4">
    <button
      @click="props.resetSchedule"
      :disabled="!props.isChanged"
      :class="[
        'px-4 py-2 rounded',
        !props.isChanged ? 'bg-gray-400 text-gray-200 cursor-not-allowed' : 'bg-red-500 text-white',
      ]"
    >
      Reset
    </button>
    <button
      @click="props.saveSchedule"
      :disabled="!props.isChanged"
      :class="[
        'px-4 py-2 rounded',
        !props.isChanged ? 'bg-gray-400 text-gray-200 cursor-not-allowed' : 'bg-green-500 text-white',
      ]"
    >
      Save
    </button>
  </div>
</template>

<script setup lang="ts">
import type { IScheduleButtonsProps } from '../shared/types'

const props = defineProps<IScheduleButtonsProps>()
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ScheduleButtons',
})
</script>
