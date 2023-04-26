<template>
<section id="app">
  <div class="logo">
    <app-title>WeatherApp</app-title>
  </div>
    <div class="buttons">
    <app-button :type="button" size="medium" @click="() => {redirectTo('login')}" >Register</app-button>
    <app-button :type="button" :size="large" look="second" @click="() => {redirectTo('register')}" >Login</app-button>
    </div>

    <!-- Global basics components integration -->
    <app-message/>
    <app-notifications/>
</section>
</template>

<script lang="ts">

export default {
methods: {
    redirectTo(where: string) {
    this.$router.push({ name: where });
    },
  },
};
</script>