<template>
  <section class="login">
    <div class="grid-container">
      <app-subtitle>Login</app-subtitle>

      <form ref="register" @submit.prevent="login(user)">
        <div>
          <app-label required>Username</app-label>
          <app-input type="" placeholder="username" required v-model="user.userName"/>
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
        userName: '',
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
            text: '☀️  Authentification réussie! ',
          });
          // TO DO spinner d'attente

          this.$router.push({ name: 'main' });
        } catch (error) {
          this.$message.show({
            title: '🌧️',
            text: "  Nom d'utilisateur ou/et mot de passe incorect... ",
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
  color: $light-color
  form > div
    padding: 1rem 0
</style>
