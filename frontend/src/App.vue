<template>
  <section id="app">
    <router-view/>
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
<style lang="sass">
@import "@/assets/sass/app.sass"

#app
  text-align: center
  min-height: 100vh
  color: #2c3e50
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  .logo
    text-align: center
    img
      display: block
      margin: 2rem auto
      width: 100%
      max-width: 200px
</style>
