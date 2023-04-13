<template>
  <div class="ui-kit">
    <h1>Ui Kit demo Page</h1>

    <div class="element">
      <app-title>Heading 1</app-title>
    </div>

    <div class="element">
      Theme :
      <app-radio :value="true" v-model="isDark">Dark</app-radio>
      <app-radio :value="false" v-model="isDark">Light</app-radio>
    </div>

    <div class="element">
      <app-card
        image="https://images.unsplash.com/photo-1561123760-0b8467594a63?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
        title="Plop"
        text="plop plop"
      />
    </div>

    <div class="element">
      <app-radio value="chocolat" v-model="radioValue">Chocolat</app-radio>
      <app-radio value="café" v-model="radioValue">Café</app-radio>
      <app-radio value="thé" v-model="radioValue">Thé</app-radio>
    </div>

    <div class="element">
      <app-checkbox value="fraise" v-model="checkboxValue">Fraise</app-checkbox>
      <app-checkbox value="pomme" v-model="checkboxValue">Pomme</app-checkbox>
      <app-checkbox value="poire" v-model="checkboxValue">Poire</app-checkbox>
      <app-checkbox value="abricot" v-model="checkboxValue">Abricot</app-checkbox>
      <app-checkbox value="banane" v-model="checkboxValue">Banane</app-checkbox>
    </div>

    <div class="element">
      <app-button @click="handleNotification">Lancer une notification</app-button>
    </div>

    <div class="element">
      <app-button @click="handleMessage">Lancer un message</app-button>
    </div>

    <div class="element">
      <app-button @click="isTooltipVisibleValue = !isTooltipVisibleValue">
        <slot v-if="isTooltipVisibleValue">Cacher</slot>
        <slot v-else>Afficher</slot>
        <app-tooltip v-model="isTooltipVisibleValue">Je suis le tooltip gentil</app-tooltip>
      </app-button>
    </div>

    <div class="element">
      <router-link to="/">Retour à la page d'accueil</router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { notification } from '@basics/utils/useNotification';
import { message } from '@basics/utils/useMessage';

import { useDark } from '@vueuse/core';

const isDark = useDark();

const radioValue = ref<string | null>('light');
const checkboxValue = ref<string[] | null>(null);
const isTooltipVisibleValue = ref<boolean>(false);

const handleNotification = () => {
  notification('test');
};

const handleMessage = () => {
  message({
    title: 'Lorem',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero aperiam repellendus officiis optio eum error cupiditate ad explicabo eveniet!',
    cancelText: 'Non',
    confirmText: 'Oui',
    onConfirm: () => {
      console.log('confirm');
    },
  });
};
</script>

<style lang="postcss">
.ui-kit {
  padding: 2rem;
  & .element {
    margin: 2rem 0;
  }
}
</style>
