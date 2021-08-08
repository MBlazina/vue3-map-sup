<template>
  <div v-if="markerSelected">
    <div class="info">
        <div>
            <h1>{{ name }}</h1>
            <p>{{ address }}</p>
            <div class="city-county">
                <p class="city">{{ city }} -</p>
                <p class="county">{{ county }}</p>
            </div>
        </div>
    </div>

    <p class="open" v-if="currTime >= openTime && currTime <= closeTime">
      Open now until {{ this.closeTime.toFixed(2) }}
    </p>
    <p class="open" v-else>Open tomorrow at {{ this.openTime.toFixed(2) }}-{{ this.closeTime.toFixed(2) }}</p>
  </div>
  <p class="no-store" v-else>Please select a store</p>
</template>

<script>
export default {
  props: ["name", "address", "city", "county", "markerSelected"],
  data() {
    return {
      currTime: new Date().getHours(),
      openTime: 8.0,
      closeTime: 16.0,
    };
  },
};
</script>

<style lang="scss">
.shop-info {
  background-color: white;
  padding: 22px 18px;
  display: flex;
  flex-direction: column;
}
.info {
    display: flex;
    &::before {
        width:24px;
        height: 24px;
        content: url('/images/ic_bet_shop_location.png');
        display: inline-block;
    }
}
.city-county {
    p {
        display: inline-block;
    }
}
.open {
    margin-top: auto;
    display: flex;
    align-items: center;
    &::before {
        width:24px;
        height: 25px;
        content: url('/images/ic_bet_shop_hours.png')
    }
}
.no-store {
  display: flex;
  justify-content: center;
  align-items: center;
}
h1,
p {
  font-size: 17px;
  font-weight: normal;
}
</style>