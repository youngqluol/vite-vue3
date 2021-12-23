<script setup lang="ts">
import { computed } from 'vue';
import { useMenuStore } from '@/store/menu';
import { storeToRefs } from 'pinia';

const menuStore = useMenuStore();
const { navList, currentNavValue } = storeToRefs(menuStore);

const editableTabs = computed(() => {
  return navList.value.map(item => {
    return {
      title: item,
      name: item
    }
  })
}
)

function removeTab(name: string) {
  console.log('removeTab', name)
  
}

function clickTab(tab: any) {
  // menuStore.toggleTabsValue(tab.paneName)
}

</script>

<template>
  <div class="right-nav">
    <el-tabs v-model="currentNavValue" type="card" closable @tab-remove="removeTab" @tab-click="clickTab">
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        <!-- <el-button>Default</el-button> -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="less">
</style>