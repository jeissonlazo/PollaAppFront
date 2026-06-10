<script setup lang="ts">
import { h, onMounted, ref } from 'vue'
import type { MatchPrediction } from "../../interfaces/MatchPrediction.ts";
import { useMatchesStore } from '../../stores/MatchesStore.ts'
import { usePredictionStore } from '../../stores/predictionStore.ts'
import { useAuthStore } from '../../stores/authStore.ts'
import {
    NDataTable,
    NInputNumber,
    NTag,
    NImage,
    type DataTableColumns
} from 'naive-ui'

const props = defineProps<{
    group_id: string
}>()
const matchesStore = useMatchesStore()
const predictionStore = usePredictionStore()
const authStore = useAuthStore()

const predictions = ref<MatchPrediction[]>([])

const columns: DataTableColumns<MatchPrediction> = [
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
            return `${row.team1?.country || 'TBD'} vs ${row.team2?.country || 'TBD'}`
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
                        value: row.score_team1,

                        min: 0,
                        max: 20,
                        'show-button': false,
                        disabled: row.finish,

                        style: 'width:40px',

                        'onUpdate:value': (
                            value: number | null
                        ) => {
                            row.score_team1 = value
                        }
                    }),

                    h(
                        'span',
                        {},
                        '-'
                    ),

                    h(NInputNumber, {
                        value: row.score_team2,
                        min: 0,
                        max: 20,
                        'show-button': false,
                        'button-placement': "both",
                        disabled: row.finish,
                        style: 'width:40px',
                        'onUpdate:value': (
                            value: number | null
                        ) => {
                            row.score_team2 = value
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

const loadPredictions = async () => {
    await matchesStore.loadMatches()
    await predictionStore.loadPredictions(props.group_id, authStore.user?.id || '')

    predictions.value = matchesStore.matches
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString('es-CO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}

onMounted(() => {
    loadPredictions()
})
</script>

<template>
    <NDataTable
        :columns="columns"
        :data="predictions"
        :pagination="{
            pageSize: 10
        }"
    />
</template>