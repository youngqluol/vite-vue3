<script setup lang="ts">
import VetifyClick from '../components/VetifyClick.vue';
import { getCurrentInstance } from 'vue'

// 获取vue全局挂载属性
const { proxy } = getCurrentInstance() 

function showClickVetify() {
  console.log('点选验证')
  proxy.$showVetify()
}

function showSliderVetify() {
  console.log('滑动验证')
} 
</script>

<template>
  <!-- <VetifyClick /> -->
  <div class="vetify-page">
   <button @click="showClickVetify">点验证码</button>
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