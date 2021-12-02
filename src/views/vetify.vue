<script setup lang="ts">
import { inject } from 'vue'
import VetifySlide from '../components/VetifySlide.vue'

// 插件中provide，这里inject
const $vetify :any = inject('$vetify')

function showClickVetify() {
  // 获取组件中expose的属性/方法
  $vetify && $vetify.showVetify({
    target: '#target-button',
    position: 'top',
    pointNum: 3,
    onSuccess,
    onFail
  });
}

function onSuccess() {
  console.error('验证成功');
}

function onFail() {
  console.error('验证失败');
}

function showSliderVetify() {
  console.log('滑动验证')
}

// for test
function testEmit(...args: []) {
  console.error('testEmit', args)
}

</script>

<template>
  <VetifySlide :title-text="'请先完成安全验证'" @test-emit="testEmit" />
  <div class="vetify-page">
    <button @click="showClickVetify" id="target-button">点验证码</button>
    <button @click="showSliderVetify">滑动验证码</button>
  </div>
</template>

<style lang="less" scoped>
.vetify-page {
  width: 200px;
  height: 100px;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);

  button {
    margin-top: 20px;
    margin-left: 20px;
  }
}
</style>