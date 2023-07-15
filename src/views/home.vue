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
      class="p-5"
      :title="demoPage.title"
      :route-name="demoPage.routeName"
    />
  </div>
  <div class="p-5 bg-slate-50 text-center">
    tailwind css
  </div>
</template>

<style lang="less" scoped>
</style>
