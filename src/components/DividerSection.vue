<script setup lang="ts">
import { useRouter } from 'vue-router';

// withDefaults：给 props 提供默认值
// https://v3.cn.vuejs.org/api/sfc-script-setup.html#%E4%BB%85%E9%99%90-typescript-%E7%9A%84%E5%8A%9F%E8%83%BD
interface Props {
  title?: string,
  routeName: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'hello'
})

const router = useRouter();
function onButtonClick() {
  router.push({ name: props.routeName })
}


</script>

<template>
  <div class="devider">
    <span>----------</span>
    {{ title }}
    <span>----------</span>
  </div>
  <button @click="onButtonClick">跳转 {{ title }} 页</button>
</template>

<style lang="less" scoped>
.devider {
  padding: 20px 0;
}
</style>