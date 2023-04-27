<template>
    <section class="now">
        <div class="icon">
            <Storm class="hide" />
            <Sun class="" />
            <Cloud class="hide" />
            <CloudNight class="hide" />
            <CloudSun class="hide" />
            <Humidity class="hide" />
            <Moon class="hide" />
            <Rain class="hide" />
            <Snow class="hide" />
            <Wind class="hide" />
        </div>
        <p>{{ data }}</p>
      HI!
    </section>
</template>
<script>
import Storm from '@/assets/img/weatherIcons/storm.svg';
import Sun from '@/assets/img/weatherIcons/sun.svg';
import Cloud from '@/assets/img/weatherIcons/cloud.svg';
import CloudNight from '@/assets/img/weatherIcons/cloud_night.svg';
import CloudSun from '@/assets/img/weatherIcons/cloud_sun.svg';
import Humidity from '@/assets/img/weatherIcons/humidity.svg';
import Moon from '@/assets/img/weatherIcons/moon.svg';
import Rain from '@/assets/img/weatherIcons/rain.svg';
import Snow from '@/assets/img/weatherIcons/snow.svg';
import Wind from '@/assets/img/weatherIcons/wind.svg';

export default {
  components: {
    Storm,
    Sun,
    Cloud,
    CloudNight,
    CloudSun,
    Humidity,
    Moon,
    Rain,
    Snow,
    Wind,
  },
  methods: {
  },
  props: {
    data: {
      insee: String,
      cp: Number,
      latitude: Number,
      longitude: Number,
      datetime: String,
      temp2m: Number,
      rh2m: Number,
      wind10m: Number,
      gust10m: Number,
      dirwind10m: Number,
      rr10: Number,
      rr1: Number,
      probarain: Number,
      weather: Number,
      probafrost: Number,
      probafog: Number,
      probawind70: Number,
      probawind100: Number,
      tsoil1: Number,
      tsoil2: Number,
      gustx: Number,
      iso0: Number,
    },
  },
};
</script>
<style lang="sass">
.now
  height: 60vh
  width: 100%
  background: $background-dark
  .hide
    display: none
</style>
