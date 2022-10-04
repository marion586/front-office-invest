import { createApp } from 'vue';
// import * as VueRouter from "vue-router";

// import { Inkline, components } from '@inkline/inkline';
// import "@inkline/inkline/inkline.scss";

import 'ant-design-vue/dist/antd.css';
import './style.css';
import './style.scss';

import App from './App.vue';
import router from './routes';
import store from './store';

const app = createApp(App);

app.use(router);
app.use(store);
// app.use(VueRouter);
// app.use(Inkline, {
//     components,
// });

app.mount('#app');
