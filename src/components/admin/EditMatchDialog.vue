<script setup lang="ts">
import { computed, onMounted, reactive, watch } from 'vue'
import {
    NModal,
    NCard,
    NFormItem,
    NSelect,
    NInputNumber,
    NSwitch,
    NButton,
    NSpace,
    NImage
} from 'naive-ui'

import type { MatchPrediction } from '../../interfaces/MatchPrediction.ts'
import { type Team } from '../../interfaces/Team.ts'
import { useTeamStore } from '../../stores/TeamStore.ts'

const teamStore = useTeamStore()
const props = defineProps<{
    show: boolean
    match: MatchPrediction | null
}>()

const emit = defineEmits([
    'update:show',
    'update-match'
])

const showDialog = computed({
    get: () => props.show,
    set: value => emit('update:show', value)
})

const form = reactive({
    team1_id: '',
    team2_id: '',
    score_team1: 0,
    score_team2: 0,
    team1_flag: '',
    team2_flag: '',
    finish: false
})

watch(
    () => props.match,
    match => {

        if (!match) return

        form.team1_id = match.team1_id
        form.team2_id = match.team2_id

        form.score_team1 = match.score_team1 ?? 0
        form.score_team2 = match.score_team2 ?? 0

        form.team1_flag = match.team1?.flag || ''
        form.team2_flag = match.team2?.flag || ''


        form.finish = match.finish
    },
    { immediate: true }
)

const teamOptions = computed(() => {
    return teamStore.teams.map((team: Team) => ({
        label: team.country,
        value: team.team_id
    }))
})

function handleSave() {

    emit('update-match', {
        ...props.match,
        ...form
    })

    showDialog.value = false
}

onMounted(() => {
    teamStore.loadTeams()
})
</script>

<template>

    <NModal v-model:show="showDialog">

        <NCard title="Editar Partido" style="width: 800px" :bordered="false">


            <n-grid x-gap="12" :cols="2">

                <n-gi>
                    <n-image :src="form.team1_flag" width="100">
                    </n-image>
                    <NSelect v-model:value="form.team1_id" filterable placeholder="Equipo local" :options="teamOptions"
                        @update:value="(value) => {
                            const selectedTeam = teamStore.teams.find(team => team.team_id === value)
                            form.team1_flag = selectedTeam?.flag || ''
                        }" />
                    <NInputNumber v-model:value="form.score_team1" :min="0" style="width: 90px" />
                </n-gi>

                <n-gi>

                    <n-image :src="form.team2_flag" width="100">
                    </n-image>

                    <NSelect v-model:value="form.team2_id" filterable placeholder="Equipo visitante"
                        :options="teamOptions" @update:value="(value) => {
                            const selectedTeam = teamStore.teams.find(team => team.team_id === value)
                            form.team2_flag = selectedTeam?.flag || ''
                        }" />
                    <NInputNumber v-model:value="form.score_team2" :min="0" style="width: 90px" />

                </n-gi>
            </n-grid>



            <div class="status">

                <NFormItem label="Finalizado">

                    <NSwitch v-model:value="form.finish" />

                </NFormItem>

            </div>

            <NSpace justify="end">

                <NButton @click="showDialog = false">
                    Cancelar
                </NButton>

                <NButton type="primary" @click="handleSave">
                    Guardar
                </NButton>

            </NSpace>

        </NCard>

    </NModal>

</template>

<style scoped>
.status {
    margin-bottom: 24px;
}
</style>