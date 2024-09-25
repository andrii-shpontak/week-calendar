import { LocalStorageKeys } from '../enums'
import { LocalStorageService } from '../../utils/services'
import type { TScheduler } from '../types'

const savedSchedulerData = LocalStorageService.getItem(LocalStorageKeys.Scheduler)

export const defaultScheduler: TScheduler = !!savedSchedulerData
  ? JSON.parse(savedSchedulerData)
  : {
      mo: [{ bt: 240, et: 779 }],
      tu: [],
      we: [],
      th: [
        { bt: 240, et: 779 },
        { bt: 1140, et: 1319 },
      ],
      fr: [{ bt: 660, et: 1019 }],
      sa: [{ bt: 0, et: 1439 }],
      su: [],
    }

export const timelineArray = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00']
