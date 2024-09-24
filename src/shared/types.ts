export type TTimeInterval = {
  bt: number
  et: number
}

export type TScheduler = Record<string, TTimeInterval[]>
