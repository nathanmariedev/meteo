<template>
  <section class="register">
    <h2>Register</h2>
    <form @submit.prevent="handleSubmit()">
      <p>
        <label for="email">Username</label>
        <app-input
          id="userName"
          v-model="auth.userName"
          placeholder="username"
          type=""
          minlength="8"
        />
      </p>
      <p>
        <label for="password">Password</label>
        <app-input id="password" type="" v-model="auth.password" placeholder="password" />
      </p>
      <p>
        <label for="city">City</label>
        <app-input
          type=""
          v-model="input"
          placeholder="Select a city"
          @input="refreshSuggestions"
        ></app-input>
        <datalist id="city-list">
          <option
            v-for="suggestion in suggestions"
            :key="suggestion.insee"
            :value="suggestion.insee"
          >
            {{ suggestion.name }}
          </option>
        </datalist>
      </p>
      <app-button type="submit">Create</app-button>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, watch } from 'vue';
import cityService from '@/services/city';
import authService from '@/services/auth';
import type Auth from '@/types/auth';
import router from '@/router';
import { notification } from '@basics/utils/useNotification';
import axios from 'axios';
import api from '@/services/api';
import type City from '@/types/city';

const input = ref('');
let suggestions: City[];

async function refreshSuggestions() {
  suggestions = (await cityService.find(input.value)).data;
  console.log(suggestions);
}

const auth = ref<Auth>({
  userName: '',
  password: '',
  mainCity: '',r
});

const handleSubmit = async () => {
  // TODO la validation commune front/back
  try {
    auth.value.mainCity = input.value.toString();
    await authService.register(auth.value);
    router.push({ name: 'home' });
    notification('☀️  Compte créé! Connectez-vous pour accéder à WeatherApp ');
  } catch (e) {
    notification(`🌧️  ${e.response.data.statusCode} : ${e.response.data.message} `);
  }
};
</script>

<style>
.login {
  padding: 2rem;
}
.login.label{
  display: block;
}
</style>
