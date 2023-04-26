<template>
  <div class="main">
    <Header />
    <app-button size="small" type="button" look="main" @click="() => {redirectToPage('register')}">Register</app-button>
    <app-button size="small" type="button" look="second" @click="() => {redirectToPage('login')}">Login</app-button>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import { RouterLink } from 'vue-router';
import router from '@/router';
import auth from '@/services/auth';

const redirectToPage = (where: string) => {
  router.push({ name: where });
};
</script>

<style>
.home {
  padding: 2rem;
}
</style>
