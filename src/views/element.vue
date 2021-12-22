<script setup lang="ts">
import LeftMenu from '@/components/element/LeftMenu.vue';
import RightNav from '@/components/element/RightNav.vue';

// for test
// 图标组件：Document, HomeFilled, Setting, Edit, Eleme, HelpFilled, Goblet, Key, Shop, Switch
const menuList = [
  {
    title: 'Document',
    iconName: 'Document',
  },
  {
    title: 'HomeFilled',
    iconName: 'HomeFilled',
  },
  {
    title: 'Setting',
    iconName: 'Setting',
  },
  {
    title: 'Edit',
    iconName: 'Edit',
  },
  {
    title: 'Eleme',
    iconName: 'Eleme',
  },
  {
    title: 'HelpFilled',
    iconName: 'HelpFilled',
  },
  {
    title: 'Goblet',
    iconName: 'Goblet',
  },
  {
    title: 'Key',
    iconName: 'Key',
  },
  {
    title: 'Shop',
    iconName: 'Shop',
  },
  {
    title: 'Switch',
    iconName: 'Switch',
  }
]

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
}
</style>