<template>
  <h1>VUE</h1>
  <p>{{ userPositionLat }}</p>
  <p>{{ userPositionLng }}</p>

</template>

<script>

export default {
  name: 'Map',
  props: {},

  


  data() {
    return {
        userPositionLat: 48.137154,
        userPositionLng: 11.576124,

        responseData: {},
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
  const fetchURL = 'https://interview.superology.dev/betshops?boundingBox=' + top + ',' + left + ',' + right + ',' + bottom;
  this.responseData = (await (await fetch(fetchURL)).json())
},

   initLocation() {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async success => {
            this.userPositionLat = success.coords.latitude;
            this.userPositionLng = success.coords.longitude;

            await this.loadBetshops();
            console.log(this.responseData);
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

    initMap(){
     /*  axios.get('https://interview.superology.dev/betshops?boundingBox=48.16124,11.60912,48.12229,11.52741')
      .then
        const fetchURL = 'https://interview.superology.dev/betshops?boundingBox=48.16124,11.60912,48.12229,11.52741';
        return (await (await fetch(fetchURL)).json()) */
    /*   let data = [];
      try {
        data = await loadBetshops();
      } catch (err) {
        console.log('error fetching betshops');
        console.log(err)
      }
      console.log(data.betshops[0].location.lng) */


 /*  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 48.137154, lng: 11.576124},
    zoom: 15,
    mapId: '9c9a577a7bea1f19'
  });

  for(let i = 0; i < data.betshops.length; i++){
    const myLatLng = new google.maps.LatLng(data.betshops[i].location.lat, data.betshops[i].location.lng);
    new google.maps.Marker({
      position: myLatLng,
      map: map,
      icon: 'assets/images/ic_pin_active.png',
      title: "Hello World!",
      type: 'betshop'
    });
  } */
}

  },
async mounted(){
  await this.initLocation();

 },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
