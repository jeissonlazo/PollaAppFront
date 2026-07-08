<template>
  <div class="home-resume">
    <n-card size="small">
      <template #header>
        <n-icon>
          <Users />
        </n-icon>
        Mis Grupos
      </template>
      <h2 style="margin: 0;">{{ groupsCount }}</h2>
    </n-card>
    <n-card size="small">
      <template #header>
        <n-icon>
          <Trophy />
        </n-icon>
        <span>
          Torneos
        </span>
      </template>
      <h2 style="margin: 0;">0</h2>
    </n-card>

    <n-card size="small">
      <template #header>
        <n-icon>
          <Star />
        </n-icon>
        Puntuacion promedio
      </template>
      <h2 style="margin: 0;">87%</h2>
    </n-card>

  </div>
</template>
<script setup lang="ts">
import { Trophy, Users, Star } from '@lucide/vue'
const props = defineProps({
  groupsCount: {
    type: Number,
    required: true
  }
})
</script>
<style scoped lang="css">
.home-resume {
  margin-bottom: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}
</style>