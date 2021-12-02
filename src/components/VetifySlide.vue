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

let slideBgWidth = 320 + 'px'
let slideBgHeight = 160 + 'px'
let slideWidth = 60 + 'px'
let slideHeight = 158 + 'px'

let slideBlockLeft = '0px';
// let progressBlockWidth = '0px';

const color = 'red'; // for test: v-bind style

/* lifeCycle */
onBeforeMount(async () => {
  const [slideBg = initialSlideBg, slide = initialSlide] = await props.getImgSrc()
  imgSrc.slideBg = slideBg
  imgSrc.slide = slide
  const imgsInfo = await loadImages([imgSrc.slideBg, imgSrc.slide])
  console.log(imgsInfo)
  slideBgWidth = imgsInfo[0].width + 'px'
  slideBgHeight = imgsInfo[0].height + 'px'
  slideWidth = imgsInfo[1].width + 'px'
  slideHeight = imgsInfo[1].height + 'px'
})


/* methods */
function close() {
  console.log('close')
}

function onMousedown() {
  console.log('mouse down')
}

function onMouseup() {
  console.log('mouse up')
}

</script>

<template>
  <div class="mask" @click="testEmit"></div>
  <div class="body">
    <header class="header">
      <div class="text">{{ props.titleText }}</div>
      <div class="close" @click="close">X</div>
    </header>
    <main class="main">
      <img :src="imgSrc.slideBg" alt="背景图" class="slide-bg" />
      <img :src="imgSrc.slide" alt="滑块" class="slide" />
    </main>
    <footer class="footer">
      <div class="progress-block"></div>
      <div
        class="slide-block"
        @mousedown="onMousedown"
        @mouseup="onMouseup"
      ></div>
    </footer>
  </div>
</template>

<style lang="less" scoped>
@slideBgWidth: v-bind(slideBgWidth);
@slideBgHeight: v-bind(slideBgHeight);

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
  padding: 0 10px;
  height: auto;
  background-color: #fff;
  position: absolute;

  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .main {
    position: relative;
    width: @slideBgWidth;
    height: @slideBgHeight;

    img {
      position: absolute;
      left: 0;
      top: 0;
    }

    .slide-bg {
      width: @slideBgWidth;
      height: @slideBgHeight;
    }

    .slide {
      width: v-bind(slideWidth);
      height: v-bind(slideHeight);
      left: v-bind(slideBlockLeft);
    }
  }

  .footer {
    width: @slideBgWidth;
    height: 60px;
    position: relative;

    .slide-block {
      width: 60px;
      height: 60px;
      background-color: aqua;
      position: absolute;
      top: 0;
      left: v-bind(slideBlockLeft);
    }

    .progress-block {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: v-bind(slideBlockLeft);
      background-color: aquamarine;
    }
  }
}
</style>