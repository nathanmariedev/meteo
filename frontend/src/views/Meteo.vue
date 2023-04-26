<template>
    <section class="meteo">
        <app-title>{{this.$props.city.name}}</app-title>
    </section>
</template>
<script>
import cityApi from '@/services/api/city';

export default {
  props: {
    city: {
      insee: '',
      cp: '',
      name: '',
    },
  },
  async mounted() {
    await this.getCity();
  },
  methods: {
    async getCity() {
      try {
        if (this.$route.params.insee) {
          const city = await cityApi.getByInsee(44109);
          this.$message.show({
            title: 'Erreur',
            text: city.name,
            cancelText: 'Ok',
            hasCancel: true,
          });
        }
      } catch (e) {
        this.$message.show({
          title: 'Erreur',
          text: e,
          cancelText: 'Ok',
          hasCancel: true,
        });
      }
    },
  },
};
</script>
<style lang="sass">
#meteo
  $vertScreen: 100vh
  height: $vertScreen
  background: #aaa
</style>
