<template>
    <div class="sidenav">
      <div class="profile">
        <img src="./../assets/img/profile.png" />
        <p>{{this.$props.user.userName}}</p>
      </div>
      <app-collapse title="Villes favorites" v-model="activeCollapse" name="favs">
          <p v-for="city in favs" :key="city.insee">{{ city.name }} <span v-if="city.insee === $props.user.mainCity.insee">🏠</span> </p>
      </app-collapse>
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
};
</script>
<style lang="sass">
.sidenav
  background: $background-dark-secondary
  height: 100vh
  color: $dark-detail
  width: auto
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
</style>
