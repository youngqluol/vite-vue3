<script setup lang="ts">
import { getCurrentInstance, nextTick, onBeforeMount, reactive, ref } from 'vue'
import { loadImages, throttle } from '../utils/Helper'
import initialSlideBg from '../assets/slide-bg.jpg'
import initialSlide from '../assets/slide.png';

/* props */
interface Props {
  target?: string // 位置信息：决定组件在页面的最终位置
  position?: string // top、bottom、middle
  titleText?: string
  onFail?: Function
  onSuccess?: Function
  // 图片（背景、滑块）获取，需要是一个可以返回图片地址的promise
  // 默认数组第一个是背景图、第二个是滑块图
  getImgSrc: () => Promise<string[]>
  // 结果校验
  checkResult: (data: string | number) => Promise<boolean>
}

const props = withDefaults(defineProps<Props>(), {
  target: '',
  position: 'middle',
  titleText: '请完成安全验证',
  getImgSrc: () => new Promise(resolve => resolve([])),
})

/* 子组件通过emit抛出事件 */
const emits = defineEmits(['testEmit']) // for test

function testEmit() { // for test
  emits('testEmit', 1)
}

/* data */
const context = getCurrentInstance() // 组件实例
let targetDom: HTMLElement | null = null

const imgSrc = reactive({
  slideBg: '',
  slide: '',
})

const isReady = ref(false)

const vetifyBodyPosition = ref({
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
})

let slideBgWidth = `${320}px`
let slideBgHeight = `${160}px`
let slideWidth = `${60}px`
let slideHeight = `${158}px`

const slideBlockLeft = ref('0px');
let blockInitialClientX = 0;
let moveX = 0;
let isSlideAllowed = true

let vetifyResult = false
const vetifyBlockText = ref('—>')
const vetifyBgColor = ref('#d69898')

/* lifeCycle */
onBeforeMount(async () => {
  await handleImageLoad()
  await nextTick()
  handleBodyPositon()
})

function handleBodyPositon() {
  if (props.target) {
    targetDom = document.body.querySelector(props.target)
  }
  if (targetDom) {
    const { top, left } = targetDom.getBoundingClientRect()
    const { offsetWidth, offsetHeight } = targetDom
    const vetifyBody: HTMLElement | null = context && context.refs['vetify-body'] as HTMLElement
    const vetifyBodyWidth = vetifyBody && vetifyBody.offsetWidth
    const vetifyBodyHeight = vetifyBody && vetifyBody.offsetHeight
    if (!vetifyBodyWidth || !vetifyBodyHeight)
      return
    // console.error(top, left, offsetWidth, offsetHeight)
    const finalLeft = left - ((vetifyBodyWidth - offsetWidth) / 2)
    let finalTop
    switch (props.position) {
      case 'top':
        finalTop = (top - vetifyBodyHeight) >= 0 ? (top - vetifyBodyHeight) : 0
        break;
      case 'bottom':
        finalTop = top + offsetHeight
        break;
      default:
        finalTop = top - ((vetifyBodyHeight - offsetHeight) / 2)
        break;
    }
    vetifyBodyPosition.value = {
      left: `${finalLeft}px`,
      top: `${finalTop}px`,
      transform: 'translate(0, 0)',
    }
  }
}

/* methods */
// 图片获取、加载
async function handleImageLoad() {
  const [slideBg = initialSlideBg, slide = initialSlide] = await props.getImgSrc()
  console.log('拉取图片')
  imgSrc.slideBg = slideBg
  imgSrc.slide = slide
  const imgsInfo = await loadImages([imgSrc.slideBg, imgSrc.slide])
  console.log(imgsInfo)
  slideBgWidth = `${imgsInfo[0].width}px`
  slideBgHeight = `${imgsInfo[0].height}px`
  slideWidth = `${imgsInfo[1].width}px`
  slideHeight = `${imgsInfo[1].height}px`
  isReady.value = true
}

function closeVetify() {
  console.log('close')
  const vetifyContainer = document.body.querySelector('#vetify-slide-container')
  if (vetifyContainer)
    vetifyContainer.remove();
}

async function resetVetify() {
  // 初始化变量
  imgSrc.slideBg = '';
  imgSrc.slide = '';
  slideBgWidth = `${320}px`
  slideBgHeight = `${160}px`
  slideWidth = `${60}px`
  slideHeight = `${158}px`
  slideBlockLeft.value = '0px'
  blockInitialClientX = 0
  moveX = 0
  isSlideAllowed = true
  vetifyResult = false
  vetifyBlockText.value = '——>'
  vetifyBgColor.value = '#d69898'

  await handleImageLoad()
}

const move = throttle((e: MouseEvent) => {
  // console.log(e)
  moveX = e.clientX - blockInitialClientX;
  const maxX = Number(slideBgWidth.replace(/px/, '')) - 60
  moveX = moveX > 0 ? (moveX > maxX ? maxX : moveX) : 0
  // console.log(e.clientX, blockInitialClientX)
  slideBlockLeft.value = `${moveX}px`
}, 50)

function onMousedown(e: MouseEvent) {
  if (!isSlideAllowed)
    return;
  blockInitialClientX = e.clientX;
  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', onDocumentMouseUp)
}

async function onDocumentMouseUp() {
  document.removeEventListener('mousemove', move)
  if (moveX === 0)
    return; // 滑块没移动时 不校验
  isSlideAllowed = false;
  vetifyResult = await props.checkResult(moveX);
  await changeBlockStyle(vetifyResult)
  isSlideAllowed = true;
}

async function changeBlockStyle(isPassed: boolean) {
  let cb = () => { }
  if (isPassed) {
    vetifyBlockText.value = '√'
    vetifyBgColor.value = 'green'
    cb = () => {
      // 关闭弹窗 执行成功回调
      closeVetify()
      props.onSuccess && props.onSuccess()
    }
  }
  else {
    vetifyBlockText.value = 'X'
    vetifyBgColor.value = 'red'
    cb = resetVetify
  }
  await delay(1500)
  cb();
}

function delay(time: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}
</script>

<template>
  <div ref="mask" class="mask" @click="testEmit" />
  <div v-show="isReady" ref="vetify-body" class="body" :style="vetifyBodyPosition">
    <header class="header">
      <div class="text">
        {{ props.titleText }}
      </div>
      <div class="close" @click="closeVetify">
        X
      </div>
    </header>
    <main class="main">
      <img :src="imgSrc.slideBg" alt="背景图" class="slide-bg">
      <img :src="imgSrc.slide" alt="滑块" class="slide">
    </main>
    <footer class="footer">
      <div class="progress-block" />
      <div class="slide-block" @mousedown="onMousedown">
        {{ vetifyBlockText }}
      </div>
    </footer>
  </div>
</template>

<style lang="less" scoped>
/* vue3 v-bind语法：https://www.jianshu.com/p/312b4d5bd9b8 */
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
  z-index: 9999;

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
      cursor: pointer;
      width: 60px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      background-color: v-bind(vetifyBgColor);
      transition: background-color 1s;
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
