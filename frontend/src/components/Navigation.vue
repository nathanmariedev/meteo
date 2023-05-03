<template>
  <nav>
    <router-link :to="{ name: 'demo' }">Demo</router-link> |
    <router-link :to="{ name: 'login' }">Login</router-link> |
    <router-link :to="{ name: 'forgot-password' }">Forgot password</router-link> |
    <router-link :to="{ name: 'register' }">Register</router-link>
  </nav>
</template>

<script>
export default {
  name: 'navigation',
};
</script>

<style lang="sass">
nav
  padding: 2rem 0 0
  a
    font-weight: bold
    color: #2c3e50
    &.router-link-exact-active
      color: #42b983

</style>
