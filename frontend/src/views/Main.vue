<template>
  <section class="main">
    <div class="content">
        <SideNav :user="this.user" :favs="this.favs"/>
        <Meteo :insee="this.insee"/>
    </div>
  </section>
</template>
<script>
import SideNav from '@/components/SideNav.vue';
import memberApi from '@/services/api/member';
import Meteo from '../components/Meteo.vue';

export default {
  components: {
    SideNav,
    Meteo,
  },
  data() {
    return {
      user: {
        userName: '',
        mainCity: {
          insee: '',
          cp: '',
          name: '',
        },
      },
      favs: [],
      insee: null,
    };
  },
  watch: {
    '$route.params.insee': function (newVal) {
      this.insee = newVal;
    },
  },
  async mounted() {
    try {
      const user = await memberApi.getMe();
      this.user.userName = user.userName;
      this.user.mainCity = user.mainCity;
      this.insee = user.mainCity.insee;
      const favs = await memberApi.getMyFavs();
      this.favs = favs;
    } catch (e) {
      this.$message.show({
        title: 'Erreur',
        text: e,
        cancelText: 'Ok',
        hasCancel: false,
      });
    }
  },
  methods: {
    async getMe() {
      try {
        this.me = await memberApi.getMe();
        this.isBrandAdmin = this.me.isBrandAdmin;
      } catch (er) {
        this.$message.show({
          title: 'Erreur',
          text: er,
          cancelText: 'Ok',
          hasCancel: true,
        });
      }
    },
  },
};
</script>
<style lang="sass">
.main
  height: 100vh
  width: 100vw
.content
  height: 100vh
  display: flex
  flex-direction: row
  justify-content: flex-start
  align-items: flex-start
  .meteo
    width: 100%
    height: 100%
</style>
