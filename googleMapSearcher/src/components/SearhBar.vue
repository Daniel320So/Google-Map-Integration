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
        localTime: new Date(Date.now() + data.rawOffset).toUTCString()
    }
}

</script>

<template>
    <div id="search-bar">
        <input type="text" v-model="text" v-on:keyup.enter="searchHandler" placeholder="Search locations" />
        <button @click="searchHandler"> Search </button>
        <div class="dropdown-content">
        <button v-for="item in items" @click="selectAddress(item)">
            <p class="dropdown-name">{{ item.name }}</p>
            <p class="dropdown-address">{{ item.formatted_address }}</p>
        </button>
    </div>
    </div>

    <div class="latest-search" v-if="latestSearch">
        <p>Last Search: {{ latestSearch?.name }}</p>
        <p>Time Zone: {{ latestSearch?.timeZone }}</p>
        <p>Local Time: {{ latestSearch?.localTime }}</p>
    </div>
</template>

<style scoped>

#search-bar {
    position: relative;
    height: 40px;
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    gap: 25px
}

#search-bar input {
    width: 70%;
}

.dropdown-content {
    position: absolute;
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    top: 50px;
    z-index: 1;
} 

.dropdown-content button {
    border-radius: 0;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
}

.dropdown-name {
    text-align: left;
    width: 30%;
    font-size: 1em;
    margin: 0;
}

.dropdown-address {
    text-align: left;
    width: 70%;
    font-size: 0.8em;
    margin: 0;
}

.latest-search {
    display: flex;
    flex-flow: row wrap;
    gap: 5%;
    font-size: 1em;
    margin: 0;
}

.latest-search p {
    margin: 0;
}

</style>
