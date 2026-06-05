<script setup lang="ts">
import { RouterView } from 'vue-router'
import DashboardHeader from './DashboardHeader.vue'
</script>

<template>
    <div class="dashboard-layout">

        <DashboardHeader />

        <main class="content">
            <RouterView />
        </main>

    </div>
</template>

<style scoped>
.dashboard-layout {
    min-height: 100vh;
}

.header {
    height: 64px;
    border-bottom: 1px solid #eee;
    padding: 0 24px;

    display: flex;
    align-items: center;
}

.content {
    padding: 24px;
}
</style>