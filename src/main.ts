import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { setupStore } from './store'
import vetifyPlugin from './plugins/vetifyPlugin';
import registerElementIcons from './config/elementIcon';

// import './style/global.less';
import './style/index.css';

const app = createApp(App);

app.use(vetifyPlugin)
// router
app.use(router);
// store
setupStore(app)
registerElementIcons(app);

app.mount('#app');
