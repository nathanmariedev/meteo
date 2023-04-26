<template>
  <button class="app-button" :type="type" :class="[size, look]" @click="handleClick">
    <span v-if="isLoading" class="loader">
      <span></span>
      <span></span>
      <span></span>
    </span>
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
/**
 * A button component
 *
 * @remarks
 * <app-button size="small" look="second" :loading="true">Bouton petit avec loader</app-button>
 *
 * @param size - Size of the button
 * @param type - Type of the button
 * @param look - Apparence of the button
 * @param isLoading - If the button is loading
 *
 * @basics
 */

// props
interface Props {
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit';
  look?: 'main' | 'second';
  isLoading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'small',
  type: 'button',
  look: 'main',
  isLoading: false,
});

// events
const emit = defineEmits<{
  (e: 'click', evt: MouseEvent): void;
}>();

// methods
const handleClick = (evt: MouseEvent) => {
  if (!props.isLoading) {
    emit('click', evt);
  }
};
</script>

<style lang="postcss">
.app-button {
  display: inline-flex;
  align-items: center;
  margin: 0.2rem;
  padding: 1rem 1.8rem 0.9rem;
  background: var(--color-main-flat);
  color: var(--color-main-line);
  border: none;
  border-radius: var(--global-border-radius);
  text-transform: uppercase;
  font-size: 1.1rem;
  transition: all ease-in-out 0.2s;
  cursor: pointer;

  &:hover {
    background: darken(var(--color-main-flat), 20%);
  }

  &:focus {
    outline: 0;
  }

  &.light {
    background: var(--color-main-flat);
    color: var(--color-main-line);
    &:hover {
      background: darken(var(--color-main-flat), 5%);
    }
  }

  &.second {
    background: var(--color-second);
    color: white;
    &:hover {
      background: darken(var(--color-main-flat), 5%);
      background: darken(var(--color-second), 5%);
    }
  }

  &.small {
    padding: 0.6rem 1.4rem 0.5rem;
    font-size: 0.85rem;
  }

  &.large {
    padding: 1.4rem 1.4rem 1.1rem;
    font-size: 1.2rem;
  }

  & .loader {
    display: inline-block;
    position: relative;
    width: 40px;
    height: 8px;
  }

  & .loader span {
    display: inline-block;
    position: absolute;
    left: 0;
    width: 5px;
    background: #fff;
    animation: loader 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }

  & .loader span:nth-child(1) {
    left: 0;
    animation-delay: -0.24s;
  }

  & .loader span:nth-child(2) {
    left: 10px;
    animation-delay: -0.12s;
  }

  & .loader span:nth-child(3) {
    left: 20px;
    animation-delay: 0;
  }
}

@keyframes loader {
  0% {
    top: 0;
    height: 180%;
  }
  50%,
  100% {
    top: 0;
    height: 100%;
  }
}
</style>
