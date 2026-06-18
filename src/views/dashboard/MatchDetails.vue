<template>

    <NCard>

        <h2>
            {{ match?.team1?.country }}
            vs
            {{ match?.team2?.country }}
        </h2>

        <NTabs type="line">

            <NTabPane
                name="stats"
                tab="Equipos"
            >

                <MatchTeamsStats
                    :team1="team1Stats"
                    :team2="team2Stats"
                />

            </NTabPane>

            <NTabPane
                name="predictions"
                tab="Predicciones"
            >


            </NTabPane>

        </NTabs>

    </NCard>

</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import {useMatchesStore} from '../../stores/MatchesStore.ts';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import MatchTeamsStats from './match/MatchTeamsStats.vue';
import { usePredictionStore } from '../../stores/predictionStore.ts';
const predictionStore = usePredictionStore()
const matchesStore = useMatchesStore()
const team1Stats = {}
const team2Stats = {}
const match = storeToRefs(matchesStore).matchDetails
const route = useRoute()
const match_id = route.params.id as string
const group_id = route.params.group_id as string


const loadMatchDetails = async () => {
    try{
        await matchesStore.loadMatch(match_id)
        await predictionStore.loadMatchPredictions(match_id, group_id)
    }
    catch (error) {
        console.error("Error loading match details:", error);
    }
}

onMounted(() => {
    loadMatchDetails()
})
</script>