<script setup lang="ts">

import { ref } from 'vue';
import { PlaceRecord } from './type';
import { GoogleMap, Marker, MarkerCluster, CustomMarker } from "vue3-google-map";

import SearchBar from './SearhBar.vue';
import Records from './Records.vue';

const location = ref("");
const currentLocation = ref();
const records = ref<PlaceRecord[]>([]);
const center = ref({ lat: 43.651070, lng: -79.347015 });
const apiKey = import.meta.env.VITE_GOOGLE_API;

const getLocation = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const response = await fetch(import.meta.env.VITE_SERVER_HOST + '/getLocation/' + position.coords.latitude + '/' + position.coords.longitude);
      const place = (await response.json()).results[0];
      location.value = place.formatted_address;
      center.value = place.geometry.location;
      currentLocation.value = place.geometry.location;
    });
  } else {
    console.log("Location not Supported.");
  }
}

const updateRecords = async (record: PlaceRecord) => {
  // Add into records
  if (!records.value.find( r => r.place_id == record.place_id)) {
    records.value.push(record);
    center.value = record.geometry.location;
  } 
}

const deleteHandler = (newRecords: PlaceRecord[]) => {
  records.value = newRecords;
}

</script>

<template>
  <div id="current-location">
    <p v-if="location"> Current Location: {{ location }}</p>
    <button @click="getLocation"> Get Current Locaiton</button>
  </div>
  <SearchBar :searchCallBack="updateRecords"></SearchBar>
  <div id="record-map-container">
    <div id="record-wrapper">
      <Records :records=records :deleteHandler="deleteHandler"></Records>
    </div>
    <GoogleMap class="map" :api-key="apiKey" :center="center" :zoom="12">
      <MarkerCluster>
        <Marker :options="{ position: m.geometry.location }" v-for="(m) in records" />
        <CustomMarker :options="{ position: currentLocation }" v-if="currentLocation">
          <img src="http://maps.google.com/mapfiles/ms/icons/blue-dot.png" />
      </CustomMarker>
      </MarkerCluster>
    </GoogleMap>
  </div>
</template>

<style scoped>
#current-location {
    display: flex;
    flex-flow: row wrap;
    align-items: center; 
    gap: 5%
}

#current-location p {
    margin: 0;
}

#record-map-container {
  display: flex;
  flex-flow: row nowrap;
}

#record-map-container #record-wrapper {
  width: 30%;
}

#record-map-container .map {
  width: 70%;
  height: 600px;
}

#record-wrapper {
  display: flex;
  flex-flow: column nowrap;
}
</style>
