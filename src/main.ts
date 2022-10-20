import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { setupStore } from './store'
import vetifyPlugin from './plugins/vetifyPlugin';
import './style/global.less';

const app = createApp(App);

app.use(vetifyPlugin)
// router
app.use(router);
// store
setupStore(app)

app.mount('#app');
