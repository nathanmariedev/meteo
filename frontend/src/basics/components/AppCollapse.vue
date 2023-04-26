<!--
****************************************************************************************************
***                                      Collapse                                                ***
****************************************************************************************************

Collapse

*************
*** PROPS ***
*************

  Exemple :
  <app-collapse v-model="activeTab" :name="1" title="Lorem 1">
    Lorem Ipsum
  <app-collapse/>

  <app-collapse v-model="activeTab" :name="2" title="Lorem 2">
    Lorem Ipsum
  <app-collapse/>

  <app-collapse v-model="activeTab" :name="3" title="Lorem 3">
    Lorem Ipsum
  <app-collapse/>

-->
<template>
  <div class="app-collapse" :class="{ open: input === name }">
    <div class="header" @click="onChange()">{{ title }}</div>
    <div class="content" ref="content" :style="{ height: input === name ? `${$refs.content.scrollHeight}px` : 0 }">
      <div><slot></slot></div>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'input',
    event: 'input',
  },
  props: {
    input: [String, Number],
    name: [String],
    title: [String],
  },
  methods: {
    onChange() {
      this.$emit('input', this.name === this.input ? null : this.name);
    },
  },
};
</script>

<style lang="sass">
.app-collapse
  .header
    padding: 1rem
    background: lighten($light-color, 8%)
  .content
    overflow: hidden
    transition: all 0.3s linear
    > div
      padding: 1rem
</style>
