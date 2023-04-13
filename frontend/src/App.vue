<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useDark } from '@vueuse/core';

// Check si un theme est dans le local storage ou le preferred color scheme du browser
const isDark = useDark();
</script>

<template>
  <RouterView />
  <app-notifications />
  <app-message />
</template>

<style>
@import '@/assets/_normalize.css';
@import '@/assets/_variables.css';
@import '@/assets/base.css';

#app {
  padding: 2rem;
}
</style>
