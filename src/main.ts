import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vetifyPlugin from './plugins/vetifyPlugin';
import './style/global.less';

const app = createApp(App);

app.use(vetifyPlugin)
app.use(router);

app.mount('#app');
