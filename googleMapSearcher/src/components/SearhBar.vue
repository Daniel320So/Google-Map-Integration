<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ apiKey: string, searchCallBack: Function }>()
const text = ref('');

const searchHandler = async() => {
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
