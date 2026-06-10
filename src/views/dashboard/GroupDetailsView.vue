<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import {
    NCard,
    NSpin,
    NTabs,
    NTabPane,
    NH2,
    NText,
    NDescriptions,
    NDescriptionsItem
} from 'naive-ui'

import { useAuthStore } from '../../stores/authStore'
import { useGroupStore } from '../../stores/groupStore'
import GroupPredictionsTab from '../../components/groups/GroupPredictionsTab.vue'
const route = useRoute()

const authStore = useAuthStore()
const groupStore = useGroupStore()

const loading = ref(false)

const groupId = route.params.id as string

const isAdmin = computed(() => {
    return (
        groupStore.selectedGroup?.admin_id ===
        authStore.user?.id
    )
})

const loadGroup = async () => {

    loading.value = true

    try {
        await groupStore.loadGroup(groupId)
    } finally {
        loading.value = false
    }
}

onMounted(loadGroup)
</script>

<template>
    <NSpin :show="loading">

        <div
            v-if="groupStore.selectedGroup"
            class="container"
        >
            <NH2>
                {{ groupStore.selectedGroup.name }}
            </NH2>

            <NText depth="3">
                {{ groupStore.selectedGroup.eventName }}
            </NText>

            <NTabs
                animated
                type="line"
                style="margin-top: 24px;"
            >

                <!-- PRONÓSTICOS -->

                <NTabPane
                    name="predictions"
                    tab="Pronósticos"
                >
                    <GroupPredictionsTab :group_id="groupId" />
                </NTabPane>

                <!-- POSICIONES -->

                <NTabPane
                    name="ranking"
                    tab="Posiciones"
                >
                    <NCard>
                        Próximamente ranking del grupo.
                    </NCard>
                </NTabPane>

                <!-- INFO -->

                <NTabPane
                    name="info"
                    tab="Información"
                >
                    <NCard>

                        <NDescriptions
                            label-placement="left"
                            bordered
                            :column="1"
                        >

                            <NDescriptionsItem
                                label="Evento"
                            >
                                {{
                                    groupStore
                                        .selectedGroup
                                        .eventName
                                }}
                            </NDescriptionsItem>

                            <NDescriptionsItem
                                label="Participantes"
                            >
                                {{
                                    groupStore
                                        .selectedGroup
                                        .members
                                }}
                            </NDescriptionsItem>

                            <NDescriptionsItem
                                label="Límite"
                            >
                                {{
                                    groupStore
                                        .selectedGroup
                                        .users_limit
                                }}
                            </NDescriptionsItem>

                            <NDescriptionsItem
                                label="Descripción"
                            >
                                {{
                                    groupStore
                                        .selectedGroup
                                        .description ||
                                    'Sin descripción'
                                }}
                            </NDescriptionsItem>

                            <NDescriptionsItem
                                label="Observaciones"
                            >
                                {{
                                    groupStore
                                        .selectedGroup
                                        .observations ||
                                    'Sin observaciones'
                                }}
                            </NDescriptionsItem>

                        </NDescriptions>

                    </NCard>
                </NTabPane>

                <!-- ADMIN -->

                <NTabPane
                    v-if="isAdmin"
                    name="admin"
                    tab="Administrar Grupo"
                >
                    <NCard>

                        <h3>
                            Administración del Grupo
                        </h3>

                        <p>
                            Aquí podrás administrar:
                        </p>

                        <ul>
                            <li>
                                Invitar usuarios
                            </li>

                            <li>
                                Expulsar usuarios
                            </li>

                            <li>
                                Editar información
                            </li>

                            <li>
                                Cerrar grupo
                            </li>
                        </ul>

                    </NCard>
                </NTabPane>

            </NTabs>

        </div>

    </NSpin>
</template>

<style scoped>
.container {
    padding: 24px;
}
</style>