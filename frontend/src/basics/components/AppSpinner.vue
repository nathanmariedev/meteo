<template>
  <div class="app-spinner" :class="{ small }">
    <span :style="spinnerStyle"></span>
  </div>
</template>

<script>
export default {
  props: {
    small: Boolean,
  },

  computed: {
    spinnerStyle() {
      return { '--border': `${this.small ? 2 : 5}px solid` };
    },
  },
};
</script>

<style lang="sass">
.app-spinner
  position: relative
  width: 80px
  height: 80px

  &.small
    width: 1rem
    height: 1rem

  span
    display: block
    width: 100%
    height: calc(100% / 2)
    background-color: transparent
    border-top-left-radius: 100px
    border-top-right-radius: 100px
    border: var(--border)
    border-color: $main-color
    border-bottom: 0
    animation: rotate-animation 1s linear infinite
    transform-origin: bottom

@keyframes rotate-animation
  0%
    transform: rotate(0deg)

  100%
    transform: rotate(360deg)

</style>
