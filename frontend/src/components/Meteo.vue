<template>
    <section class="meteo">
      <app-title>{{ city.name }}</app-title>
      <Now :data="this.meteoHours"/>
      <Hours />
      <Days />
    </section>
</template>
<script>
import cityApi from '@/services/api/city';
import weatherApi from '@/services/api/weather';
import Now from '@/components/Now.vue';

export default {
  components: {
    Now,
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
    async getCity(insee) {
      try {
        console.log('getCity');
        const city = await cityApi.getByInsee(insee);
        this.$notification.show({
          text: city.data,
        });
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
        console.log('getHours');
        const hours = await weatherApi.getHours(insee);
        this.$notification.show({
          text: `HOURS : ${hours.data[0].probarain}`,
        });
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
  $vertScreen: 100vh
  height: $vertScreen
  background: #aaa
</style>
