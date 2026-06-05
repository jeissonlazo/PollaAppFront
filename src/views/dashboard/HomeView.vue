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

const router = useRouter()

interface UserGroup {
    id: number
    name: string
    eventName: string
    members: number
}

const loading = ref(false)

const groups = ref<UserGroup[]>([])

const loadGroups = async () => {
    loading.value = true

    try {
        // TODO:
        // const response = await groupStore.getMyGroups()

        groups.value = [
            {
                id: 1,
                name: 'Amigos del Trabajo',
                eventName: 'Mundial FIFA 2026',
                members: 12
            },
            {
                id: 2,
                name: 'La Familia',
                eventName: 'Mundial FIFA 2026',
                members: 8
            },
            {
                id: 3,
                name: 'Universidad',
                eventName: 'Mundial FIFA 2026',
                members: 15
            }
        ]
    } finally {
        loading.value = false
    }
}

const openGroup = (groupId: number) => {
    router.push(`/groups/${groupId}`)
}

onMounted(loadGroups)
</script>

<template>
    <div class="container">

        <div class="header">
            <NH2>Mis Grupos</NH2>
        </div>

        <NSpin :show="loading">

            <NEmpty
                v-if="groups.length === 0"
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
                    v-for="group in groups"
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
</style>