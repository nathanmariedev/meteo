<template>
  <div class="app-card">
    <div class="image-container">
      <img :src="image" :alt="title" />
    </div>
    <div class="container">
      <h3>{{ title }}</h3>
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * A simple card component
 *
 * @remarks
 * <app-card
 *  title="Lorem Ipsum"
 *  text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, deserunt."
 *  :image="image"/>
 *
 * @param title - The title of the card
 * @param text - The text of the card
 * @param image - The image of the card
 *
 * @basics
 */

const props = defineProps<{
  image: string;
  title: string;
  text: string;
}>();
</script>

<style lang="postcss">
.app-card {
  max-width: 300px;
  border-radius: var(--global-border-radius);
  overflow: hidden;
  background: var(--color-main-flat);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  & .image-container {
    position: relative;
    height: 200px;
    overflow: hidden;
    & img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      min-width: 100%;
      min-height: 100%;
    }
  }

  & .container {
    padding: 1rem;
    min-height: 100px;
    & h3 {
      font-size: 1rem;
      font-weight: bold;
    }
    & p {
      font-size: 0.8rem;
      color: var(--color-main-line);
    }
  }
}
</style>
