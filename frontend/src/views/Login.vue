<template>
  <section class="login">
    <div class="grid-container">
      <app-subtitle>Login</app-subtitle>

      <form ref="register" @submit.prevent="login(user)">
        <div>
          <app-label required>Email</app-label>
          <app-input autocomplete="email" type="email" placeholder="email" required v-model="user.email"/>
        </div>
        <div>
          <app-label required>Password</app-label>
          <app-input autocomplete="current-password" type="password" placeholder="mot de passe" required  v-model="user.password"/>
        </div>
        <div>
          <app-button type="submit">Register</app-button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import auth from '@/services/auth';

export default {
  name: 'login',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async login(user) {
      if (this.$refs.register.checkValidity()) {
        try {
          await auth.login(user);
          this.$notification.show({
            text: 'Login réussi !',
          });
          // TO DO spinner d'attente

          this.$router.push({ name: 'demo' });
        } catch (error) {
          this.$message.show({
            title: 'Erreur',
            text: 'Impossible de vous connecter',
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
.login
  padding: 1rem
  text-align: left
  form > div
    padding: 1rem 0
</style>
