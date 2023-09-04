<script setup lang="ts">
import { ref } from 'vue'
import { PlaceRecord } from './type';

const props = defineProps<{ records: PlaceRecord[] }>()
const records = ref<PlaceRecord[]>();
const maxItemPerPage = 2;
const currentPage = ref(1);

const prevPageHandler = () => {
    currentPage.value = currentPage.value - 1;
    records.value = props.records.slice((currentPage.value-1)*maxItemPerPage,(currentPage.value-1)*maxItemPerPage + maxItemPerPage);
    updateRecords();
}

const nextPageHandler = () => {
    currentPage.value = currentPage.value + 1;
    updateRecords();
}

const updatePageHandler = (n: number) => {
    currentPage.value = n;
    updateRecords();
}

const updateRecords = () => {
    records.value = props.records.slice((currentPage.value-1)*maxItemPerPage,(currentPage.value-1)*maxItemPerPage + maxItemPerPage);
}

</script>

<template>
    <div id="records-container">
        <div class="pagination" v-if="records.length > maxItemPerPage">
            <a href="#" v-if="currentPage !== 1" @click="prevPageHandler">&laquo;</a>
            <a href="#" v-for=" n in Math.ceil(records.length / maxItemPerPage)" @click="updatePageHandler(n)">{{ n }}</a>
            <a href="#" v-if="currentPage !== Math.ceil(records.length / maxItemPerPage)" @click="nextPageHandler">&raquo;</a>
        </div>
        <div class="record" v-for="item in records">
            <input type="checkbox" :id=item.place_id :name=item.name :value=item>
            <div class="record-data">
                <h2>{{ item.name }}</h2>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
