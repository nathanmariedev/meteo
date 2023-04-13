<template>
  <div
    v-if="modelValue"
    ref="el"
    class="app-tooltip"
    :style="{ left: `${left}px`, top: `${top}px` }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
/**
 * A simple tooltip component
 *
 * @remarks
 * <app-tooltip v-model="isTooltipVisibleValue">Tooltip text</app-tooltip>
 *
 * @param v-model set if tooltip is visible or not
 *
 * @basics
 */
import { ref, watch, nextTick } from 'vue';
import { onClickOutside } from '@vueuse/core';

// props
const props = defineProps<{
  modelValue: boolean;
}>();

// events
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | boolean): void;
}>();

const top = ref<number>(0);
const left = ref<number>(0);

const el = ref<HTMLElement | null>(null);

watch(
  () => props.modelValue,
  async () => {
    if (props.modelValue) {
      // À ce stade, on est sur que l'élément existe mais on attend la prochaine itération DOM pour que l'élement soit raccroché au parent
      await nextTick();
      const element = el.value as HTMLElement;
      const parentElement = element.parentElement as HTMLElement;
      const rectParent = parentElement.getBoundingClientRect();

      // Calcul de la position du tooltip dans la page (évite de mettre le parent en position relative)
      top.value = Math.abs(rectParent.top) + window.scrollY;
      left.value = Math.abs(rectParent.left) + window.scrollX;
    }
  },
);

onClickOutside(el, (event) => {
  if (props.modelValue && event.target !== el.value?.parentElement)
    emit('update:modelValue', false);
});
</script>

<style lang="postcss">
.app-tooltip {
  display: flex;
  position: absolute;
  left: 90%;
  top: 0;
  transform: translateY(calc(-100% - 10px));
  padding: 0.7rem 1rem;
  color: var(--color-main-line);
  text-transform: none;
  background: var(--color-main-flat);
  border-radius: 8px;
  box-shadow: 2px 2px 4px rgba(38, 38, 38, 0.25);
}

.app-tooltip:after {
  content: '';
  width: 0;
  height: 0;
  position: absolute;
  bottom: 0;
  left: 10%;
  transform: translateY(calc(100% - 1px));
  border: 1rem solid transparent;
  border-width: 10px 10px;
  border-top-color: var(--color-main-flat);
  filter: drop-shadow(2px 2px 4px rgba(38, 38, 38, 0.25));
  clip-path: inset(0 -4px -4px -4px);
}
</style>
