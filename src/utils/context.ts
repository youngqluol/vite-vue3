import type { InjectionKey } from 'vue'

// 防止provide类型丢失
interface VetifyClickComp {
  hiddenVetify: () => void
  showVetify: () => void
}

export const $vetify: InjectionKey<VetifyClickComp> = Symbol('vetify Sympol')
