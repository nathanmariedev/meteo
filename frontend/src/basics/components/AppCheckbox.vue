<!--
****************************************************************************************************
***                                        Checkbox                                              ***
****************************************************************************************************

Le composant checkbox est proche de celui en HTML5, c'est à dire une variable qui peut prendre 0 à n valeurs.

Pour la gestion de réponses booléennes (vrai/faux), AppSwitch est plus adapté.

*************
*** PROPS ***
*************
  - Value :
    C'est la valeur que prendra la variable dans v-model

    Exemple :
    <app-checkbox :value="value1" v-model="answer1">{{ label1 }}</app-checkbox>
    <app-checkbox :value="value2" v-model="answer1">{{ label2 }}</app-checkbox>
    <app-checkbox :value="value3" v-model="answer1">{{ label3 }}</app-checkbox>

-->
<template>
  <div class="app-checkbox">
      <label>
        <input type="checkbox"
          :checked="Array.isArray(input) && input.includes(value)"
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
      let response = null;
      response = Array.isArray(this.input) ? this.input : [];

      if (response.includes(this.value)) {
        response.splice(response.indexOf(this.value), 1);
      } else {
        response.push(this.value);
      }
      this.$emit('input', response);
    },
  },
};
</script>

<style lang="sass">
.app-checkbox
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

      &:checked ~ .checkmark
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
      border-radius: 2px
      transform: translateY(5px)
      transition: background ease-in-out 0.2s
      &:after
        content: ""
        position: absolute
        opacity: 0
        left: 6px
        top: 2px
        width: 4px
        height: 8px
        border: solid white
        border-width: 0 3px 3px 0
        transform: rotate(45deg)
        transition: opacity ease-in-out 0.2s

</style>
