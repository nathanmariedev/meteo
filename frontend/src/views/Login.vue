<template>
  <section class="login">
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit()">
      <p>
        <label for="email">Username</label>
        <app-input id="userName" v-model="auth.userName" placeholder="username" type="" />
      </p>
      <p>
        <label for="password">Password</label>
        <app-input id="password" type="password" v-model="auth.password" placeholder="password" />
      </p>
      <app-button type="submit">Log</app-button>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import authService from '@/services/auth';
import type Auth from '@/types/auth';
import { message } from '@basics/utils/useMessage';
import router from '@/router';
import { notification } from '@basics/utils/useNotification';

const auth = ref<Auth>({
  userName: '',
  password: '',
  mainCity: '',
});

const handleSubmit = async () => {
  // TODO la validation commune front/back
  try {
    await authService.login(auth.value);
    router.push({ name: 'home' });
    notification('☀️  Authentification réussie! ');
  } catch (error) {
    notification(`🌧️  Oups! Nom d'utilisateur ou/et mot de passe incorect... `);
    throw error;
  }
};
</script>

<style>
.login {
  padding: 2rem;
}
.login.label{
  display: block;
}
</style>
