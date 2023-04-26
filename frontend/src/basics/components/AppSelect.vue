<!--
****************************************************************************************************
***                                         Select                                               ***
****************************************************************************************************

Composant select, il gère :
 - la recherche / filtre des résultats
 - le déplacement aux fleches haute et basse avec validation du résultat avec entrée
 - le clic en dehors qui ferme le select (directive clickOutside)
 - select multiple ou non

*************
*** PROPS ***
*************

  - options :
    Les valeurs d'options sont un tableau d'objet contenent un label et un clé
    sous le format { name: 'aaa', label: 'bbb' }

  - multiple :
    select multiple ou non

  Exemple :
  <app-select
    :options="[{ name: 'lorem', label: 'Lorem Ipsum'}, { name: 'lorem', label: 'Lorem Ipsum'}]"
    :multiple="true"
    v-model="selectValue"/>

-->
<template>
  <div class="app-select" :class="{ open: isOpen }">
    <div class="box" @click="isOpen = !isOpen, $refs.select.focus()">
      <input type="text" class="filter" :class="{ visible : filter.length > 0}"
        ref="select"
        @keydown.down="keyDown()"
        @keydown.up="keyUp()"
        @keydown.enter="onChange(preselectedOption)"
        v-model="filter">

      <span v-if="filter.length === 0">
        <slot v-if="multiple">
          <span class="result" v-for="result in value" :key="`result${result}`">
            {{ options.find(o => o.name === result)['label'] }}
            <span class="remove" @click.stop="clearValue(result)">✕</span>
          </span>
        </slot>
        <slot v-else>
          <span class="result" v-if="options.find(o => o.name === value)">
            {{ options.find(o => o.name === value)['label'] }}
            <span class="remove" @click.stop="clearValue()">✕</span>
          </span>
        </slot>
      </span>

      <span v-if="!value || value.length === 0" class="empty">Choisir</span>
    </div>

    <transition name="select">
      <ul v-if="isOpen" class="options"
        v-click-outside="closeSelect"
        ref="optionsBox"
        >
          <li v-for="option in filteredOptions"
            :key="option.name"
            :ref="`option${option.name}`"
            :class="{ selected: option.name === value || (value && value.includes(option.name)), preselected: option.name === preselectedOption }"
            @click="onChange(option.name)"
            @mouseenter="preselectedOption = option.name">{{ option.label }}</li>
          <li v-if="filteredOptions.length === 0" @click="isOpen = false">Aucun résultat</li>
      </ul>
    </transition>

    <select :value="value" v-bind="$attrs">
      <option v-for="option in options" :key="option.name" :value="option.name" >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
import clickOutside from '../utils/clickOutside';

export default {
  props: {
    value: [String, Array],
    options: Array,
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpen: false,

      preselectedOption: null,
      filter: '',

    };
  },
  computed: {
    filteredOptions() {
      return this.options.filter((o) => o.label.includes(this.filter));
    },
  },
  directives: {
    clickOutside,
  },
  watch: {
    isOpen: 'scrollAuto',
    filter: 'openOptions',
  },
  methods: {
    closeSelect() {
      this.$refs.select.focus();
      this.isOpen = false;
    },
    keyDown() {
      if (this.isOpen) {
        const index = this.filteredOptions.indexOf(this.filteredOptions.find((o) => o.name === this.preselectedOption));
        this.preselectedOption = this.filteredOptions[Math.min(this.filteredOptions.length - 1, index + 1)].name;
      }
      this.isOpen = true;
      this.scrollAuto();
    },
    keyUp() {
      if (this.isOpen) {
        const index = this.filteredOptions.indexOf(this.filteredOptions.find((o) => o.name === this.preselectedOption));
        this.preselectedOption = this.filteredOptions[Math.max(0, index - 1)].name;
      }
      this.isOpen = true;
      this.scrollAuto();
    },
    updateValue(val) {
      if (this.multiple) {
        let response = null;
        response = Array.isArray(this.value) ? this.value : [];

        if (response.includes(val)) {
          response.splice(response.indexOf(val), 1);
        } else {
          response.push(val);
        }
        this.$emit('input', response);
      } else {
        this.$emit('input', val);
      }
    },
    onChange(val) {
      this.updateValue(val);
      this.preselectedOption = val;
      if (!this.multiple) {
        this.isOpen = false;
        this.$refs.select.focus();
      }
    },
    scrollAuto() {
      if (this.isOpen && this.preselectedOption) {
        // On attend la prochaine maj du dom pour faire scroller le dom de la box d'options (lié au v-if sur options)
        this.$nextTick(() => {
          this.$refs.optionsBox.scrollTo(0, this.$refs[`option${this.preselectedOption}`][0].offsetTop);
        });
      } else {
        this.filter = '';
      }
    },
    openOptions() {
      if (this.filter.length > 0) this.isOpen = true;
    },
    clearValue(val) {
      if (!this.multiple) {
        this.$emit('input', null);
        this.isOpen = false;
        this.$refs.select.focus();
      } else {
        this.onChange(val);
      }
    },
  },
};
</script>

<style lang="sass">
.app-select
  position: relative
  max-width: 400px
  background: white
  text-align: left
  border: 1px solid $light-color
  border-radius: $global-border-radius
  transition: all 0.2s ease-in-out
  cursor: pointer
  &:hover
    border-color: darken($light-color, 10%)
  &:focus
    outline: 0
    border-color: $main-color
  &.open
    border-color: $main-color
    border-radius: $global-border-radius $global-border-radius 0 0
    .box:after
      transform: rotate(45deg)
      border-color: $main-color

  select
    display: none

  .box
    position: relative
    padding: 0.7rem 1rem 0.55rem
    .filter
      width: 0
      outline: 0 !important
      border: 0 !important
      opacity: 0
      margin-left: -4px
      &.visible
        margin-left: 0.2rem
        width: 200px
        opacity: 1
    &:after
      content: ""
      position: absolute
      top: 50%
      right: 15px
      margin-top: -2px
      width: 5px
      height: 5px
      border: solid $text-color
      border-width: 0 1px 1px 0
      transform-origin: center
      transform: rotate(-45deg)
      transition: all 0.2s ease-in-out
      &:hover
        border-color: darken($light-color, 10%)

    .result
      display: inline-flex
      margin: 0.2rem 0.4rem 0.2rem 0
      padding: 0.4rem 0.7rem 0.15rem
      font-size: 0.9rem
      background: lighten($light-color, 5%)
      .remove
        padding: 0.2rem 0.05rem 0.2rem 0.5rem
        color: $text-color
        font-size: 0.8rem
        cursor: pointer

    .empty
      display: inline-flex
      padding: 0.4rem 0 0.3rem

  .options
    position: absolute
    top: 100%
    left: -1px
    right: -1px
    margin: 0
    padding: 0
    max-height: 200px
    list-style-type: none
    background: white
    border: 1px solid $main-color
    border-top-color: $light-color
    border-radius: 0 0 $global-border-radius
    overflow: hidden
    overflow-y: scroll
    z-index: 200
    li
      padding: 0.6rem 1rem
      transition: all 0.2s ease-in-out
      &.selected
        color: $second-color
        font-weight: bold
      &.preselected
        background: lighten($light-color, 5%)

.select-enter-active, .select-leave-active
  transition: all 0.25s ease-in-out

.select-enter, .select-leave-to
  opacity: 0
  transform: translateY(-10px)

</style>
