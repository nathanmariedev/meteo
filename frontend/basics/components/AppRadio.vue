<template>
  <div class="app-radio">
    <label>
      <input type="radio" :checked="modelValue === value" @change="handleChange()" />
      <span class="checkmark"></span>
      <slot></slot>
    </label>
  </div>
</template>

<script lang="ts" setup>
/**
 * The radio component is similar to radio type input in HTML5, ie a variable that can take one value.
 *
 * @remarks
 *  Exemple :
 *    <app-radio value="value1" v-model="answer">Label 1</app-radio>
 *    <app-radio value="value2" v-model="answer">Label 2</app-radio>
 *    <app-radio value="value3" v-model="answer">Label 3</app-radio>
 *
 * @param v-model - variable
 * @param value - radio value
 *
 * @basics
 */

// props
const props = defineProps<{
  modelValue: string | number | boolean | null;
  value: string | number | boolean;
}>();

// events
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | boolean): void;
}>();

// methods
const handleChange = () => {
  emit('update:modelValue', props.value);
};
</script>

<style lang="postcss">
.app-radio {
  display: inline-block;
  & label {
    display: inline-block;
    position: relative;
    margin: 0 5px;
    cursor: pointer;
    user-select: none;
    & input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
      &:checked ~ .checkmark:after {
        background-color: var(--color-primary);
        border-color: transparent;
      }
      &:checked ~ .checkmark:after {
        opacity: 1;
      }
    }
    & .checkmark {
      display: inline-block;
      margin-right: 5px;
      height: 20px;
      width: 20px;
      border: 1px solid var(--color-primary);
      background: white;
      border-radius: 50%;
      transform: translateY(5px);
      &:after {
        content: '';
        position: absolute;
        opacity: 0;
        left: 5px;
        top: 5px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        transition: opacity ease-in-out 0.2s;
      }
    }
  }
}
</style>
