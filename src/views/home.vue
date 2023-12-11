<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter();

const demoPages: Array<{ title: string; routeName: string }> = [
  {
    title: '验证码',
    routeName: 'vetify',
  },
  {
    title: 'Element',
    routeName: 'element',
  },
  {
    title: 'tsx',
    routeName: 'tsxPage',
  },
]

function goDemoPage(routeName) {
  router.push(`./${routeName}`)
}
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <el-divider content-position="left">
      <span class="font-bold">demo页</span>
    </el-divider>
    <div class="p-5">
      <el-button
        v-for="{ title, routeName } in demoPages"
        :key="routeName"
        type="primary"
        @click="goDemoPage(routeName)"
      >
        {{ title }}
      </el-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
</style>
