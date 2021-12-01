import VetifyClick from '../components/VetifyClick.vue';
import { createApp, App } from 'vue';

// https://v3.cn.vuejs.org/guide/migration/global-api.html#vue-extend-%E7%A7%BB%E9%99%A4
// Vue.extend 移除、使用createApp

export default {
  install(vue: App) {
    const Vetify = createApp(VetifyClick);
    const container = document.createElement('div');
    container.id = 'vetify'
    document.body.appendChild(container);
    /* 
    mount区别: https://v3.cn.vuejs.org/guide/migration/mount-changes.html#%E6%A6%82%E8%BF%B0
    vue2: 替换目标元素
    vue3: 替换目标元素的innerHTML
     */
    Vetify.mount(container);
    // 将组件实例暴露出去，在任何组件内都可访问到
    vue.provide('$vetify', Vetify._instance);
  }
};
