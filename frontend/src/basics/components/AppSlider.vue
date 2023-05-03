<!--
****************************************************************************************************
***                                          Slider                                              ***
****************************************************************************************************

Composant slider

*************
*** PROPS ***
*************
  - min
    minimum

  - max
    maximum

  - unit
    unité affichée

  - showValue
    valeur affichée

  - disabled
    actif ou non

    Exemple :
    <app-slider :min="0" :max="10" :unit="cm" :showValue="false" :disabled="true" v-model="answer7"/>

-->
<template>
  <div class="app-slider">
    <div class="slider one" :class="{ disabled: disabled }" v-if="value || value === 0">
      <input
        type="range"
        :value="value"
        @input="$emit('input', parseInt($event.target.value, 10))"
        :min="min"
        :max="max"
        :disabled="disabled"
      />
      <div class="progress" :style="{ width: `${((this.value - this.min) * 100) / (this.max - this.min)}%` }"></div>
    </div>
    <div class="slider two" v-else :class="{ disabled: disabled }">
      <input
        type="range"
        :value="0"
        @input="$emit('input', parseInt($event.target.value, 10))"
        :min="min"
        :max="max"
        :disabled="disabled"
      />
      <div class="progress" :style="{ width: '0%' }"></div>
    </div>
    <div class="value" v-if="showValue">
      <span v-if="value || value === 0">{{  value }}</span>
      <span v-else>{{ ' - ' }}</span>
      <span>{{ unit }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      default: 0,
      type: Number,
    },
    min: {
      default: 0,
      type: Number,
    },
    max: {
      default: 100,
      type: Number,
    },
    unit: {
      default: '%',
      type: String,
    },
    showValue: {
      default: true,
      type: Boolean,
    },
    disabled: {
      default: false,
      type: Boolean,
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
.app-slider
  display: flex
  align-items: center
  justify-content: flex-start
  .value
    background-color: white
    display: flex
    align-items: center
    justify-content: center
    width: fit-content
    border-radius: 4px
    border: 1px solid $light-color
    margin-left: 10px
    span
      padding: 0.5rem 0.5rem 0.5rem
      &:first-child
        border-right: 1px solid $light-color
  .slider
    background-color: $light-color
    width: 100%
    max-width: 400px
    border-radius: 15px
    position: relative
    height: 7px
    &.disabled
      opacity: 0.6
      ::-webkit-slider-thumb
        cursor: initial
      ::-moz-range-thumb
        cursor: initial
    ::-webkit-slider-thumb
      -webkit-appearance: none
      appearance: none
      width: 15px
      height: 15px
      background: white
      border: $main-color 1px solid
      border-radius: 10px
      cursor: pointer
    ::-moz-range-thumb
      width: 15px
      height: 15px
      background: white
      border: $main-color 1px solid
      border-radius: 10px
      cursor: pointer
    .progress
      position: absolute
      background: $main-color
      height: 100%
      z-index: 0
      top: 0
      border-radius: 15px
    input
      font-size: $global-font-size
      border-radius: $global-border-radius
      transition: all 0.2s ease-in-out
      -webkit-appearance: none
      margin: 0
      height: 100%
      width: 100%
      padding: 0
      display: block
      background-color: transparent
      z-index: 1
      position: absolute
      &:focus
        outline: 0
</style>
