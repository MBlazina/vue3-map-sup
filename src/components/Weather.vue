<template>
  <div>
    <h2>Weather</h2>
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
  watch: {
    cityLat() {
      this.getWeather();
    },
  },

  methods: {
    getWeather() {
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${this.cityLat}&lon=${this.cityLng}&exclude=current,minutely,hourly&units=metric&appid=e90b288c7d66f6b0cd0e705506e554c1`
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
};
</script>

<style lang="scss" scoped>
.weather {
  background: white;
}
h2 {
  text-align: center;
  font-size: 18px;
  line-height: 35px;
  font-weight: bold;
}
</style>