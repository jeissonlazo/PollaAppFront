<script setup lang="ts">
import { h, onMounted, ref } from 'vue'
import type { MatchPrediction } from "../../interfaces/MatchPrediction.ts";
import { useMatchesStore } from '../../stores/MatchesStore.ts'
import {
    NDataTable,
    NInputNumber,
    NTag,
    type DataTableColumns
} from 'naive-ui'

const value = ref(0)
const matchesStore = useMatchesStore()

const predictions = ref<MatchPrediction[]>([])

const columns: DataTableColumns<MatchPrediction> = [
    {
        title: 'Fecha',
        key: 'match_date'
    },

    {
        title: 'Hora',
        key: 'time'
    },

    {
        title: 'Ronda',
        key: 'round'
    },

    {
        title: 'Partido',
        key: 'match',
        render(row) {
            return `${row.team1_name} vs ${row.team2_name}`
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
                    h(NInputNumber, {
                        value: row.score_team1,

                        min: 0,
                        max: 20,
                        'show-buttons': false,
                        disabled: row.finish,

                        style: 'width:70px',

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
                        'show-buttons': false,
                        disabled: row.finish,
                        style: 'width:70px',
                        'onUpdate:value': (
                            value: number | null
                        ) => {
                            row.score_team2 = value
                        }
                    })
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

    predictions.value = matchesStore.matches
}

onMounted(() => {
    loadPredictions()
})
</script>

<template>
    <n-space align="center">
    <n-input-number v-model:value="value" :show-buttons="false" button-placement="right" />
  </n-space>
    <NDataTable
        :columns="columns"
        :data="predictions"
        :pagination="{
            pageSize: 10
        }"
    />
</template>