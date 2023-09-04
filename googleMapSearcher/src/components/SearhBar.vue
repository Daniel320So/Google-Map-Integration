<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ searchCallBack: Function }>()
const text = ref('');

const searchHandler = async() => {
    const response = await fetch('http://localhost:8888/search/' + text.value);
    const results  = await response.json();
    console.log(results);
    props.searchCallBack(text.value);
}

</script>

<template>
    <div class="search-bar">
        <input type="text" v-model="text" v-on:keyup.enter="searchHandler" placeholder="Search locations" />
        <button @click="searchHandler"> Search </button>
    </div>
</template>

<style scoped>
</style>
