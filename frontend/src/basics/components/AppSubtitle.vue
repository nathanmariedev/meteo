<!--
****************************************************************************************************
***                                       Subtitle                                               ***
****************************************************************************************************

Titre secondaire

  Exemple :
  <app-subtitle>Titre 2<app-subtitle/>

-->
<template>
  <h2 class="app-subtitle"><slot></slot></h2>
</template>

<script>
export default {
};
</script>

<style lang="sass">
.app-subtitle
  position: relative
  padding: 0.5rem 0
  text-transform: uppercase
  font-weight: bold
  font-size: 1.5rem
  text-align: left
</style>
