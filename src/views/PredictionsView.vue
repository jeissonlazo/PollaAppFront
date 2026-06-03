<template>
  <div class="predictions-view">
    <h1>Predictions</h1>
    <p v-if="loading">Loading...</p>
    <ul v-else>
      <li v-for="(item, index) in predictions" :key="index">
        {{ item }}
      </li>
    </ul>
    <button @click="refresh">Refresh</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const loading = ref(false)
const predictions = ref([])

function fetchPredictions() {
  loading.value = true
  // placeholder: replace with real API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['Prediction A', 'Prediction B', 'Prediction C'])
    }, 500)
  })
}

async function refresh() {
  const data = await fetchPredictions()
  predictions.value = data
  loading.value = false
}

onMounted(() => {
  refresh()
})
</script>

<style scoped>
.predictions-view {
  padding: 16px;
  font-family: Arial, sans-serif;
}

h1 {
  margin: 0 0 8px 0;
}

button {
  margin-top: 12px;
}
</style>
