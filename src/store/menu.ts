import { defineStore } from 'pinia';
// import { ref } from 'vue';

// 第一种
interface MenuState {
  count: number,
  navList: string[],
  currentNavValue: string
}

export const useMenuStore = defineStore({
  id: 'menu',
  state: (): MenuState => ({
    count: 0,
    navList: [],
    currentNavValue: '',
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

    addNav(targetNav: string) {
      this.toggleTabsValue(targetNav);
      if (this.navList.includes(targetNav)) return;
      this.navList.push(targetNav);
    },

    removeNav() {
      
    },

    toggleTabsValue(targetNav: string) {
      this.currentNavValue = targetNav;
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
