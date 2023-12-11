import type { InjectionKey } from 'vue'

export interface ShowVerifyParams {
  target: string
  position: string
  pointNum: number
  onSuccess: () => void
  onFail: () => void
}

// 防止provide类型丢失
interface VetifyClickComp {
  hiddenVetify: () => void
  showVetify: (params: ShowVerifyParams) => void
}

export const $vetify: InjectionKey<VetifyClickComp> = Symbol('vetify Sympol')
