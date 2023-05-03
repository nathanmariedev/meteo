import Vue from 'vue';
import dayjs from 'dayjs';
import App from './App.vue';
import router from './router';

import Basics from './basics/index';

Vue.config.productionTip = false;

Vue.config.errorHandler = (err) => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

Vue.use(Basics);

Vue.prototype.$dayjs = dayjs;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
