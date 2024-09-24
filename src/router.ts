import { createRouter, createWebHashHistory } from 'vue-router'

import { RoutesEnum } from './shared/enums'

export const history = createWebHashHistory()
export const router = createRouter({
  history,
  routes: [
    {
      path: '',
      redirect: { name: RoutesEnum.MAIN },
    },
    {
      path: '/main',
      name: RoutesEnum.MAIN,
      component: () => import('./pages/Main.vue'),
    },
    {
      path: '/scheduler',
      name: RoutesEnum.SCHEDULER,
      component: () => import('./pages/Scheduler.vue'),
    },
    {
      path: '/:catchAll(.*)',
      redirect: { name: RoutesEnum.MAIN },
    },
  ],
})
