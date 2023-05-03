<template>
    <section class="meteoMin">
        <div class="icon">
            <Storm v-if="weather == 'storm'"/>
            <Sun v-else-if="weather == 'sun'" />
            <Cloud v-else-if="weather == 'cloud'" />
            <CloudNight v-else-if="weather == 'cloud_night'" />
            <CloudSun v-else-if="weather == 'cloud_sun'" />
            <Moon v-else-if="weather == 'moon'" />
            <Rain v-else-if="weather == 'rain'"/>
            <Snow v-else-if="weather == 'snow'" />
        </div>
        <p class="temp">{{ data.temp2m }} °C</p>
    </section>
</template>
<script>
import Storm from '@/assets/img/weatherIconsMin/storm.svg';
import Sun from '@/assets/img/weatherIconsMin/sun.svg';
import Cloud from '@/assets/img/weatherIconsMin/cloud.svg';
import CloudNight from '@/assets/img/weatherIconsMin/cloud_night.svg';
import CloudSun from '@/assets/img/weatherIconsMin/cloud_sun.svg';
import Moon from '@/assets/img/weatherIconsMin/moon.svg';
import Rain from '@/assets/img/weatherIconsMin/rain.svg';
import Snow from '@/assets/img/weatherIconsMin/snow.svg';

export default {
  components: {
    Storm,
    Sun,
    Cloud,
    CloudNight,
    CloudSun,
    Moon,
    Rain,
    Snow,
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
  data() {
    return {
      weather: '',
    };
  },
  async mounted() {
    this.weather = this.getWeather(this.data.weather, true, this.data.datetime);
  },
  async updated() {
    this.weather = this.getWeather(this.data.weather, true, this.data.datetime);
  },
  methods: {
    getWeather(weather, nightMode, date = null) {
      let hour = 12;
      if (nightMode) {
        hour = new Date(date).getHours();
      }
      if (weather >= 0 && weather <= 1) {
        if (nightMode && (hour >= 20 && hour <= 7)) {
          return 'moon';
        }
        return 'sun';
      }
      if (weather >= 2 && weather <= 3) {
        if (nightMode && (hour >= 20 && hour <= 7)) {
          return 'cloud_night';
        }
        return 'cloud_sun';
      }
      if (weather >= 4 && weather <= 5) {
        return 'cloud';
      }
      if ((weather >= 10 && weather <= 12) || (weather >= 139 && weather <= 210)) {
        return 'rain';
      }
      if (weather >= 20 && weather <= 22) {
        return 'snow';
      }
      if (weather >= 100 && weather <= 138) {
        return 'storm';
      }
      return 'unknown';
    },
    getHour(string) {
      const date = new Date(string);
      return date.getHours;
    },
  },
};
</script>
<style lang="sass">
.meteoMin
  height: 100%
  width: 20%
  display: inline-block
  .icon
    display: flex
    flex-direction: row
    justify-content: center
    width: fit-content
    height: fit-content
</style>
