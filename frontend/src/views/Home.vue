<template>
<section id="app">
  <div class="logo">
    <img src="./../../public/weatherIcons/storm.svg" />
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

export default {
  methods: {
    redirectTo(where) {
      this.$router.push({ name: where });
    },
  },
};
</script>
