<!--
****************************************************************************************************
***                                           Tabs                                               ***
****************************************************************************************************

Composant de tabs, la gestion de tabs avec des routes est à priviligier.

*************
*** PROPS ***
*************
  - tabs
    C'est un tableau de propriétés pour les Tabs le format [{ label: 'Tab1', route: routeTab1 }]

    Exemple :
    <app-tab :tabs="[
      { label: 'Infos', route: { name: 'informations', params: { id: 453-324 } } },
      { label: 'Actions', route: { name: 'actions', params: { id: 453-324 } } }]" />

-->
<template>
  <div class="app-tabs">
    <router-link class="tab"
      v-for="tab in tabs"
      :key="`tab-${tab.label}`"
      :to="tab.route">
        {{ tab.label }}
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
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
.app-tabs
  display: inline-flex
  align-items: center
  .tab
    margin: 0 0.1rem 0 0
    padding: 1rem 2rem 0.8rem
    color: $text-color
    background: lighten($light-color, 8%)
    border-radius: $global-border-radius $global-border-radius 0 0
    transition: all ease-in-out 0.25s
    border-bottom: 2px solid lighten($light-color, 8%)
    &:hover
      background: lighten($light-color, 10%)
      border-color: $light-color
    &.router-link-active
      color: $main-color
      font-weight: bold
      background: lighten($light-color, 5%)
      border-color: $main-color

</style>
