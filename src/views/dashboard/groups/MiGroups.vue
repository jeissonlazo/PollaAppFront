<template>
  <NH2 depth="2" class="title">
    Mis Grupos
  </NH2>

  <NGrid  cols="1 s:1 m:2 l:3" responsive="screen" :x-gap="16" :y-gap="16" class="groups">
    <NGridItem v-for="group in groups" :key="group.group_id">
      <MiGroupCard  :group="group"/>
    </NGridItem>

  </NGrid>

  <NEmpty v-if="groups.length === 0" description="No perteneces a ningún grupo" />

  <NGrid v-else cols="1 s:1 m:1 l:2" responsive="screen" :x-gap="16" :y-gap="16" class="groups">
    

    <NGridItem v-for="group in groups" :key="group.group_id">
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
</template>
<script lang="ts" setup>
import { NH2 } from 'naive-ui'
import { useGroupStore } from '../../../stores/groupStore'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useAuthStore } from '../../../stores/authStore'
import { storeToRefs } from 'pinia'
import { useLoadingBar } from 'naive-ui'
//components
import  MiGroupCard from './MiGroupCard.vue'
const groupsStore = useGroupStore()
const { groups } = storeToRefs(groupsStore)
const authStore = useAuthStore()
const router = useRouter()
const loadingBar = useLoadingBar()
const openGroup = (groupId: string) => {
  router.push(`/dashboard/groups/${groupId}`)
}
onMounted(async () => {
  loadingBar.start()
  await groupsStore.loadGroups(authStore.user?.id || '', true)
  loadingBar.finish()
})
</script>