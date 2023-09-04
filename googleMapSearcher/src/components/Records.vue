<script setup lang="ts">
import { ref, watch } from 'vue'
import { PlaceRecord } from './type';

const props = defineProps<{ records: PlaceRecord[], deleteHandler: Function }>()
const records = ref<PlaceRecord[]>([]);
const maxItemPerPage = 10;
const currentPage = ref(1);
const checkedPlaces = ref<string[]>([]);

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

const onClickDeleteHandler = () => {
    const newRecords = props.records.filter( r => !checkedPlaces.value.includes(r.place_id));
    props.deleteHandler(newRecords);
}

watch(() => props.records.length, () => {
    updateRecords()
});

</script>

<template>
    <div id="records-container">
        <button id="delete-button" @click="onClickDeleteHandler">Remove Selected</button>
        <div class="pagination" v-if="props.records && props.records.length > maxItemPerPage">
            <a href="#" v-if="currentPage !== 1" @click="prevPageHandler">&laquo;</a>
            <a href="#" v-for=" n in Math.ceil(props.records.length / maxItemPerPage)" @click="updatePageHandler(n)">{{ n }}</a>
            <a href="#" v-if="currentPage !== Math.ceil(props.records.length / maxItemPerPage)" @click="nextPageHandler">&raquo;</a>
        </div>
        <div class="record" v-for="item in records">
            <input type="checkbox" :id=item.place_id :name=item.name :value=item.place_id v-model="checkedPlaces">
            <div class="record-data">
                <h3>{{ item.name }}</h3>
            </div>
        </div>
    </div>
</template>

<style scoped>
#records-container {
    display: flex;
    flex-flow: column nowrap;
}

.pagination {
    width: 100%;
    align-self: flex-end;
    margin-right: 5%;
    display:flex;
    flex-flow: row wrap;
    justify-content: flex-end;
    gap: 2%
}

.record {
    display:flex;
    flex-flow: row wrap;
    align-items: center;
    gap: 3%;
}

#delete-button {
  align-self: flex-end;
  margin-right: 5%;
}

h3 {
    margin: 7px;
}
</style>
