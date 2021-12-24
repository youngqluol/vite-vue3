<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import { useMenuStore } from '@/store/menu';
import { storeToRefs } from 'pinia';


const menuStore = useMenuStore();
const { navList, currentNavValue } = storeToRefs(menuStore);

const editableTabs = computed(() => {
  return navList.value.map(item => {
    return {
      title: item,
      name: item,
      navComponent: defineAsyncComponent(() => import('./components/Document.vue'))
    }
  })
}
)
const currentNavComponent = computed(() => {
  if (!editableTabs.value.length) {
    return null
  }
  return editableTabs.value.filter(item => item.name === currentNavValue.value)[0].navComponent
})

function removeTab(name: string) {
  console.log('removeTab', name)

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
    <keep-alive v-if="currentNavValue.length">
      <component :is="currentNavComponent"></component>
    </keep-alive>
  </div>
</template>

<style scoped lang="less">
</style>