<template>
  <input
    class="app-input"
    :type="type"
    :value="value"
    @input="(event) => handleChange((event?.target as HTMLInputElement).value)"
  />
</template>

<script lang="ts" setup>
/**
 * The input component
 *
 * @remarks
 *  Exemple :
 *    <app-input value="value1" v-model="answer"/>
 *
 * @param v-model - variable
 * @param type - type
 *
 * @basics
 */
import { computed } from 'vue';

// props
const props = defineProps<{
  modelValue: string | number | boolean | null;
  type: string;
}>();

// computed
const value = computed(() => props.modelValue);

// events
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | boolean): void;
}>();

// methods
const handleChange = (value: string) => {
  emit('update:modelValue', value);
};
</script>

<style lang="postcss">
.app-input {
  width: 100%;
  max-width: 250px;
  padding: 0.7rem 1rem 0.6rem;
  background: var(--color-main-flat);
  border-radius: var(--global-border-radius);
  border: 1px solid var(--color-main-line);
  box-shadow: 20px 20px 60px rgba(0, 0, 0, 0.06), -20px -20px 60px rgba(255, 255, 255, 0.12);
  transition: all 0.2s ease-in-out;
  &:hover,
  &:focus {
    border-color: lighten(var(--color-primary), 20%);
  }
}
</style>
