<template>
  <div class="matches-view">
    <h1>Matches</h1>
    <div class="matches-container">
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MatchesView',
  data() {
    return {
      message: 'Welcome to Matches View'
    };
  }
};
</script>

<style scoped>
.matches-view {
  padding: 20px;
}

.matches-container {
  margin-top: 20px;
}

h1 {
  color: #333;
}
</style>
