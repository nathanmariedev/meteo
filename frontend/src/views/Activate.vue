<template>
  <section class="activate">
    <div class="grid-container">
      <app-subtitle>Activation de compte</app-subtitle>
    </div>
  </section>
</template>

<script>
import member from '@/services/api/member';

export default {
  name: 'activate',
  created() {
    this.activate();
  },
  methods: {
    async activate() {
      if (this.$route.query.token) {
        try {
          await member.activate(this.$route.query.token);
          this.$message.show({
            title: 'Bienvenue!',
            text: 'Votre compte a bien été activé !',
            confirmText: 'Ok',
            hasCancel: false,
          });
        } catch (error) {
          this.$message.show({
            title: 'Erreur',
            text: 'Impossible d\'activer votre compte',
            confirmText: 'Ok',
            hasCancel: false,
          });
          throw error;
        }
      } else {
        this.$message.show({
          title: 'Erreur',
          text: 'Impossible d\'activer votre compte',
          confirmText: 'Ok',
          hasCancel: false,
        });
      }
    },
  },
};
</script>

<style lang="sass">
.activate
  padding: 1rem
  text-align: left
  form > div
    padding: 1rem 0
</style>
