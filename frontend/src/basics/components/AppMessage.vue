<!--
****************************************************************************************************
***                                      Message                                                 ***
****************************************************************************************************

  Modale de message avec possibilité de répondre (proche du confirm javascript)

  Peut être appelé dans n'importe quel composant avec une fonction.

  Exemple :
  this.$message.show({
    title: 'Lorem',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero aperiam repellendus officiis optio eum error cupiditate ad explicabo eveniet!',
    onConfirm: () => {
      this.closeModal();
    },
  });

-->
<template>
  <div>
    <transition name="message">
    <div class="message-wrapper" v-if="visible">
      <h2>{{ title }}</h2>
      <p>{{ text }}</p>
      <div class="message-buttons">
        <app-button v-if="hasCancel" class="light" @click="hide">{{ cancelText }}</app-button>
        <app-button @click="confirm">{{ confirmText }}</app-button>
      </div>
    </div>
    </transition>
    <transition name="screen">
      <div class="message-screen" v-if="visible" @click="hide()"></div>
    </transition>
  </div>
</template>

<script>
import AppEvent from '../utils/AppEvent';

export default {
  data() {
    return {
      visible: false,
      title: '',
      text: '',
      confirmText: 'Confirmer',
      cancelText: 'Annuler',
      hasCancel: true,

      onConfirm: {},
    };
  },
  methods: {
    hide() {
      this.visible = false;
      document.documentElement.style.overflow = 'scroll';
    },
    confirm() {
      if (typeof this.onConfirm === 'function') {
        this.onConfirm();
        this.hide();
      } else {
        this.hide();
      }
    },
    show(params) {
      this.visible = true;
      document.documentElement.style.overflow = 'hidden';

      this.title = params.title;
      this.text = params.text;

      if (params.onConfirm) this.onConfirm = params.onConfirm;
      if (params.confirmText) this.confirmText = params.confirmText;
      if (params.cancelText) this.cancelText = params.cancelText;
      this.hasCancel = !!params.hasCancel;
    },
  },
  beforeMount() {
    AppEvent.$on('app-message-show', (params) => {
      this.show(params);
    });
  },
  beforeDestroy() {
    AppEvent.$off('app-message-show', (params) => {
      this.show(params);
    });
    document.documentElement.style.overflow = 'scroll';
  },
};
</script>

<style lang="sass">
.message-wrapper
  position: fixed
  top: 50%
  left: 50%
  width: 300px
  padding: 1rem
  border-radius: $global-border-radius
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)
  background: white
  z-index: 1000
  transform: translate(-50%, -50%)

.message-screen
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  background: rgba(0,0,0,0.4)
  z-index: 800

.message-buttons
  display: flex
  margin-top: 2rem
  > .app-button
    flex-grow: 1

.screen-enter-active, .screen-leave-active
  transition: opacity .9s

.screen-enter, .screen-leave-to
  opacity: 0

.message-enter-active, .message-leave-active
  transition: transform .5s, opacity .3s

.message-enter, .message-leave-to
  opacity: 0
  transform: translateY(-130px) translateX(-50%)

</style>
