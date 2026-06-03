<template>
  <div class="home">
    <h1>Welcome to Home</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      message: 'This is the home page'
    }
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
  text-align: center;
}

h1 {
  color: #333;
  margin-bottom: 10px;
}

p {
  color: #666;
  font-size: 16px;
}
</style>
