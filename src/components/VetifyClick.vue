<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount, nextTick, provide } from 'vue'
import Vetify from '../utils/vetify'
import { vetifyOptions } from '../utils/vetify'

interface showVetifyOptions extends vetifyOptions {
  target?: string,
  position?: string
}

// 定义props
const props = defineProps<{ msg?: string }>()

let vetifyInstance: any = null;
let maskVisible = ref(false);
let mainVisible = ref(false);

// 暴露组件属性或方法
defineExpose({
  hiddenVetify,
  showVetify
})

function hiddenVetify() {
  maskVisible.value = false;
  mainVisible.value = false;
  vetifyInstance && vetifyInstance.destroy();
}
/**  
* @param target 目标dom
* @param position 在目标的哪个位置
* 
*/
function showVetify(
  {
    target = '',
    position = '',
    ...vetifyInstanceOptions
  }: showVetifyOptions
) {
  const { onSuccess = () => { } } = vetifyInstanceOptions;
  const finalSuccessFn = () => {
    hiddenVetify()
    onSuccess()
  }
  vetifyInstanceOptions.onSuccess = finalSuccessFn;
  vetifyInstance = new Vetify({ ...vetifyInstanceOptions } as vetifyOptions)
  console.log(target, position);
  // TODO
  // 1. 根据target/positon 确定验证码显示的最终位置
  // 2. 验证码出现/消失 加动画
  maskVisible.value = true;
  mainVisible.value = true;
}

function onReset() {
  vetifyInstance && vetifyInstance.reset()
}

onMounted(async () => {
  console.log('props.msg', props.msg)
})

onBeforeUnmount(() => {
  vetifyInstance && vetifyInstance.destroy()
})

</script>

<template>
  <div class="mask" v-show="maskVisible"></div>
  <div class="main" v-show="mainVisible">
    <div id="vetify-title"></div>
    <div id="vetify-container"></div>
    <div id="vetify-footer">
      <button @click="onReset">刷新</button>
      <button @click="hiddenVetify">关闭</button>
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
  opacity: 0.5;
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
