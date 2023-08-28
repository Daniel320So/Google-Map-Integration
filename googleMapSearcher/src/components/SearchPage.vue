<script setup lang="ts">
import { ref } from 'vue'


const key = import.meta.env.VITE_GOOGLE_API;
defineProps<{ msg: string }>()
const location = ref("");

const getLocation = async() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async(position) => {
      const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude+ ','+ position.coords.longitude + '&key='+ key);
      console.log(response);
      location.value = (await response.json()).results[0].formatted_address;
      console.log(location);
      console.log(location.value);
    });
  } else {
    console.log("Not Supported.");
  }
}

</script>

<template>
  <h1>{{ msg }}</h1>
  <p> {{location}}</p>

  <button @click="getLocation"> Get Current Locaiton</button>


</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
