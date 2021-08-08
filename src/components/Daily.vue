<template>
  <div class="weather-row" :class="{ today: isToday }">
    <div class="weather-info">
      <p>
        <strong>{{ getDay() }}</strong> <span v-if="isToday">(today)</span>
      </p>
      <p>{{ weather }}</p>
      <p><strong>Clouds:</strong> {{ clouds }}, {{ pressure }}</p>
    </div>
    <div class="weather-temp">
      <p :class="setTempColor(forecast.temp.min)">{{ forecast.temp.min }}C</p>
      <p :class="setTempColor(forecast.temp.max)">{{ forecast.temp.max }}C</p>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      currentForecastDate: moment.unix(this.forecast.dt),
      weather: this.forecast.weather[0].description,
      clouds: this.forecast.clouds + "%",
      pressure: this.forecast.pressure + " hpa",
   /*    currentTempMin: this.forecast.temp.min + "C",
      currentTempMax: this.forecast.temp.max + "C", */
    };
  },
  props: ["forecast"],
  methods: {
    getDay() {
      return this.currentForecastDate.format("ddd DD MMM");
    },
    setTempColor(temp) {
      if (temp < 14) {
        return "cold";
      } else if (temp >= 14 && temp <= 20) {
        return "warm";
      } else if (temp > 20 && temp <= 25) {
        return "hot";
      } else if (temp > 25) {
        return "very-hot";
      }
    },
  },
  computed: {
    isToday() {
      return this.currentForecastDate.isSame(moment(), "day");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/_colors.scss";
.weather-row {
  display: flex;
  align-items: center;
  border-left: 3px solid transparent;
  padding-left: 15px;
  padding-right: 15px;
  height: 80px;
  &:nth-child(even) {
    background: $oddRow;
  }
  &.today {
border-left: 3px solid $blue;
}
  .weather-info {
    p {
      font-size: 13px;
      line-height: 22px;
    }
  }
  .weather-temp {
      margin-left: auto;
      align-self: flex-start;
    display: flex;
    align-items: flex-start;
    padding-top: 15px;
    p {
        color: white;
        font-size: 10px;
        font-weight: bold;
        width: 40px;
        height: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 2px;
    }
  }
}


.cold {
  background: blue;
  color: white;
}
.warm {
  background: green;
}
.hot {
  background: orange;
}
.very-hot {
  background: red;
}
</style>