<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount, nextTick } from 'vue'
import Vetify from '../utils/vetify'
import imgSrc from '../assets/logo.png'

// 定义props
defineProps<{ msg?: string }>()
let vetifyInstance: any = null;

function onClickSuccess() {
  console.log('验证成功...');
}

function onClickFail() {
  console.log('验证失败...');
}

function onReset() {
  vetifyInstance && vetifyInstance.reset()
}

function onClose() {
  vetifyInstance && vetifyInstance.destroy();
}

onMounted(async () => {
  await nextTick();
  vetifyInstance = new Vetify({
    target: '#vetify-container',
    imgSrc,
    onSuccess: onClickSuccess,
    onFail: onClickFail
  })
})

onBeforeUnmount(() => {
  vetifyInstance && vetifyInstance.destroy()
})

</script>

<template>
  <div class="mask"></div>
  <div class="main">
    <div id="vetify-title"></div>
    <div id="vetify-container"></div>
    <div id="vetify-footer">
      <button @click="onReset">刷新</button>
      <button @click="onClose">关闭</button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #000;
  opacity: .5;
}

.main {
  position: absolute;
  z-index: 9999;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;

  #vetify-container {
    overflow: hidden;
  }
  #vetify-title {
    width: auto;
    height: 30px;
    line-height: 30px;
  }
}
</style>
