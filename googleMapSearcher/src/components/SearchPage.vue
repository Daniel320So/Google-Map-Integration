<script setup lang="ts">
import { ref } from 'vue'
import SearchBar from './SearhBar.vue';

const location = ref("");

const getLocation = async() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async(position) => {
      const response = await fetch('http://localhost:8888/getLocation/' + position.coords.latitude + '/'+ position.coords.longitude);
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
  <SearchBar :searchCallBack="updateRecords"></SearchBar>
</template>

<style scoped>
</style>
