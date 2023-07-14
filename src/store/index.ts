import { ref } from 'vue';
import type { App } from 'vue';
import { createPinia, defineStore } from 'pinia';

const store = createPinia();

// 第二种
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  function increment() {
    count.value++;
  }

  return { count, increment };
});
export function setupStore(app: App<Element>) {
  app.use(store);
}
