<template>
  <section class="login">
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit()">
      <p>
        <label for="email">Email</label>
        <app-input id="email" type="email" v-model="auth.email" placeholder="email" />
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

const auth = ref<Auth>({
  email: '',
  password: '',
});

const handleSubmit = async () => {
  // TODO la validation commune front/back
  try {
    await authService.login(auth.value);
    message({
      title: 'Login succesful',
      text: 'Yes! Welcome to the logged-in part of this app!',
    });
  } catch (error) {
    message({
      title: 'Login failed',
      text: 'Sorry, we were unable to log you in. Please check your email and password and try again. If you have forgotten your password, you can reset it by clicking the "Forgot password" button.',
    });
    throw error;
  }
};
</script>

<style lang="postcss">
.login {
  padding: 2rem;
  & label {
    display: block;
  }
}
</style>
