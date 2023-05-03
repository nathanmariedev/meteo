<template>
  <section class="register">
    <div class="searchSpace">
      <app-input placeholder="Search a city... 🌙" @input="searchHandler" v-model="input"></app-input>
    </div>
    <div class="resultsSpace">
        <div class="result" v-for="res in results" :key="res.insee">
            <p>{{ res.name }}</p>
            <app-button type="button" size="small" @click="addToFavs(res.insee)" >⭐️ favoris ⭐️</app-button>
            <app-button type="button" @click="redirectTo('weather', res.insee)" >🌨️ météo 🌨️</app-button>
        </div>
        <p>...</p>
    </div>
  </section>
</template>
<script>
import cityApi from '@/services/api/city';
import memberApi from '@/services/api/member';

export default {
  data() {
    return {
      input: '',
      results: [],
    };
  },
  methods: {
    async redirectTo(where, insee) {
      await cityApi.getByInsee(insee);
      if (insee === undefined) {
        this.$router.push(`/${where}`);
      }
      if (insee !== this.$route.params.insee) {
        this.$router.push(`/${where}/${insee}`);
      }
    },
    async searchHandler() {
      const results = await cityApi.findByQuery(this.input);
      this.results = results.data.slice(0, 5);
    },
    async addToFavs(insee) {
      try {
        await memberApi.addFav(insee);
        this.$notification.show({
          text: '☀️  Ajout réussi! ',
        });
      } catch (error) {
        this.$message.show({
          text: "  L'ajout aux favoris ne peux être effectué... ",
        });
        throw error;
      }
    },
  },
};

</script>
<style lang="sass">
.register
    display: flex
    flex-direction: column
    .searchSpace
        height: 50vh
        display: flex
        align-items: flex-end
    .resultsSpace
        margin-top: 15px
        color: white
        height: 50vh
        .result
            display: flex
            justify-content: flex-start
            gap: 7px
            button
                padding-top: 0px
                padding-bottom: 0px
                font-size: 9px
</style>
