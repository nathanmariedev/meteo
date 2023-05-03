<!--
****************************************************************************************************
***                                         Title                                                ***
****************************************************************************************************

Titre

  Exemple :
  <app-title>Titre<app-title/>

-->
<template>
  <h1 class="app-title"><slot></slot></h1>
</template>

<script>
export default {
};
</script>

<style lang="sass">
.app-title
  display: inline-block
  position: relative
  margin: 0.2rem auto
  padding: 0.5rem 0
  font-weight: bold
  font-size: 3rem
  text-align: center
  color: $main-color
  background: linear-gradient(to right, $main-color, #335aea)
  -webkit-background-clip: text
  -webkit-text-fill-color: transparent
</style>
