<script setup lang="ts">

import { ref } from 'vue';
import { PlaceRecord } from './type';
import { GoogleMap, Marker, MarkerCluster } from "vue3-google-map";

import SearchBar from './SearhBar.vue';
import Records from './Records.vue';

const location = ref("");
const records = ref<PlaceRecord[]>([]);
const center = ref({ lat: 43.651070, lng: -79.347015 });
const apiKey = import.meta.env.VITE_GOOGLE_API;

const getLocation = async() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async(position) => {
      const response = await fetch(import.meta.env.VITE_SERVER_HOST + '/getLocation/' + position.coords.latitude + '/'+ position.coords.longitude);
      const place = (await response.json()).results[0];
      location.value = place.formatted_address;
      center.value = place.geometry.location;
    });
  } else {
    console.log("Location not Supported.");
  }
}

const updateRecords = async(record: PlaceRecord) => {
  // Add into records
  records.value.push(record);
}

const deleteHandler = () => {
  records.value = [];
}

</script>

<template>
  <p> {{location}}</p>
  <button @click="getLocation"> Get Current Locaiton</button>
  <SearchBar :searchCallBack="updateRecords"></SearchBar>
  <Records :records=records></Records>
  <button id="delete-button" @click="deleteHandler">Delete</button>

  <GoogleMap
    :api-key= "apiKey"
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
