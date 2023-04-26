import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Home from './views/Home.vue';
import Main from './views/Main.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
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
    {
      path: '/main',
      name: 'main',
      component: Main,
    },
    // Exemple de route pour une page connectée
    // {
    //   path: '/une-page-connectée',
    //   name: 'logged-page',
    //   meta: { requiresAuth: true },
    // }
  ],
});
