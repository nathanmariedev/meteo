<!--
****************************************************************************************************
***                                      Modale                                                 ***
****************************************************************************************************

Composant modale simple

*************
*** PROPS ***
*************
  - show :
    paramètre indiquant la visibilité de la modale

  Exemple :
  <app-modal :show.sync="isModalVisible">
    <app-subtitle>Modale</app-subtitle>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, molestiae aut. Eveniet ab aperiam laboriosam debitis, repellendus natus ex nostrum repudiandae nulla sapiente optio, blanditiis animi necessitatibus? Libero, ex explicabo?</p>
    <app-button @click="isModalVisible = false">Fermer</app-button>
  </app-modal>

-->
<template>
  <div>
    <transition name="modal">
    <div class="modal-wrapper" v-if="visible">
      <slot></slot>
    </div>
    </transition>
    <transition name="screen">
      <div class="modal-screen" v-if="visible" @click="$emit('update:show', false)"></div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    visible() {
      return this.show;
    },
  },
  watch: {
    show: 'updateScroll',
  },
  beforeDestroy() {
    document.documentElement.style.overflow = 'auto';
  },
  methods: {
    updateScroll() {
      document.documentElement.style.overflow = this.show ? 'hidden' : 'auto';
    },
  },
};
</script>

<style lang="sass">
.modal-wrapper
  position: fixed
  top: 50%
  left: 50%
  width: 95%
  max-width: 700px
  height: 95%
  max-height: 500px
  padding: 1rem
  background: white
  border-radius: $global-border-radius
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1)
  z-index: 1000
  transform: translate(-50%, -50%)

.modal-screen
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  background: rgba(0,0,0,0.4)
  z-index: 800

.screen-enter-active
  transition: opacity .9s

.screen-leave-active
  transition: opacity .3s

.screen-enter, .screen-leave-to
  opacity: 0

.modal-enter-active, .modal-leave-active
  transition: transform .2s, opacity .2s, scale 0.15s ease-in-out

.modal-enter, .modal-leave-to
  opacity: 0
  transform: translateY(-130px) translateX(-50%) scale(0.9)

</style>
