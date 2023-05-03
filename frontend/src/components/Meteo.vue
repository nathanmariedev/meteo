<template>
    <section id="meteo">
      <app-button @click="redirectTo('search')">🔎 Rechercher une ville ...</app-button>
      <div>
        <app-title>{{ city.name }}</app-title>
        <Now v-if="this.meteoHours[0] !== undefined" :data="this.meteoHours"/>
        <MeteoGallery :data="this.meteoHours" v-if="this.meteoHours[0] !== undefined"  />
      </div>
    </section>
</template>
<script>
import cityApi from '@/services/api/city';
import weatherApi from '@/services/api/weather';
import Now from '@/components/Now.vue';
import MeteoGallery from '@/components/MeteoGallery.vue';

export default {
  components: {
    Now,
    MeteoGallery,
  },
  props: {
    insee: String,
  },
  data() {
    return {
      city: 'aaa',
      meteoHours: [],
    };
  },
  async created() {
    this.meteoHours = await this.getHours(this.$props.insee);
    this.city = await this.getCity(this.$props.insee);
    this.$watch('insee', async (newInsee) => {
      this.city = await this.getCity(newInsee);
      this.meteoHours = await this.getHours(newInsee);
      this.date = new Date(this.data);
    });
  },
  methods: {
    redirectTo(where, insee) {
      if (insee !== this.$route.params.insee) {
        this.$router.push(`/${where}/${insee}`);
      }
      if (insee === undefined) {
        this.$router.push(`/${where}`);
      }
    },
    async getCity(insee) {
      try {
        const city = await cityApi.getByInsee(insee);
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
  },
};
</script>
<style lang="sass">
#meteo
  background: $background-dark
  width: 80vw
  height: 100%
  div
    display: flex
    flex-direction: column
    justify-content: flex-start
    align-items: center
</style>
