<template>
  <div>
    <h1>weather</h1>
    <Daily :forecast="day" v-for="day in firstFiveDays" :key="day.dt" />
  </div>
</template>

<script>
import Daily from "./Daily";

export default {
  props: ["city", "cityLat", "cityLng"],
  components: {
    Daily,
  },
  computed: {
    firstFiveDays() {
      if (this.responseWeather.daily) {
        return this.responseWeather.daily.slice(0, 5);
      } else {
        return [];
      }
    },
  },

  data() {
    return {
      weatherAPI: process.env.VUE_APP_WEATHER_API_KEY,
      responseWeather: {},
    };
  },
  methods: {
    getWeather() {
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${this.cityLat}&lon=${this.cityLng}&exclude=current,minutely,hourly&units=metric&appid=51d09d216793dfdb944ee55154be6239`
      )
        .then((res) => res.json())
        .then((data) => {
          this.responseWeather = data;
        })
        .then((data) => console.log(data))
        .catch((err) => console.log(err.message));
    },
  },
  mounted() {
    this.getWeather();
  },
  updated() {
    this.getWeather();
  },
};
</script>

<style>
</style>