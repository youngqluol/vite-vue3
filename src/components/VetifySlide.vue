<script setup lang="ts">
import { ref, reactive, onBeforeMount } from 'vue'
import { loadImages } from '../utils/Helper'
import initialSlideBg from '../assets/slide-bg.jpg'
import initialSlide from '../assets/slide.png';

/* props */
interface Props {
  target?: string // 位置信息：决定组件在页面的最终位置
  position?: string
  titleText?: string,
  onFail?: Function,
  onSuccess?: Function,
  // 获取图片（背景、滑块）回调，需要是一个可以返回图片地址的promise
  // 默认数组第一个是背景图、第二个是滑块图
  getImgSrc: () => Promise<string[]>
}

const props = withDefaults(defineProps<Props>(), {
  titleText: '请完成安全验证',
  getImgSrc: () => new Promise(resolve => resolve([]))
})

/* 子组件通过emit抛出事件*/
const emits = defineEmits(['testEmit']) // for test

function testEmit() { // for test
  emits('testEmit', 1)
}

/* data */
const imgSrc = reactive({
  slideBg: '',
  slide: ''
})

const slideBgStyle = reactive({
  width: 320 + 'px',
  height: 160 + 'px'
})

const color = ref('red'); // for test: v-bind style

/* lifeCycle */
onBeforeMount(async () => {
  const [slideBg = '', slide = ''] = await props.getImgSrc()
  imgSrc.slideBg = slideBg
  imgSrc.slide = slide
  const a = await loadImages([initialSlideBg])
})


/* methods */
function close() {
  console.log('close')
}


</script>

<template>
  <div class="mask" @click="testEmit"></div>
  <div class="body">
    <header class="header">
      <div class="text">{{ props.titleText }}</div>
      <div class="close" @click="close">X</div>
    </header>
    <main class="main"></main>
    <footer class="footer"></footer>
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
  opacity: 0.5;
}

.body {
  width: auto;
  height: auto;
  background-color: #fff;
  color: v-bind(color);

  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .main {
  }
}
</style>