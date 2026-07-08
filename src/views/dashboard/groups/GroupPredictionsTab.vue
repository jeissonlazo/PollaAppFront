<script setup lang="ts">
import { h, ref } from 'vue'
import type { Match, UserPredictions, MatchUserPrediction } from "../../../interfaces/MatchPrediction.ts";
import { usePredictionStore } from '../../../stores/predictionStore.ts'
import { useAuthStore } from '../../../stores/authStore.ts'
import {
    NDataTable,
    NInputNumber,
    NTag,
    NImage,
    NButton,
    useMessage ,
    useLoadingBar,
    type DataTableColumns
} from 'naive-ui'
import { useRouter } from 'vue-router';
const message = useMessage()
const loadingBar = useLoadingBar()
const props = defineProps<{
    group_id: string,
    matches: Match[]
}>()
const predictionStore = usePredictionStore()
const predictions = ref<MatchUserPrediction[]>([])
const authStore = useAuthStore()
const router = useRouter()
const columns: DataTableColumns<Match> = [
    {
        title: 'Fecha',
        key: 'match_date',

        render(row) {
            return formatDate(row.match_date)
        },
    },

    {
        title: 'Hora',
        key: 'time',
        render(row) {
            return row.time.substring(0, 5)
        }
    },

    {
        title: 'Ronda',
        key: 'round'
    },

    {
        title: 'Partido',
        key: 'match',
        render(row) {
            return h(
                NButton,
                {
                    onClick: () => goToMatch(row)
                },
                {
                    default: () => [
                        h(NImage, {
                            src: row.team1?.flag,
                            width: 24,
                        }),
                        h('span', {}, ` ${row.team1?.country || 'TBD'} vs ${row.team2?.country || 'TBD'} `),
                        h(NImage, {
                            src: row.team2?.flag,
                            width: 24,
                        })
                    ]
                }

            )
        }
    },
    {
        title: 'Estadio',
        key: 'ground'
    },

    {
        title: 'Marcador',
        key: 'prediction',

        render(row) {

            return h(
                'div',
                {
                    style: `
                        display:flex;
                        align-items:center;
                        gap:8px;
                    `
                },
                [

                    h(NImage,
                        {
                            src: row.team1?.flag,
                            width: 24,
                        },
                    ),
                    h(NInputNumber, {
                        value: row.user_prediction_team1 !== null ? row.user_prediction_team1 : null,

                        min: 0,
                        max: 20,
                        'show-button': false,
                        disabled: row.finish || row.match_date < new Date().toISOString(),

                        style: 'width:40px',

                        'onUpdate:value': (
                            value: number | null
                        ) => {
                            row.user_prediction_team1 = value
                            addPrediction(row)
                        }
                    }),

                    h(
                        'span',
                        {},
                        '-'
                    ),

                    h(NInputNumber, {
                        value: row.user_prediction_team2 !== null ? row.user_prediction_team2 : null,
                        min: 0,
                        max: 20,
                        'show-button': false,
                        'button-placement': "both",
                        disabled: row.finish || row.match_date < new Date().toISOString(),
                        style: 'width:40px',
                        'onUpdate:value': (
                            value: number | null
                        ) => {
                            row.user_prediction_team2 = value
                            addPrediction(row)
                        }
                    }),

                    h(NImage,
                        {
                            src: row.team2?.flag,
                            width: 24,
                        },
                    )
                ]
            )
        }
    },
    {
        title: 'resultado',
        key: 'result',

        render(row) {
            return `${row.score_team1} - ${row.score_team2}`
        }
    },

    {
        title: 'Estado',

        key: 'finish',

        render(row) {
            return row.finish
                ? h(
                    NTag,
                    {
                        type: 'success'
                    },
                    {
                        default: () => 'Finalizado'
                    }
                )
                : h(
                    NTag,
                    {
                        type: 'warning'
                    },
                    {
                        default: () => 'Pendiente'
                    }
                )
        }
    }
]

function goToMatch(match: Match) {
    router.push(`/dashboard/matches/${match.match_id}/${props.group_id}`)
}
function formatDate(date: string) {
    return new Date(date).toLocaleDateString('es-CO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}

async function savePredictions() {
    loadingBar.start()
    try {
        const payload: UserPredictions = {
            user_id: authStore.user?.id || '',
            group_id: props.group_id,
            predictions: predictions.value
        }
        await predictionStore.savePrediction(payload)
        message.success("Predicciones guardadas correctamente")
    }
    catch (error) {
        message.error("Error saving predictions:")
    }
    finally {
        loadingBar.finish()
    }
}

const addPrediction = (match: Match) => {

    const existingPrediction = predictions.value.find(
        prediction => prediction.match_id === match.match_id
    )

    if (existingPrediction) {
        existingPrediction.score_team1 = match.user_prediction_team1
        existingPrediction.score_team2 = match.user_prediction_team2
        return
    }

    predictions.value.push({
        match_id: match.match_id,
        team1_id: match.team1_id,
        team2_id: match.team2_id,
        score_team1: match.user_prediction_team1,
        score_team2: match.user_prediction_team2
    })
}

</script>

<template>
    <n-button type="primary" style="margin-bottom: 16px;" @click="savePredictions">
        Guardar Predicciones
    </n-button>
    <NDataTable 
    :columns="columns" 
    :data="props.matches" 
    :row-key="row => row.match_id"
    :pagination="{
        pageSize: 10
    }" />
</template>