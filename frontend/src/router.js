import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Demo from './views/Demo.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/demo',
      name: 'demo',
      component: Demo,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    // Exemple de route pour une page connectée
    // {
    //   path: '/une-page-connectée',
    //   name: 'logged-page',
    //   meta: { requiresAuth: true },
    // }
  ],
});
