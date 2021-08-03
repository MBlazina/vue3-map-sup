<template>
  <h1>VUE</h1>
  <p>{{ userPositionLat }}</p>
  <p>{{ userPositionLng }}</p>

  <GMapMap
      :center="center"
      :zoom="12"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
  >
    <GMapCluster>
      <GMapMarker
          :key="index"
          v-for="(m, index) in responseData.betshops"
          :position="m.location"
          :clickable="true"
          :draggable="true"
          :icon="'images/ic_pin_normal.png'"
          @click="openMarker(m.id)"
      >
<GMapInfoWindow
        :opened="openedMarkerID === m.id"
      >
        <div>I am in info window {{ m.id }} </div>
      </GMapInfoWindow>
      </GMapMarker>
    </GMapCluster>
  </GMapMap>

<div ref="map"></div>
</template>

<script>

export default {
  name: 'Map',
  props: ['btnText'],

  data() {
    return {
openedMarkerID: null,
        center: {lat: 48.137154, lng: 11.576124},
        responseData: {},
    };
},
  methods: {
      openMarker(id) {
       this.openedMarkerID = id
       console.log(this.openedMarkerID);

      /*  const currentMarker = JSON.parse(this.responseData.betshops).filter( element => element.id == 2350329);
console.log(currentMarker); */
console.log(this.responseData);

this.responseData.betshops.forEach(function (element) {
    if(element['id'] === id){
        console.log('found', element)
    }
})

    },
    async loadBetshops() {
      const offset = 0.03
      const top = this.center.lat + offset
      const left = this.center.lng + offset
      const right = this.center.lat - offset
      const bottom = this.center.lng - offset
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
          },
          async error => {
            console.log(error);
            await this.loadBetshops();
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
