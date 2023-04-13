<template>
  <h1 class="app-title"><slot></slot></h1>
</template>

<script lang="ts" setup>
/**
 * A simple title component
 *
 * @remarks
 * <app-title>Heading 1</app-title>
 *
 * @basics
 */
</script>

<style>
.app-title {
  display: inline-block;
  position: relative;
  margin: 0.2rem auto;
  padding: 0.5rem 0;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
  color: var(--color-main-line);
}
</style>
