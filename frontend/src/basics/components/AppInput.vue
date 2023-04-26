<!--
****************************************************************************************************
***                                         Input                                               ***
****************************************************************************************************

Champ texte simple ou multiligne

*************
*** PROPS ***
*************
  - type :
    Type du champ

  Exemple :
  <app-input type="text" v-model="answer4"/>
  <app-input type="textarea" v-model="answer4"/>

-->
<template>
  <textarea v-if="type === 'textarea'" class="app-input" contenteditable="true"
    :value="value"
    @select="select($event)"
    @input="$emit('input', $event.target.value)">
    </textarea>
  <input v-else class="app-input"
    :type="type"
    :value="value"
    :autocomplete="autocomplete"
    @input="$emit('input', $event.target.value)"/>
</template>

<script>
export default {
  props: {
    value: [String, Array, Number],
    type: {
      default: 'text',
      validator: (val) => ['text', 'number', 'email', 'password', 'textarea'].indexOf(val) !== -1,
    },
    autocomplete: {
      default: 'off',
    },
  },
  computed: {
    input() {
      return this.value;
    },
  },
};
</script>

<style lang="sass">
.app-input
  width: 100%
  max-width: 400px
  padding: 0.7rem 1rem 0.6rem
  background: white
  font-size: $global-font-size
  border-radius: $global-border-radius
  border: 1px solid $light-color
  transition: all 0.2s ease-in-out
  &:hover
    border-color: darken($light-color, 10%)
  &:focus
    outline: 0
    border-color: $main-color

</style>
