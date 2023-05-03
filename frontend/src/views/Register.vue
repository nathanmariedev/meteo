<template>
  <section class="register">
    <div class="grid-container">
      <app-subtitle>Register</app-subtitle>
      <form ref="register" @submit.prevent="register(user)">
        <div>
          <app-label required>Username</app-label>
          <app-input placeholder="username" required v-model="user.userName"/>
        </div>
        <div>
          <app-label required>Password</app-label>
          <app-input type="password" placeholder="mot de passe" required  v-model="user.password"/>
        </div>
        <div>
          <app-button type="submit">Register</app-button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import api from '@/services/api/member';

export default {
  name: 'register',
  data() {
    return {
      user: {
        userName: '',
        password: '',
        mainCity: '75056',
      },
    };
  },
  methods: {
    async register(user) {
      if (this.$refs.register.checkValidity()) {
        try {
          await api.register(user);
          this.$notification.show({
            text: 'Inscription réussie!',
          });
        } catch (error) {
          this.$message.show({
            title: 'Erreur',
            text: 'Impossible de vous inscrire',
            confirmText: 'Ok',
            hasCancel: false,
          });

          throw error;
        }
      } else {
        this.$refs.register.reportValidity();
      }
    },
  },
};
</script>

<style lang="sass">
.register
  padding: 1rem
  text-align: left
  form > div
    padding: 1rem 0
</style>
