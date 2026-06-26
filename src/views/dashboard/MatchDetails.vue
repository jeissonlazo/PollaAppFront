<template>
    <NCard class="match-header">

        <div class="teams-title">

            <h1>
                {{ match?.team1?.country }}
                vs
                {{ match?.team2?.country }}
            </h1>

            <NTag :type="matchStatus.type" round size="large">
                {{ matchStatus.text }}
            </NTag>

        </div>

        <NSpace vertical size="small">

            <NText>

                <NIcon>
                    <Clock3 />
                </NIcon>

                {{ formatDate(match?.match_date ?? '') }}

                {{ matchDateTime ? ` - ${matchDateTime.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}` : '' }}

            </NText>

            <NText>

                <NIcon>
                    <MapPinSearch />
                </NIcon>

                {{ match?.ground }}

            </NText>

            <NText>

                <NIcon>
                    <Medal />
                </NIcon>

                {{ match?.group_name }}

                ·

                {{ match?.round }}

            </NText>

            <NText v-if="match?.finish" type="error">

                <NIcon>
                    <Circle />
                </NIcon>

                Resultado Final:
                {{ match.score_team1 }}
                -
                {{ match.score_team2 }}

            </NText>

        </NSpace>

    </NCard>

    <NGrid cols="2" x-gap="32">

        <NGridItem>

            <TeamStatsCard v-if="team1Stats" :team="team1Stats" />

        </NGridItem>

        <NGridItem>

            <TeamStatsCard v-if="team2Stats" :team="team2Stats" />

        </NGridItem>

    </NGrid>
    <MatchPredictions v-if="match" :predictions="predictionStore.userMatchPredictions" :match="match"
        class="predictions" />

</template>
<script lang="ts" setup>
import { onMounted, ref,computed } from 'vue';
import { useMatchesStore } from '../../stores/MatchesStore.ts';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import MatchPredictions from './match/MatchPredictions.vue';
import { usePredictionStore } from '../../stores/predictionStore.ts';
import TeamStatsCard from './match/TeamStatsCard.vue';
import type { Team } from '../../interfaces/Team.ts';
import { MapPinSearch, Medal,  Clock3, Circle  } from '@lucide/vue';
const predictionStore = usePredictionStore()
const matchesStore = useMatchesStore()
const team1Stats = ref<Team | undefined>()
const team2Stats = ref<Team | undefined>()
const match = storeToRefs(matchesStore).matchDetails
const route = useRoute()
const match_id = route.params.id as string
const group_id = route.params.group_id as string


const loadMatchDetails = async () => {
    try {
        await matchesStore.loadMatch(match_id)
        await predictionStore.loadMatchPredictions(match_id, group_id)
        team1Stats.value = matchesStore.matchDetails?.team1 as Team
        team2Stats.value = matchesStore.matchDetails?.team2 as Team
    }
    catch (error) {
        console.error("Error loading match details:", error);
    }
}

function formatDate(date: string | number | Date) {
    return new Date(date).toLocaleDateString('es-CO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}



const matchDateTime = computed(() => {
    if (!match.value) return null

    return new Date(match.value.match_date)
})

const matchStatus = computed(() => {

    if (!match.value || !matchDateTime.value) {
        return {
            text: 'Desconocido',
            type: 'default'
        }
    }

    if (match.value.finish) {
        return {
            text: 'Finalizado',
            type: 'error'
        }
    }

    const now = new Date()

    if (now >= matchDateTime.value) {
        return {
            text: 'En juego',
            type: 'success'
        }
    }

    return {
        text: 'Próximo',
        type: 'warning'
    }
})

onMounted(() => {
    loadMatchDetails()
})
</script>
<style scoped>
.predictions {
    margin-top: 32px;
}

.match-header {
    margin-bottom: 24px;
}

.teams-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.teams-title h1 {
    margin: 0;
}
</style>