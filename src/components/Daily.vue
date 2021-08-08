<template>
  <div class="row" :class="{'today':isToday}">
      <p>{{getDay()}} <span v-if="isToday">(today)</span></p>
      <h2 :class="setTempColor(forecast.temp.min)">{{forecast.temp.min}}</h2>
      <h2 :class="setTempColor(forecast.temp.max)">{{forecast.temp.max}}</h2>

  </div>
</template>

<script>
import moment from 'moment'

export default {
    data(){
        return{
            currentForecastDate: moment.unix(this.forecast.dt),
            currentTempMin: this.forecast.temp.min,
            currentTempMax: this.forecast.temp.mmax
        }
    },
    
 props: [
     "forecast"
 ],
 methods: {
     getDay(){
         return this.currentForecastDate.format("ddd DD MMM")
     },
     setTempColor(temp){
         if(temp < 14){
             return "cold"
         } else if(temp >= 14 && temp <= 20){
             return "warm"
         } else if(temp > 20 && temp <= 25){
             return "hot"
         } else if(temp > 25){
             return "very-hot"
         }
     }
 },
 computed:{
     isToday(){
         return(this.currentForecastDate.isSame(moment(), 'day'))
     },

     
 }
}
</script>

<style lang="scss" scoped>
    
    .row{
        background: coral;
    }
    .row:nth-child(odd){
        background: cadetblue;
    }
    .today{
        background: red;
    }
    .cold{
        background: blue;
        color: white;
    }
    .warm{
        background: green;
    }
    .hot{
        background: orange;
    }
    .very-hot {
        background: red;
    }
    
</style>