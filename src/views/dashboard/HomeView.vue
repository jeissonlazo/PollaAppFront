<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
    NCard,
    NGrid,
    NGridItem,
    NH2,
    NText,
    NEmpty,
    NSpin,
    useMessage

} from 'naive-ui'
import { useGroupStore } from '../../stores/groupStore'
import type { Group } from '../../interfaces/group'
import { useAuthStore } from '../../stores/authStore'
import CreateGroupDialog from '../../components/CreateGroupDialog.vue'
import JoinGroupDialog from '../../components/groups/JoinGroupDialog.vue'
const groupStore = useGroupStore()
const showCreateDialog = ref(false)
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const message = useMessage()

const localLoading = ref(false)
const showJoinDialog = ref(false)
const localGroups = ref<Group[]>([])
const code = route.params.code as string | undefined
const loadGroups = async () => {
    localLoading.value = true
    try {
        // TODO:
        await groupStore.loadGroups(authStore.user?.id || '')

        localGroups.value = groupStore.groups
    } finally {
        localLoading.value = false
    }
}

const openGroup = (groupId: string) => {
    router.push(`/dashboard/groups/${groupId}`)
}
const handleCreateGroup = () => {
    showCreateDialog.value = true
}

const handleJoinGroup = () => {
    showJoinDialog.value = true
}

const handleJoinWithCode = async () => {
    if (!code) return
    showJoinDialog.value = true
}

const handleGroupJoined = async (inviteCode: string) => {
    if (!code) return
    if (!authStore.user) return
    try {
        await groupStore.joinGroup(inviteCode, authStore.user.id)
        message.success('¡Te has unido al grupo exitosamente!')
        removePathParam()
    }
    catch {
        message.error('No fue posible unirse al grupo con el código proporcionado')
    }
    finally {
        loadGroups()
    }
}

const removePathParam = () => {
    router.replace({
        name: 'home',
        params: {}
    })
}
onMounted(() => {
    loadGroups()
    handleJoinWithCode()
})
</script>

<template>
    <div class="container">

        <div class="header">
            <NH2>Mis Grupos</NH2>
            <div class="actions">
                <NButton type="primary" @click="handleCreateGroup">
                    Crear Grupo
                </NButton>

                <NButton secondary @click="handleJoinGroup">
                    Unirse a un Grupo
                </NButton>
            </div>
        </div>

        <NSpin :show="localLoading">

            <NEmpty v-if="localGroups.length === 0" description="No perteneces a ningún grupo" />

            <NGrid v-else cols="1 s:2 m:3 l:4" responsive="screen" :x-gap="16" :y-gap="16">
                <NGridItem v-for="group in localGroups" :key="group.group_id">
                    <NCard hoverable class="group-card" @click="openGroup(group.group_id)">
                        <div class="card-content">

                            <NText depth="3">
                                {{ group.eventName }}
                            </NText>

                            <h3>
                                {{ group.name }}
                            </h3>

                            <NText depth="2">
                                {{ group.members }}
                                participantes
                            </NText>

                        </div>
                    </NCard>

                </NGridItem>
            </NGrid>
        </NSpin>
        <CreateGroupDialog v-model:show="showCreateDialog" />
        <JoinGroupDialog v-model:show="showJoinDialog" :url-code="code" @join="handleGroupJoined" />
    </div>
</template>

<style scoped>
.container {
    padding: 24px;
}

.header {
    margin-bottom: 24px;
}

.group-card {
    cursor: pointer;
    transition: transform 0.2s;
}

.group-card:hover {
    transform: translateY(-4px);
}

.card-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.card-content h3 {
    margin: 0;
}

.header {
    margin-bottom: 24px;

    display: flex;
    justify-content: space-between;
    align-items: center;
}

.actions {
    display: flex;
    gap: 12px;
}
</style>