import { createApp } from 'vue';
import 'ant-design-vue/dist/antd.css';
import './style.css';
import './style.scss';

import App from './App.vue';
import router from './routes';
import store from './store';
import '@stripe/stripe-js';

const app = createApp(App);

// router.beforeEach(() => {
//     store.commit('global/setLoading', true);
//     console.log('start');
// });

// router.afterEach(() => {
//     console.log('end');
//     store.commit('global/setLoading', false);
// });

app.use(router);
app.use(store);
app.mount('#app');
