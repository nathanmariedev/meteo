<template>
  <div class="app-checkbox">
    <label>
      <input
        type="checkbox"
        :checked="Array.isArray(props.value) && props.value.includes(value)"
        @change="handleChange()"
      />
      <span class="checkmark"></span>
      <slot></slot>
    </label>
  </div>
</template>

<script lang="ts" setup>
/**
 * The checkbox component is similar to checkbox type input in HTML5, ie a variable that can take 0 to n values.
 *
 * @remarks
 *  Exemple :
 *   <app-checkbox :value="value1" v-model="answer1">{{ label1 }}</app-checkbox>
 *   <app-checkbox :value="value2" v-model="answer1">{{ label2 }}</app-checkbox>
 *   <app-checkbox :value="value3" v-model="answer1">{{ label3 }}</app-checkbox>
 *
 * @param v-model - variable
 * @param value - radio value
 *
 * @basics
 */

// props
const props = defineProps<{
  modelValue: (string | number | boolean)[] | null;
  value: string | number | boolean;
}>();

// events
const emit = defineEmits<{
  (e: 'update:modelValue', value: (string | number | boolean)[] | null): void;
}>();

// methods
const handleChange = () => {
  let response: (string | number | boolean)[] = [];

  if (Array.isArray(props.modelValue) && props.modelValue.length !== 0) {
    response = props.modelValue;
  }

  if (response.includes(props.value)) {
    response.splice(response.indexOf(props.value), 1);
  } else {
    response.push(props.value);
  }

  emit('update:modelValue', response);
};
</script>

<style lang="postcss">
.app-checkbox {
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
      &:checked ~ .checkmark {
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
      border-radius: 2px;
      transform: translateY(5px);
      transition: background ease-in-out 0.2s;
      &:after {
        content: '';
        position: absolute;
        opacity: 0;
        left: 7px;
        top: 3px;
        width: 4px;
        height: 8px;
        border: solid white;
        border-width: 0 3px 3px 0;
        transform: rotate(45deg);
        transition: opacity ease-in-out 0.2s;
      }
    }
  }
}
</style>
