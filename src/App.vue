<template>
  <Map />
  <MarkerInfo markerText=""/>
</template>

<script>
import Map from './components/Map'
import MarkerInfo from './components/MarkerInfo'

export default {
  name: 'App',
  components: {
    Map,
    MarkerInfo
  }

}
</script>

<style lang="scss">
#app {

}
</style>
