<template>
    <div class="sidenav">
      <div class="profile">
        <img src="./../assets/img/profile.png" />
        <p>{{this.$props.user.userName}}</p>
      </div>
      <div class="side">
        <app-collapse title="Villes favorites" v-model="activeCollapse" name="favs">
          <p v-for="city in favs" :key="city.insee" @click="redirectTo('main', city.insee)">{{ city.name }} <span v-if="city.insee === $props.user.mainCity.insee">🏠</span> </p>
        </app-collapse>
        <app-button look="second" size="small" class="profileBtn" :type="button" >View profile</app-button>
      </div>
  </div>
</template>
<script>
export default {
  props: {
    user: {
      userName: '',
      mainCity: {
        insee: '',
        cp: '',
        name: '',
      },
    },
    favs: [],
  },
  data() {
    return {
      activeCollapse: null,
      searchHeaders: [
        { label: 'Ville', key: 'name' },
        { label: 'Code Postal', key: 'cp' },
      ],
    };
  },
  methods: {
    redirectTo(where, insee) {
      if (insee !== this.$route.params.insee) {
        this.$router.push(`/main/${insee}`);
      }
    },
  },
};
</script>
<style lang="sass">
.sidenav
  background: $background-dark-secondary
  height: 100vh
  color: $dark-detail
  width: auto
  display: flex
  flex-direction: column
  justify-content: space-between
  .profile
    color: $light-color
    font-size: 20px
    margin: 20px
    display: flex
    align-items: center
    img
      margin-right: 15px
      max-height: 40px
      width: 40px
  .side
    display: flex
    flex-direction: column
    justify-content: space-between
    align-items: center
    height: 100%
    margin-bottom: 18%
</style>
