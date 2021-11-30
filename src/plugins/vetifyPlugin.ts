import VetifyClick from '../components/VetifyClick.vue';
import { createApp } from 'vue';
import { vetifyOptions } from '../utils/vetify';

// https://v3.cn.vuejs.org/guide/migration/global-api.html#vue-extend-%E7%A7%BB%E9%99%A4
// Vue.extend 移除

export default {
  install(vue: any) {
    console.log(vue);
    vue.config.globalProperties.$showVetify = function (
      options: vetifyOptions
    ) {
      const Vetify = createApp(VetifyClick);
      const container = document.createElement('div');
      const vertifyInstance = Vetify.mount(container);
      document.body.appendChild(vertifyInstance.$el);
    };
  }
};
