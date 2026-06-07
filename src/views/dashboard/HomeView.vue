<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
    NCard,
    NGrid,
    NGridItem,
    NH2,
    NText,
    NEmpty,
    NSpin
} from 'naive-ui'
import { useGroupStore } from '../../stores/groupStore'
import type { Group } from '../../interfaces/group'
import { useAuthStore } from '../../stores/authStore'
import CreateGroupDialog from '../../components/CreateGroupDialog.vue'
const groupStore = useGroupStore()
const showCreateDialog = ref(false)
const authStore = useAuthStore()
const router = useRouter()

const localLoading = ref(false)

const localGroups = ref<Group[]>([])

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
    router.push(`/groups/${groupId}`)
}

const handleCreateGroup = () => {
    showCreateDialog.value = true
}

const handleJoinGroup = () => {
    router.push('/dashboard/groups/join')
}
onMounted(loadGroups)
</script>

<template>
    <div class="container">

        <div class="header">
            <NH2>Mis Grupos</NH2>
            <div class="actions">
                <NButton
                    type="primary"
                    @click="handleCreateGroup"
                >
                    Crear Grupo
                </NButton>

                <NButton
                    secondary
                    @click="handleJoinGroup"
                >
                    Unirse a un Grupo
                </NButton>
            </div>
        </div>

        <NSpin :show="localLoading">

            <NEmpty
                v-if="localGroups.length === 0"
                description="No perteneces a ningún grupo"
            />

            <NGrid
                v-else
                cols="1 s:2 m:3 l:4"
                responsive="screen"
                :x-gap="16"
                :y-gap="16"
            >
                <NGridItem
                    v-for="group in localGroups"
                    :key="group.id"
                >
                    <NCard
                        hoverable
                        class="group-card"
                        @click="openGroup(group.id)"
                    >
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