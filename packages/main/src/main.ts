import { createApp } from 'vue';
import { createPinia } from 'pinia';
import startQianKun, { actions } from '@/qiankun';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import router from './router';

import 'element-plus/dist/index.css';
import 'virtual:windi.css'; // windi Css
import '@/styles/index.scss';

import App from './App.vue';

const app = createApp(App);

app.use(createPinia()).use(router).use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount('#app');

// 注册 qiankun
startQianKun({ sandbox: { experimentalStyleIsolation: true } });
// qiankun 通信
actions.onGlobalStateChange((state, prevState) => {
  console.log(state, prevState);
});
