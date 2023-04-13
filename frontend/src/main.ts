import { createApp } from 'vue';

import Basics from '../basics/index';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);
app.use(Basics);

app.mount('#app');
