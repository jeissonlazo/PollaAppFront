<template>
  <NCard class="home-header">
    <div class="header-content">
      <div class="header-title">
        <h1>Bienvenido, {{ authStore.user?.username }}</h1>
        <p>Gestiona tus grupos y proyectos de manera eficiente.</p>
      </div>
      <div class="header-actions">
        <NButton @click="handleCreateGroup" type="primary" size="large" style="margin-right: 8px;">
          <template #icon>
            <NIcon>
              <Plus />
            </NIcon>
          </template>
          Crear Grupo
        </NButton>
        <NButton @click="handleJoinGroup" type="default" size="large">
          <template #icon>
            <NIcon>
              <Users />
            </NIcon>
          </template>
          Unirse a un Grupo
        </NButton>
      </div>
    </div>
  </NCard>
</template>
<script setup lang="ts">
import { useAuthStore } from '../../../stores/authStore'
import { NCard, NButton, NIcon } from 'naive-ui'
import { Plus, Users } from '@lucide/vue'
const authStore = useAuthStore()

const props = defineProps({
  onCreateGroup: {
    type: Function,
    required: true
  },
  onJoinGroup: {
    type: Function,
    required: true
  }
})

const handleCreateGroup = () => {
  props.onCreateGroup()
}

const handleJoinGroup = () => {
  // Lógica para unirse a un grupo
  props.onJoinGroup()
}
</script>

<style lang="css" scoped>
.home-header {
  margin-bottom: 24px;
}
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>