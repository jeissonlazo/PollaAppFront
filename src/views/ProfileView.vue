<template>
  <div class="profile-container">
    <h1>Profile</h1>
    <div class="profile-content">
      <p>Welcome to your profile page</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileView',
  data() {
    return {
    };
  },
  methods: {
  },
  mounted() {
  }
};
</script>

<style scoped>
.profile-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.profile-content {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
}
</style>