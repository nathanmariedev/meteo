<!--
****************************************************************************************************
***                                          Radio                                               ***
****************************************************************************************************

Le composant radio est proche de celui en HTML5, c'est à dire une variable qui peut prendre 1 valeur.

*************
*** PROPS ***
*************
  - Value :
    C'est la valeur que prendra la variable dans v-model

    Exemple :
     <app-radio value="value1" v-model="answer">Label 1</app-radio>
     <app-radio value="value2" v-model="answer">Label 2</app-radio>
     <app-radio value="value3" v-model="answer">Label 3</app-radio>

-->
<template>
  <div class="app-radio">
      <label>
        <input type="radio"
          :checked="input === value"
          @change="onChange()"/>
        <span class="checkmark"></span>
        <slot></slot>
      </label>
  </div>
</template>

<script>

export default {
  model: {
    prop: 'input',
    event: 'input',
  },
  props: {
    input: [String, Array, Number],
    value: {
      type: String,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    onChange() {
      this.$emit('input', this.value);
    },
  },
};
</script>

<style lang="sass">
.app-radio
  display: inline-block
  label
    display: inline-block
    position: relative
    margin: 0 5px
    cursor: pointer
    user-select: none

    input
      position: absolute
      opacity: 0
      cursor: pointer
      height: 0
      width: 0

      &:checked ~ .checkmark:after
        background-color: $main-color
        border-color: transparent

      &:checked ~ .checkmark:after
        opacity: 1

    .checkmark
      display: inline-block
      margin-right: 5px
      height: 20px
      width: 20px
      border: 1px solid $light-color
      background: white
      border-radius: 50%
      transform: translateY(5px)
      &:after
        content: ""
        position: absolute
        opacity: 0
        left: 4px
        top: 4px
        width: 10px
        height: 10px
        border-radius: 50%
        transition: opacity ease-in-out 0.2s

</style>
