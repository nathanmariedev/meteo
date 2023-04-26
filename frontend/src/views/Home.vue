<template>
<section id="app">
  <div class="logo">
    <Storm />
    <app-title>WeatherApp</app-title>
  </div>
    <div class="buttons">
    <app-button :type="button" size="medium" @click="() => {redirectTo('register')}" >Register</app-button>
    <app-button :type="button" :size="large" look="second" @click="() => {redirectTo('login')}" >Login</app-button>
    </div>

    <!-- Global basics components integration -->
    <app-message/>
    <app-notifications/>
</section>
</template>

<script>
import Storm from '@/assets/img/weatherIcons/storm.svg';

export default {
  components: {
    Storm,
  },
  methods: {
    redirectTo(where) {
      this.$router.push({ name: where });
    },
  },
};
</script>
<style lang="sass">
#app
  background: $background-dark
</style>
