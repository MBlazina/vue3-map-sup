<template>
<div v-if="markerSelected">
    <h1>{{ name }}</h1>
    <h2>{{ address }}</h2>
    <h3>{{ city }}</h3>
    <h3>{{ county }}</h3>
    
    <h1 v-if="currTime >= openTime && currTime <= closeTime"> Open now until {{this.closeTime}}</h1>
    <h1 v-else> Open tomorrow at {{this.openTime}}</h1>
</div>
<p v-else>Please select a store</p>
</template>

<script>
export default {
  props: [
      "name",
      "address",
      "city",
      "county",
      "markerSelected"
  ],
  data() {
      return {

          currTime: new Date().getHours(),
          openTime: 8.00,
          closeTime: 16.00
      }
  }
};
</script>

<style>
</style>