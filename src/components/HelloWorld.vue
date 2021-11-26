<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import Vetify from '../utils/vetify'
import imgSrc from '../assets/logo.png'

// 定义props
// defineProps<{ msg: string }>()
let verifyInstance: any = null;
const data = reactive({
  // verifyInstance: null
})

onMounted(async () => {
  await nextTick();
  verifyInstance = new Vetify({
    target: '#vetify-container',
    imgSrc
  })
})

</script>

<template>
  <div id="vetify-container"></div>
</template>

<style lang="less" scoped>
</style>
