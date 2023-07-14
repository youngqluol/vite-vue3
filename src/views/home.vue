<script setup lang="ts">
import DividerSection from '../components/DividerSection.vue';
import useTitle from '@/hooks/useTitle';

interface DemoPageItem {
  title: string
  routeName: string
}

const demoPages: DemoPageItem[] = [
  {
    title: '验证码demo',
    routeName: 'vetify',
  },
  {
    title: 'Element demo',
    routeName: 'element',
  },
  {
    title: 'TSX demo',
    routeName: 'tsxPage',
  },
]

const title = useTitle()

function changeTitle(newTitle: string) {
  title.value = newTitle;
}
</script>

<template>
  <div class="home-page">
    <DividerSection
      v-for="demoPage in demoPages"
      :key="demoPage.routeName"
      :title="demoPage.title"
      :route-name="demoPage.routeName"
    />
  </div>
  <!-- <button @click="changeTitle('新标题')">改变title</button>
  <functionComp :text="'1'">
    <div>1111</div>
  </functionComp> -->
</template>

<style lang="less" scoped>
</style>
