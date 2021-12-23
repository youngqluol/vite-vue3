<script setup lang="ts">
import LeftMenu from '@/components/element/LeftMenu.vue';
import RightNav from '@/components/element/RightNav.vue';
import { elementMenuData } from '@/config';

// TODO 通过接口来定最终菜单数据
const menuList = [...elementMenuData, ...elementMenuData]

</script>

<template>
  <div class="element-page">
    <left-menu :menu-list="menuList" />
    <right-nav />
  </div>
</template>

<style lang="less" scoped>
.element-page {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>