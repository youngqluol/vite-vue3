<script setup lang="ts">
import DividerSection from '../components/DividerSection.vue';
import functionComp from '../components/functionComp';
import useTitle from '@/hooks/useTitle';

const demoPages = [
  {
    title: '验证码demo',
    routeName: 'vetify'
  }
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
      :title="demoPage.title"
      :routeName="demoPage.routeName"
      :key="demoPage.routeName"
    />
  </div>
  <button @click="changeTitle('新标题')">改变title</button>
  <functionComp :text="'1'">
    <div>1111</div>
  </functionComp>
</template>

<style lang="less" scoped>
</style>