<template>
  <section id="app">
    <div class="logo">
      <app-title>WeatherApp</app-title>
    </div>
    <div class="buttons">
      <app-button :type="button" size="medium" >Register</app-button>
      <app-button :type="button" :size="large" look="second" >Login</app-button>
    </div>
    <router-view/>

    <!-- Global basics components integration -->
    <app-message/>
    <app-notifications/>
  </section>
</template>

<script>

</script>
<style lang="sass">
@import "@/assets/sass/app.sass"

#app
  $vertScreen: 90vh
  text-align: center
  height: $vertScreen
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
