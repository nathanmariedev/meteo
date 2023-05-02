<template>
    <section id="meteoGallery">
        <p>Aujourd'hui</p>
        <div class="gallery">
            <MeteoMin v-for="elem in data" :key="elem.datetime" :data="elem" />
        </div>
    </section>
</template>
<script>
import MeteoMin from '@/components/MeteoMin.vue';

export default {
  components: {
    MeteoMin,
  },
  props: {
    data: [],
  },
  mounted() {
    console.log('data : ', this.$props.data[0].datetime);
  },
};
</script>
<style lang="sass">
#meteoGallery
  width: 80%
  height: 8vh
  display: block
  .gallery
    padding: 12px
    display: flex
    flex-direction: row
    gap: 45px
    overflow-x: scroll
    background: $background-dark-secondary
</style>
