<template>
  <div class="home">
    <router-link :to="{ name: 'ui-kit' }">UI Kit Page</router-link>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router';

/**
 * A home page
 */
</script>

<style>
.home {
  padding: 2rem;
}
</style>
