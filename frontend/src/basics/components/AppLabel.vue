<!--
****************************************************************************************************
***                                         Label                                                ***
****************************************************************************************************

Label de formulaire

*************
*** PROPS ***
*************
  - required :
    indication du mandatory (*)

  Exemple :
  <app-label>Prénom<app-label/>

-->
<template>
  <label class="app-label" :class="{ mandatory: required }"><slot></slot></label>
</template>

<script>
export default {
  props: {
    required: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="sass">
.app-label
  display: block
  padding: 0.7rem 0.1rem 0.3rem
  text-align: left
  font-size: 90%
  font-weight: bold
  text-transform: uppercase
  &.mandatory:after
    content: "*"
    display: inline-block
    font-size: 70%
    transform: translateX(0.3rem) translateY(-0.15rem)

</style>
