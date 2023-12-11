<script setup lang="ts">
import { inject } from 'vue'
import { $vetify } from '../utils/context'
import { showVetifySlide } from '../utils/vetify'

// 插件中provide，这里inject
const vetify = inject($vetify)

function showClickVetify() {
  // 获取组件中expose的属性/方法
  vetify && vetify.showVetify({
    target: '#target-button',
    position: 'top',
    pointNum: 3,
    onSuccess,
    onFail,
  });
}

function onSuccess() {
  console.error('验证成功');
}

function onFail() {
  console.error('验证失败');
}

function showSliderVetify() {
  showVetifySlide({
    getImgSrc: () => new Promise(resolve => resolve([])),
    checkResult,
  })
}

function checkResult(data: string | number): Promise<boolean> {
  return new Promise((resolve) => {
    console.log('check result:', data)
    resolve(Number(data) > 180)
  })
}
</script>

<template>
  <!-- <VetifySlide
    :title-text="'请先完成安全验证'"
    target="#target-button"
    @test-emit="testEmit"
    :check-result="checkResult"
  /> -->
  <div class="vetify-page">
    <button id="target-button" @click="showClickVetify">
      点选验证码
    </button>
    <button @click="showSliderVetify">
      滑动验证码
    </button>
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
