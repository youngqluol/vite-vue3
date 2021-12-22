<script lang="ts">
import { defineComponent, h } from 'vue';
import { Document, HomeFilled, Setting, Edit, Eleme, HelpFilled, Goblet, Key, Shop, Switch } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'left-menu',
  components: {
    Document,
    HomeFilled,
    Setting,
    Edit,
    Eleme,
    HelpFilled,
    Goblet,
    Key,
    Shop,
    Switch
  }
})
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { useMenuStore } from '@/store/menu';
import { storeToRefs } from 'pinia';

interface ListOptions {
  title: never,
  iconName: string,
}

interface Props {
  menuList: Array<ListOptions>
}
const props = defineProps<Props>()

const isCollapse = ref(false)

const menuStore = useMenuStore();
// const { navList } = storeToRefs(menuStore);

function addNav(nav: never) {
  console.log('addNav')
  menuStore.addNav(nav)
}

</script>

<template>
  <div class="left-menu">
    <el-menu class="el-menu-vertical-demo" :collapse="isCollapse">
      <el-menu-item
        v-for="(item, index) in props.menuList"
        :key="item.title"
        :index="`${index}`"
        @click="addNav(item.title)"
      >
        <el-icon>
          <component :is="item.iconName"></component>
        </el-icon>
        <template #title>{{ item.title }}</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped lang="less">
.left-menu {
  width: 200px;
  .el-menu-vertical-demo {
    // width: 100%;
  }
}
</style>