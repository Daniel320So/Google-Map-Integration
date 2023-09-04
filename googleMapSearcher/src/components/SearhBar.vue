<script setup lang="ts">
import { ref } from 'vue'
import { PlaceRecord } from './type';

const props = defineProps<{ searchCallBack: Function }>()
const text = ref('');
const items = ref<PlaceRecord[]>([]);
const latestSearch = ref<{
    name: string;
    timeZone: string;
    localTime: string;
}>();

const searchHandler = async() => {
    const response = await fetch(import.meta.env.VITE_SERVER_HOST + '/search/' + text.value);
    const results  = await response.json();
    items.value = results;
}

const selectAddress = async(place: PlaceRecord) => {
    const obj = JSON.parse(JSON.stringify(place));
    props.searchCallBack(obj);
    items.value = [];

    const timeResponse = await fetch(import.meta.env.VITE_SERVER_HOST + '/time/' +
        Math.floor(Date.now()/1000) + '/' + 
        place.geometry.location.lat + '/' +
        place.geometry.location.lng)
    
    const data = await timeResponse.json();
    latestSearch.value = {
        name: place.name,
        timeZone: data.timeZoneName,
        localTime: new Date(Date.now() + data.rawOffset).toTimeString()
    }
}

</script>

<template>
    <div id="search-bar">
        <input type="text" v-model="text" v-on:keyup.enter="searchHandler" placeholder="Search locations" />
        <button @click="searchHandler"> Search </button>
    </div>
    <div class="dropdown-content">
        <button v-for="item in items" @click="selectAddress(item)">
            <p>{{ item.name }}</p>
            <p>{{ item.formatted_address }}</p>
        </button>
    </div>
    <div class="latest-search" v-if="latestSearch">
        <p>Last Search: {{ latestSearch?.name }}</p>
        <p>Time Zone: {{ latestSearch?.timeZone }}</p>
        <p>Local Time: {{ latestSearch?.localTime }}</p>
    </div>
</template>

<style scoped>

.dropdown-content {
    display: flex;
    flex-flow: column nowrap;
}

</style>
