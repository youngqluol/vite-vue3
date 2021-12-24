<script setup lang="ts">
import { computed, watch, defineAsyncComponent } from 'vue';
import { useMenuStore } from '@/store/menu';
import { storeToRefs } from 'pinia';


const menuStore = useMenuStore();
const { navList, currentNavValue } = storeToRefs(menuStore);

// const navInfo = [];

// watch(
//   () => navList.value,
//   (newV) => {

//   },
//   {
//     immediate: true
//   })

const navCompMap = new Map();

const editableTabs = computed(() => {
  return navList.value.map(navValue => {
    if (!navCompMap.has(navValue)) {
      navCompMap.set(navValue, defineAsyncComponent(() => import(`./components/${navValue}.vue`)))
    }
    const navComponent = navCompMap.get(navValue)
    return {
      title: navValue,
      name: navValue,
      navComponent
    }
  })
}
)
const currentNavComponent = computed(() => editableTabs.value.filter(item => item.name === currentNavValue.value)[0].navComponent)

function removeTab(name: string) {
  console.log('removeTab', name)
  // menuStore.removeNav(name);
  // 删除navCompMap中异步组件

}

function clickTab(tab: any) {
  // menuStore.toggleTabsValue(tab.paneName)
}

</script>

<template>
  <div class="right-nav">
    <el-tabs
      v-model="currentNavValue"
      type="card"
      closable
      @tab-remove="removeTab"
      @tab-click="clickTab"
    >
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      ></el-tab-pane>
    </el-tabs>
    <div class="nav-comp-wrapper">
      <keep-alive>
        <component :is="currentNavComponent"></component>
      </keep-alive>
    </div>
  </div>
</template>

<style scoped lang="less">
</style>