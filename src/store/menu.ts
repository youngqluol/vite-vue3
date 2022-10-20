import { defineStore } from 'pinia';
// import { ref } from 'vue';

// 第一种

interface MenuListOptions {
  title: string,
  iconName: string,
}
interface MenuState {
  count: number;
  navList: string[];
  currentNavValue: string;
  menuList: MenuListOptions[];
}

export const useMenuStore = defineStore({
  id: 'menu',
  state: (): MenuState => ({
    count: 0,
    navList: [],
    currentNavValue: '',
    menuList: []
  }),
  getters: {
    doubleCount(): number {
      return this.count * 2;
    },
    currentMenuIndex(): string {
       const index = this.menuList.findIndex(item => item.title === this.currentNavValue);
       return String(index);
    }
  },
  actions: {
    addMenuList(listData: MenuListOptions[]) {
      this.menuList = listData
    },

    addNav(targetNav: string) {
      this.toggleTabsValue(targetNav);
      if (this.navList.includes(targetNav)) return;
      this.navList.push(targetNav);
    },

    removeNav(name: string) {
      if (this.navList.length <= 1) return;
      const index = this.navList.findIndex(item => item === name);
      if (index > -1) {
        this.navList.splice(index, 1);
        if (name === this.currentNavValue) {
          this.currentNavValue = this.navList[index - 1 || index + 1]; // TODO fix bug
        }
      }
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
