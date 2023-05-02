<template>
    <section id="profile">
      <app-button class="home" size="small" @click="() => { redirectTo('main') }">❄️ retour ❄️</app-button>
      <div class="page">
        <app-title>Welcome {{ user.userName }}</app-title>
      </div>
        <div class="favs">
            <div class="favsList">
                <app-label>Favorites</app-label>
                <div v-for="fav in favs" :key="fav.name">
                    <app-button size="small" type="button" v-if="fav.insee !== user.mainCity.insee" @click="() => {deletFav(fav.insee)}">remove</app-button>
                    <span v-else>🏠</span>
                    <p>{{ fav.name }}</p>
                </div>
            </div>
            <div class="mainCity">
                <app-label>main city</app-label>
                <app-select :options="favsForSelect" v-model="main"></app-select>
                <app-button @click="updateMainCity">update main city</app-button>
            </div>
        </div>
        <app-message/>
        <app-notifications/>
    </section>
</template>
<script>
import memberApi from '@/services/api/member';

export default {
  components: {
  },
  data() {
    return {
      user: {
        userName: '',
        mainCity: '',
      },
      favs: [],
      favsForSelect: [],
      main: '',
    };
  },
  methods: {
    redirectTo(where) {
      this.$router.push({ name: where });
    },
    async updateMainCity() {
      try {
        await memberApi.changeFav(this.main);
        this.$notification.show({
          text: '🌪️ Main city succesfully updated!',
        });
        this.favs = await memberApi.getMyFavs();
      } catch (e) {
        this.$notification.show({
          text: e.message,
        });
      }
    },
    async deletFav(insee) {
      try {
        await memberApi.dropFav(insee);
        this.$notification.show({
          text: 'Favorite succesfully removed!',
        });
        this.favs = await memberApi.getMyFavs();
      } catch (e) {
        this.$notification.show({
          text: e.message,
        });
      }
    },
  },
  async mounted() {
    const user = await memberApi.getMe();
    this.user.userName = user.userName;
    this.user.mainCity = user.mainCity;
    this.insee = user.mainCity.insee;
    const favs = await memberApi.getMyFavs();
    this.favs = favs;
    this.favsForSelect = favs.map((obj) => ({ name: obj.insee, label: obj.name }));
    this.favsForSelect = this.favsForSelect.filter((obj) => obj.name !== user.mainCity.insee);
  },
};
</script>
<style lang="sass">
#profile
  margin-top: 3vh
  min-height: 100vh
  background: $background-dark
  display: flex
  flex-direction: column
  align-items: flex-start
  justify-content: flex-start
  .home
    position: absolute
    top: 15px
    left: 15px
    padding: 10px
  .pass
    margin-top: 5vh
    .changePass
      margin-top: 3vh
      margin-left: 5vh
      button
        margin-top: 3vh
        font-size: 10px
        background: #4E00B4
        margin-left: 0px
  .favs
    .mainCity
      margin-top: 5vh
      min-width: 15vw
      button
        margin-top: 10px
        font-size: 10px
        background: #4E00B4
        margin-bottom: 10vh
    .favsList
      margin-top: 3vh
      display: flex
      flex-direction: column
      align-items: flex-start
      div
        display: flex
        flex-direction: row
        align-items: center
        gap: 8px
        color: white
        margin: 5px
        button
          font-size: 10px
          background: #4E00B4
</style>
