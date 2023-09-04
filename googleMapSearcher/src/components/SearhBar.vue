<script setup lang="ts">
import { ref } from 'vue'
import { PlaceRecord } from './type';

const props = defineProps<{ searchCallBack: Function }>()
const text = ref('');
const items = ref<PlaceRecord[]>([]);

const searchHandler = async() => {
    const response = await fetch('http://localhost:8888/search/' + text.value);
    const results  = await response.json();
    items.value = results;
    props.searchCallBack(results);
}

const selectAddress = async(place: PlaceRecord) => {
    const obj = JSON.parse(JSON.stringify(place));
    props.searchCallBack(obj);
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
</template>

<style scoped>

.dropdown-content {
    display: flex;
    flex-flow: column nowrap;
}

</style>
