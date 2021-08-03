<template>
  <h1>VUE</h1>
  <p>{{ userPositionLat }}</p>
  <p>{{ userPositionLng }}</p>

  <GMapMap
      :center="center"
      :zoom="7"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
  >
    <GMapCluster>
      <GMapMarker
          :key="index"
          v-for="(r, index) in responseData.betshops"
          :position="r.location"
          :clickable="true"
          :draggable="true"
          @click="center=r.location"
      />
    </GMapCluster>
  </GMapMap>

<div ref="map"></div>
</template>

<script>

export default {
  name: 'Map',
  props: {},

  data() {
    return {

        center: {lat: 48.137154, lng: 11.576124},
      markers: [
        {
          position: {
            lat: 51.093048, lng: 6.842120
          },
        }
        , // Along list of clusters
      ],

        userPositionLat: 48.137154,
        userPositionLng: 11.576124,

        responseData: {},
        responseMAP: {},
        apiKey: process.env.VUE_APP_GMAP_API_KEY,
      mapConfig: {
        zoom: 16,
        center: {
          lat: -7,
          lng: 112
        }
      }
    };
},
  methods: {
    async loadBetshops() {
      const offset = 0.03
      const top = this.userPositionLat + offset
      const left = this.userPositionLng + offset
      const right = this.userPositionLat - offset
      const bottom = this.userPositionLng - offset
/*   const fetchURL = 'https://interview.superology.dev/betshops?boundingBox=' + top + ',' + left + ',' + right + ',' + bottom; */
  const fetchURL = `https://interview.superology.dev/betshops?boundingBox=${top},${left},${right},${bottom}`

  this.responseData = (await (await fetch(fetchURL)).json())



},

   initLocation() {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async success => {
            this.center.lat = success.coords.latitude;
            this.center.lng = success.coords.longitude;

            await this.loadBetshops();
            console.log(this.responseData.betshops[0]);
          },
          async error => {
            console.log(error);
            await this.loadBetshops();
            console.log(this.responseData);
          }
        );
      } else {
        console.log('browser not supproting geolocation API');
      }
    },

  },
async mounted(){
  await this.initLocation();



 },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
