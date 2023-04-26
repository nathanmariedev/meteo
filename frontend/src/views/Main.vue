<template>
  <section class="main">
    <div class="grid">
        <app-title>HI!</app-title>
        <SideNav />
        <router-view/>
    </div>
  </section>
</template>
<style lang="sass">
#main
  $vertScreen: 100vh
  height: $vertScreen
  background-color: #aaa

</style>
