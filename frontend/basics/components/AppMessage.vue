<template>
  <div class="app-message">
    <transition name="message">
      <div class="message-wrapper" v-if="visible">
        <h2>{{ title }}</h2>
        <p>{{ text }}</p>
        <div class="message-buttons">
          <app-button v-if="hasCancel" look="second" class="light" @click="hide">{{
            cancelText
          }}</app-button>
          <app-button @click="confirm">{{ confirmText }}</app-button>
        </div>
      </div>
    </transition>
    <transition name="screen">
      <div class="message-screen" v-if="visible" @click="hide()"></div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
/**
 * Modale de message avec possibilité de répondre (proche du confirm javascript)
 * Peut être appelé dans n'importe quel composant avec une fonction.
 *
 * @remarks
 * Example :
 * import { message } from '../../basics/utils/useMessage';
 *
 *  message.show({
 *    title: 'Lorem',
 *    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit!',
 *    onConfirm: () => {
 *      this.closeModal();
 *    },
 *  });
 *
 * @basics
 */

import { ref } from 'vue';
import { useEventBus } from '@vueuse/core';
import { useScrollLock } from '@vueuse/core';

const { on } = useEventBus<{
  title: string;
  text: string;
  cancelText?: string;
  confirmText?: string;
  hasCancel?: boolean;
  onConfirm?: () => void;
}>('app-message-show');

const visible = ref<boolean>(false);
const title = ref<string>('');
const text = ref<string>('');
const cancelText = ref<string>('Annuler');
const confirmText = ref<string>('Valider');
const hasCancel = ref<boolean>(true);
const onConfirm = ref<() => void>(() => {
  return true;
});

const el = ref<HTMLElement | null>(document.documentElement);
const isScrollLocked = useScrollLock(el);

on((params) => {
  show(params);
});

function hide() {
  visible.value = false;
  isScrollLocked.value = false;
}

function show(params: {
  title: string;
  text: string;
  cancelText?: string;
  confirmText?: string;
  hasCancel?: boolean;
  onConfirm?: () => void;
}) {
  visible.value = true;
  isScrollLocked.value = true;
  title.value = params.title;
  text.value = params.text;
  if (params.onConfirm) onConfirm.value = params.onConfirm;
  if (params.confirmText) confirmText.value = params.confirmText;
  if (params.cancelText) cancelText.value = params.cancelText;
  if (params.hasCancel) hasCancel.value = !!params.hasCancel;
}

function confirm() {
  if (typeof onConfirm.value === 'function') {
    onConfirm.value();
    hide();
  } else {
    hide();
  }
}
</script>

<style lang="postcss">
.app-message {
  & .message-wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 300px;
    padding: 1rem;
    background: var(--color-main-background);
    border-radius: var(--global-border-radius);
    color: var(--color-main-line);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    z-index: 1000;
    transform: translate(-50%, -50%);
  }
  & .message-screen {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 800;
  }
  & .message-buttons {
    display: flex;
    margin-top: 2rem;
    & .app-button {
      flex-grow: 1;
    }
  }
  & .screen-enter-active,
  & .screen-leave-active {
    transition: opacity 0.9s;
  }
  & .screen-enter-from,
  & .screen-leave-to {
    opacity: 0;
  }
  & .message-enter-active,
  & .message-leave-active {
    transition: transform 0.5s, opacity 0.3s;
  }
  & .message-enter-from,
  & .message-leave-to {
    opacity: 0;
    transform: translateY(-130px) translateX(-50%);
  }
}
</style>
