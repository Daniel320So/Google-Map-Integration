<script setup lang="ts">
import { ref } from 'vue'
import SearchBar from './SearhBar.vue';

defineProps<{ apiKey: string }>()

const location = ref("");

const getLocation = async() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async(position) => {
      const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude+ ','+ position.coords.longitude + '&key='+ apiKey);
      location.value = (await response.json()).results[0].formatted_address;
    });
  } else {
    console.log("Location not Supported.");
  }
}

const updateRecords = async(keyword: string) => {
  console.log(keyword);
}

</script>

<template>
  <p> {{location}}</p>
  <button @click="getLocation"> Get Current Locaiton</button>
  <SearchBar :apiKey="$props.apiKey"  :searchCallBack="updateRecords"></SearchBar>
</template>

<style scoped>
</style>
