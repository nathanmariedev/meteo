<!--
****************************************************************************************************
***                                          Card                                                ***
****************************************************************************************************

Exemple de composant carte

*************
*** PROPS ***
*************
  - title

  - text

  - image

  Exemple :
  <app-card
    title="Lorem Ipsum"
    text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, deserunt."
    :image="image"/>

-->
<template>
  <div class="app-card">
      <div class="image-container">
        <img :src="image" :alt="title">
      </div>
      <div class="container">
        <h3>{{ title }}</h3>
        <p>{{ text }}</p>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
    },
    title: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style lang="sass">
.app-card
  border-radius: $global-border-radius
  overflow: hidden
  background: white
  box-shadow: 0 0 10px rgba(0,0,0,0.1)

  .image-container
    position: relative
    height: 200px
    overflow: hidden
    img
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      margin: auto
      min-width: 100%
      min-height: 100%

  .container
    padding: 1rem
    min-height: 200px
    h3
      font-size: 1rem
      font-weight: bold
    p
      font-size: 0.8rem

</style>
