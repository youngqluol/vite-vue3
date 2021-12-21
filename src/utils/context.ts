import { InjectionKey } from 'vue'

// 防止provide类型丢失
interface VetifyClickComp {
  hiddenVetify: Function,
  showVetify: Function
} 

export const $vetify: InjectionKey<VetifyClickComp> = Symbol()