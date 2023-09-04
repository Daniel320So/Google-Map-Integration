<script setup lang="ts">

import { ref } from 'vue';
import { PlaceRecord } from './type';
import SearchBar from './SearhBar.vue';
import { GoogleMap, Marker, MarkerCluster } from "vue3-google-map";

const location = ref("");
const records = ref<PlaceRecord[]>([]);
const center = ref({ lat: 40.689247, lng: -74.044502 });

const getLocation = async() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async(position) => {
      const response = await fetch('http://localhost:8888/getLocation/' + position.coords.latitude + '/'+ position.coords.longitude);
      const place = (await response.json()).results[0];
      location.value = place.formatted_address;
      center.value = place.geometry.location;
      console.log(center.value);
    });
  } else {
    console.log("Location not Supported.");
  }
}

const updateRecords = async(record: PlaceRecord) => {
  // Add into records
  if (records.value.length == 10 ) records.value.shift();
  records.value.push(record);
}

</script>

<template>
  <p> {{location}}</p>
  <button @click="getLocation"> Get Current Locaiton</button>
  <SearchBar :searchCallBack="updateRecords"></SearchBar>
  <div id="map"></div>

  <GoogleMap
    api-key="AIzaSyAgFPgty4KEvkL4MGJO51x45Mb8Y_jnGyw"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="15"
  >
  <MarkerCluster>
      <Marker
        :options="{position: m.geometry.location}"
        v-for="(m) in records"
      />
    </MarkerCluster>
  </GoogleMap>


</template>

<style scoped>

#map {
  height: 100%;
}

</style>
