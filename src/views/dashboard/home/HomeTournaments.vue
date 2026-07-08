<template>
  <div>
    <div class="header">
      <n-icon size="18">
        <Trophy />
      </n-icon>
      <NH3>
        Torneos Disponibles
      </NH3>

      <RouterLink to="/tournaments" class="more">
        <n-button quaternary type="info" icon-placement="right">
          Ver todos
          <template #icon>
            <n-icon size="18">
              <MoveRight />
            </n-icon>
          </template>
        </n-button>
      </RouterLink>
    </div>
    <NCard class="home-tournaments" v-for="value in tournaments">
      <div class="tournaments-content">
        <h2>{{ value.name }}</h2>
        <p>{{ value.description }}</p>

      </div>
      <template #footer>
        <p>
          <n-icon size="18" >
            <Calendar />
          </n-icon>
          <span style="margin-left: 8px; margin-top: 8px;">
            inicia {{ new Date(value.startDate).toLocaleDateString() }}
          </span>
        </p>
      </template>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { Trophy, MoveRight, Calendar } from '@lucide/vue'
const { tournaments } = defineProps<{
  tournaments: any[]
}>()
</script>
<style scoped lang="css">
.header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 16px;
}

.more {
  margin-top: 8px;
  margin-left: auto;
}
</style>
