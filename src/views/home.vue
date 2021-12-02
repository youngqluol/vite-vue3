<script setup lang="ts">
import DividerSection from '../components/DividerSection.vue';

const demoPages = [
  {
    title: '验证码demo',
    routeName: 'vetify'
  }
]

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
</template>

<style lang="less" scoped>
</style>