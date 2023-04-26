<!--
****************************************************************************************************
***                                       Datepicker                                             ***
****************************************************************************************************

Composant datepicker, configuré par défaut en fr

*************
*** PROPS ***
*************
  pas de props autre que le v-model

  Exemple :
  <app-datepicker v-model="answer5"/>

-->
<template>
  <datepicker class="app-datepicker"
    :value="input"
    :language="languages['fr']"
    @selected="onSelect"
    clear-button></datepicker>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import * as lang from 'vuejs-datepicker/src/locale';

export default {
  components: {
    Datepicker,
  },
  props: {
    value: [Date],
  },
  data() {
    return {
      languages: lang,
    };
  },
  computed: {
    input() {
      return this.value;
    },
  },
  methods: {
    onSelect(val) {
      this.$emit('input', val);
    },
  },
};
</script>

<style lang="sass">
.app-datepicker
  position: relative
  display: inline-block
  width: 100%
  max-width: 400px
  input
    width: 100%
    padding: 0.75rem 1rem 0.6rem
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

  .vdp-datepicker__calendar .cell.selected
    background: $main-color
  .vdp-datepicker__clear-button, .vdp-datepicker__calendar-button
    position: absolute
    top: 50%
    right: 10px
    margin-top: -10px
</style>
