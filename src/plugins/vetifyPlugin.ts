import type { App } from 'vue';
import { createApp } from 'vue';
import VetifyClick from '../components/VetifyClick.vue';
import { $vetify } from '../utils/context';

export default {
  install(vue: App) {
    const Vetify = createApp(VetifyClick, { msg: '1' });
    const container = document.createElement('div');
    container.id = 'vetify';
    document.body.appendChild(container);
    /*
    mount区别: https://v3.cn.vuejs.org/guide/migration/mount-changes.html#%E6%A6%82%E8%BF%B0
    vue2: 替换目标元素
    vue3: 替换目标元素的innerHTML
     */
    Vetify.mount(container);
    // 组件实例expose的方法和属性
    vue.provide($vetify, Vetify._instance?.exposed);
  },
};
