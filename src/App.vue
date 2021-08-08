<template>
  <GMapMap
    class="map"
    :center="center"
    :zoom="12"
    map-type-id="terrain"
    style=""
  >
    <GMapCluster>
      <GMapMarker
        :key="index"
        v-for="(m, index) in responseData.betshops"
        :position="m.location"
        :clickable="true"
        :draggable="true"
        :icon="m.id === selectedMarker.id ? 'images/ic_pin_active.png' : 'images/ic_pin_normal.png'"  
        @click="openMarker(m.id)"
      >
        <!-- <GMapInfoWindow :opened="openedMarkerID === m.id">
            <div>I am in info window {{ m.id }}</div>
          </GMapInfoWindow> -->
      </GMapMarker>
    </GMapCluster>
  </GMapMap>
  <MarkerInfo
    class="shop-info"
    :name="selectedMarker.name"
    :address="selectedMarker.address"
    :city="selectedMarker.city"
    :county="selectedMarker.county"
    :markerSelected="markerInfo"
  />
  <Weather class="weather" :cityLat="center.lat" :cityLng="center.lng" />
</template>

<script>
import MarkerInfo from "./components/MarkerInfo";
import Weather from "./components/Weather.vue";

export default {
  name: "App",
  components: {
    MarkerInfo,
    Weather,
  },
  data() {
    return {
      center: {
        lat: 48.137154,
        lng: 11.576124,
      },
      openedMarkerID: null,
      responseData: {},
      selectedMarker: {},
      markerInfo: false,
    };
  },
  methods: {
    initLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (success) => {
            this.center.lat = success.coords.latitude;
            this.center.lng = success.coords.longitude;
            await this.loadBetshops();
          },
          async (error) => {
            console.log(error);
            await this.loadBetshops();
          }
        );
      } else {
        console.log("browser not supproting geolocation API");
      }
    },
    async loadBetshops() {
      const offset = 0.03;
      const top = this.center.lat + offset;
      const left = this.center.lng + offset;
      const right = this.center.lat - offset;
      const bottom = this.center.lng - offset;
      const fetchURL = `https://interview.superology.dev/betshops?boundingBox=${top},${left},${right},${bottom}`;

      this.responseData = await (await fetch(fetchURL)).json();
    },

    async openMarker(id) {
      this.markerInfo = true;
      this.openedMarkerID = id;
      this.selectedMarker = this.responseData.betshops.find(
        (shop) => shop.id === this.openedMarkerID
      );
    },
  },

  async mounted() {
    await this.loadBetshops();
    await this.initLocation();
  },
};
</script>

<style lang="scss">
@import './scss/_colors.scss';

/* GMAP RESET */
.gmnoprint,
.gm-fullscreen-control {
  display: none;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: $lightGrey;
  font-family: 'Lato', sans-serif;
  color: $darkGrey;
}
#app {
  display: grid;
  grid-template-columns: 400px 315px;
  align-items: start;
  justify-content: center;
  grid-gap: 15px;
  padding-top: 65px;
}
.map,
.shop-info,
.weather {
  box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.2);
}
.map {
  border: 2px solid white;
  grid-row: 1 / span 2;
  grid-column: 1 / span 1;
  &.vue-map-container {
    height: 100%;
  }
}
.shop-info {
  min-height: 195px;
  grid-row: 1 / span 1;
  grid-column: 2 / span 1;
}
.weather {
  grid-row: 2 / span 1;
  grid-column: 2 / span 1;
}
</style>
