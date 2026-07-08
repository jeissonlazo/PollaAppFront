<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
    useMessage
} from 'naive-ui'
import { useGroupStore } from '../../stores/groupStore'
import type { Group } from '../../interfaces/group'
import { useAuthStore } from '../../stores/authStore'
import CreateGroupDialog from '../../components/CreateGroupDialog.vue'
import JoinGroupDialog from '../../components/groups/JoinGroupDialog.vue'
import { useLoadingBar } from 'naive-ui'
//components
import HomeHeader from './home/HomeHeader.vue'
import HomeResume from './home/HomeResume.vue'
import HomeMyGroups from './home/HomeMyGroups.vue'
import HomeTournaments from './home/HomeTournaments.vue'
const groupStore = useGroupStore()
const showCreateDialog = ref(false)
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const message = useMessage()
const loadingBar = useLoadingBar()
const localLoading = ref(false)
const showJoinDialog = ref(false)
const localGroups = ref<Group[]>([])
const code = route.params.code as string | undefined
const tournaments = ref([
    {
        id: '1',
        name: 'Mundial FIFA 2026',
        description: 'El Mundial de Fútbol es el torneo internacional más importante del mundo, donde se enfrentan las selecciones nacionales de fútbol de diferentes países para determinar al campeón mundial.',
        startDate: '2026-06-08',
        endDate: '2026-07-08'
    }
])
const loadGroups = async () => {
    localLoading.value = true
    loadingBar.start()
    try {
        // TODO:
        await groupStore.loadGroups(authStore.user?.id || '')

        localGroups.value = groupStore.groups
    } finally {
        localLoading.value = false
    }
    loadingBar.finish()
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

        <HomeHeader @create-group="handleCreateGroup" @join-group="handleJoinGroup" />
        <HomeResume :groups-count="localGroups.length" />
        <div class="container__content">
            <HomeMyGroups :local-loading="localLoading" :local-groups="localGroups" @open-group="openGroup" />
            <HomeTournaments :tournaments="tournaments" />
        </div>
        <CreateGroupDialog v-model:show="showCreateDialog" />
        <JoinGroupDialog v-model:show="showJoinDialog" :url-code="code" @join="handleGroupJoined" />
    </div>
</template>

<style scoped >
.container {
    padding: 24px;
    max-width: 1200px;
    margin: 0 auto;
}
.container__content {
    margin-top: 24px;
    display: grid;
    grid-gap: 24px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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