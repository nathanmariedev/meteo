<!--
****************************************************************************************************
***                                         Button                                               ***
****************************************************************************************************

Un bouton pour toutes les occasions.

*************
*** PROPS ***
*************
  - type : button ou submit
    Type du bouton

  - size : small ou medium ou large
    Taille du bouton

  - look : primary ou second
    Style du bouton

  - loading
    Présence du loader ou non

  Exemple :
  <app-button size="small" look="second" :loading="true">Bouton petit avec loader</app-button>
-->
<template>
  <button class="app-button" :type="type" :class="[size, look]" @click="handleClick">
    <span v-if="loading" class="loader">
      <span></span>
      <span></span>
      <span></span>
    </span>
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      default: 'button',
      validator: (val) => ['button', 'submit'].indexOf(val) !== -1,
    },
    size: {
      default: 'medium',
      validator: (val) => ['small', 'medium', 'large'].indexOf(val) !== -1,
    },
    look: {
      default: 'primary',
      validator: (val) => ['primary', 'second'].indexOf(val) !== -1,
    },
    loading: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    handleClick(evt) {
      if (!this.loading) {
        this.$emit('click', evt);
      }
    },
  },
};
</script>

<style lang="sass">
.app-button
  display: inline-flex
  align-items: center
  margin: 0.2rem
  padding: 1rem 1.8rem 0.9rem
  background: $main-color
  color: white
  border: 0
  border-radius: $global-border-radius
  text-transform: uppercase
  font-size: 1.1rem
  transition: all ease-in-out 0.2s
  cursor: pointer

  &:hover
    background: darken($main-color, 5%)

  &:focus
    outline: 0

  &.light
    background: $light-color
    color: $text-color
    &:hover
      background: darken($light-color, 5%)

  &.second
    background: $second-color
    color: white
    &:hover
      background: darken($light-color, 5%)
      background: darken($second-color, 5%)

  &.small
    padding: 0.6rem 1.4rem 0.5rem
    font-size: 0.85rem
  &.large
    padding: 1.4rem 1.4rem 1.1rem
    font-size: 1.2rem

  .loader
    display: inline-block
    position: relative
    width: 40px
    height: 8px

  .loader span
    display: inline-block
    position: absolute
    left: 0
    width: 5px
    background: #fff
    animation: loader 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite

  .loader span:nth-child(1)
    left: 0
    animation-delay: -0.24s

  .loader span:nth-child(2)
    left: 10px
    animation-delay: -0.12s

  .loader span:nth-child(3)
    left: 20px
    animation-delay: 0

  @keyframes loader
    0%
      top: 0
      height: 180%

    50%, 100%
      top: 0
      height: 100%

</style>
