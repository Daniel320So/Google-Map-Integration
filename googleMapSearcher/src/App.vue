<script setup lang="ts">
import SearchPage from './components/SearchPage.vue'
const apiKey: string = import.meta.env.VITE_GOOGLE_API;
</script>

<template>
  <SearchPage :apiKey="apiKey" />
</template>

<style scoped>
</style>
