import { defineStore } from 'pinia';
// import { ref } from 'vue';

// 第一种
export const useMenuStore = defineStore({
  id: 'menu',
  state: () => ({
    count: 0,
    navList: [],
    tabsValue: '',
  }),
  getters: {
    doubleCount(): number {
      return this.count * 2;
    }
  },
  actions: {
    increment() {
      this.count++;
    },

    addNav(targetNav: never) {
      this.toggleTabsValue(targetNav);
      if (this.navList.includes(targetNav)) return;
      this.navList.push(targetNav);
    },

    toggleTabsValue(targetNav: string) {
      this.tabsValue = targetNav;
    }
  }
});

// 第二种
// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   function increment() {
//     count.value++
//   }

//   return { count, increment }
// })
