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

function onClickSuccess() {
  console.log('验证成功...');
}

function onClickFail() {
  console.log('验证失败...');
}

onMounted(async () => {
  await nextTick();
  verifyInstance = new Vetify({
    target: '#vetify-container',
    imgSrc,
    onSuccess: onClickSuccess,
    onFail: onClickFail
  })
})

</script>

<template>
  <div id="vetify-title"></div>
  <div id="vetify-container"></div>
  <div id="vetify-footer"></div>
</template>

<style lang="less" scoped>
#vetify-container {
  overflow: hidden;
}
#vetify-title {
  width: auto;
  height: 30px;
  line-height: 30px;
}
</style>
