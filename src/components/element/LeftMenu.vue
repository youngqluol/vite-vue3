<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
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

interface MenuListOptions {
  title: string,
  iconName: string,
}

interface Props {
  menuList: Array<MenuListOptions>
}
const props = defineProps<Props>()

const isCollapse = ref(false)

const menuStore = useMenuStore();
menuStore.addMenuList(props.menuList);

// 默认显示第一个
onBeforeMount(() => {
  if (props.menuList.length) {
    addNav(props.menuList[0].title)
  }
})

function addNav(nav: string) {
  console.log('addNav')
  menuStore.addNav(nav)
}

</script>

<template>
  <div class="left-menu">
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :default-active="menuStore.currentMenuIndex"
      :background-color="'#001529'"
      :text-color="'#ffffffb3'"
    >
      <el-menu-item
        v-for="(item, index) in props.menuList"
        :key="index"
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
  width: 150px;
  height: 100vh;
  overflow: auto;
  .el-menu-vertical-demo {
    // width: 100%;
  }
}

// 滚动条样式
.left-menu::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: #aaa;
}
</style>