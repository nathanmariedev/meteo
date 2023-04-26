<!--
****************************************************************************************************
***                                         Switch                                              ***
****************************************************************************************************

Composant switch qui est un composant avec une réponse true quand il est actif
et à false quand il est inactif.

Son rendu peut tout à fait être visuellement différent.

  Exemple :
    <app-switch v-model="answer"/>

-->
<template>
  <div class="app-switch">
      <label>
        <span class="switch">
          <input type="checkbox"
          :checked="input"
          @change="$emit('input', $event.target.checked)"/>
          <span class="slider"></span>
        </span>
        <span class="label"><slot></slot></span>
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
    input: [Boolean],
  },
};
</script>

<style lang="sass">
.app-switch
  display: inline-block

  label
    display: inline-block
    position: relative
    margin: 0 5px
    cursor: pointer
    user-select: none

  .switch
    position: relative
    display: inline-block
    width: 40px
    height: 24px

  .label
    display: inline-block
    padding: 5px
    vertical-align: middle

  input
    opacity: 0
    width: 0
    height: 0

  .slider
    position: absolute
    cursor: pointer
    top: 0
    left: 0
    right: 0
    bottom: 0
    background-color: $light-color
    border-radius: 28px
    transition: .4s
    transition: .4s

  .slider:before
    position: absolute
    content: ""
    height: 16px
    width: 16px
    left: 4px
    bottom: 4px
    background-color: white
    border-radius: 28px
    transition: .4s

  input:checked + .slider
    background-color: $main-color

  input:focus + .slider
    box-shadow: 0 0 1px $main-color

  input:checked + .slider:before
    transform: translateX(16px)

</style>
