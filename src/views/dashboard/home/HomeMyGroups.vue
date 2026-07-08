<template>
  <div>
    <div class="header">
      <n-icon size="18">
        <Users />
      </n-icon>
      <NH3>
        Mis Grupos
      </NH3>

      <RouterLink to="/dashboard/groups" class="more">
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
    <NSpin :show="localLoading">
      <NEmpty v-if="localGroups.length === 0" description="No perteneces a ningún grupo" />

      <NGrid v-else cols="1 s:1 m:1 l:2" responsive="screen" :x-gap="16" :y-gap="16" class="groups">
        <NGridItem v-for="group in localGroups" :key="group.group_id">
          <NCard hoverable class="group-card" @click="openGroup(group.group_id)" :title="group.name">
            <template #header-extra>
              <n-tag type="success" size="small" round>
                Activo
              </n-tag>
            </template>
            <div class="card-content">

              <NText depth="2">
                {{ group.users_limit }}
                participantes
              </NText>

            </div>
          </NCard>

        </NGridItem>
      </NGrid>
    </NSpin>

  </div>
</template>
<script setup lang="ts">
import { Users, MoveRight } from '@lucide/vue';
import { RouterLink } from 'vue-router';
import type { Group } from '../../../interfaces/group';
const { localLoading, localGroups } = defineProps<{
  localLoading: boolean,
  localGroups: Group[]
}>()

const emit = defineEmits<{
  'openGroup': [value: string]
}>()


const openGroup = (groupId: string) => {
  emit('openGroup', groupId)
}
</script>
<style scoped lang="css">
.groups {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  cursor: pointer;
}

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
