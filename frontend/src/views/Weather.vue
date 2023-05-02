<template>
    <section class="weather">
        <app-button class="home" size="small" @click="() => { redirectTo('main') }">❄️ retour ❄️</app-button>
        <app-title>{{ city.name }}</app-title>
        <Now :data="this.meteoHours"/>
        <MeteoGallery :data="this.meteoHours" />
  </section>
</template>
<script>
import Now from '@/components/Now.vue';
import MeteoGallery from '@/components/MeteoGallery.vue';
import cityApi from '@/services/api/city';
import weatherApi from '@/services/api/weather';

export default {
  components: {
    MeteoGallery,
    Now,
  },
  data() {
    return {
      meteoHours: [],
      city: {
        insee: '',
        cp: '',
        name: '',
      },
    };
  },
  methods: {
    async getCity(insee) {
      try {
        const city = await cityApi.getByInsee(insee);
        this.$notification.show({ text: city.data.name });
        return city.data;
      } catch (e) {
        this.$message.show({
          title: 'Erreur Get City',
          text: e.message,
          cancelText: 'Ok',
          hasCancel: true,
        });
        return null;
      }
    },
    async getHours(insee) {
      try {
        const hours = await weatherApi.getHours(insee);
        return hours.data;
      } catch (e) {
        this.$message.show({
          title: 'Erreur Get Hours',
          text: e,
          cancelText: 'Ok',
          hasCancel: true,
        });
        return null;
      }
    },
    async redirectTo(where, insee) {
      if (insee === undefined) {
        this.$router.push(`/${where}`);
      }
      if (insee !== this.$route.params.insee) {
        this.$router.push(`/${where}/${insee}`);
      }
    },
  },
  async created() {
    this.meteoHours = await this.getHours(this.$route.params.insee);
    this.city = await this.getCity(this.$route.params.insee);
  },
};
</script>
<style lang="sass">
body
    background: $background-dark
.weather
    display: flex
    flex-direction: column
    justify-content: flex-start
    align-items: center
    button
        position: absolute
        top: 15px
        left: 15px
</style>
