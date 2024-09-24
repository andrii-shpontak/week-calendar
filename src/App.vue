<template>
  <div class="max-w-screen-sm mx-8 sm:mx-auto mt-8 border rounded-lg overflow-hidden">
    <div class="bg-purple-500 px-6 py-4 text-white flex justify-center">
      <div>
        <router-link
          :class="`py-1 px-3 rounded-md text-white font-bold select-none ${
            route.name === RoutesEnum.MAIN ? 'bg-purple-600' : ''
          }`"
          :to="{ name: RoutesEnum.MAIN }"
        >
          Main
        </router-link>
        <router-link
          :class="`py-1 px-3 rounded-md text-white font-bold select-none ml-4 ${
            route.name === RoutesEnum.SCHEDULER ? 'bg-purple-600' : ''
          }`"
          :to="{ name: RoutesEnum.SCHEDULER }"
        >
          Scheduler
        </router-link>
      </div>
    </div>
    <div class="px-6 py-4 transition-all duration-300">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { RoutesEnum } from './shared/enums'

export default defineComponent({
  setup() {
    const route = useRoute()
    return { RoutesEnum, route }
  },
})
</script>
