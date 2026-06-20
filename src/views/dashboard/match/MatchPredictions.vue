<template>
  <n-data-table :columns="columns" :data="props.predictions" />
</template>

<script setup lang="ts">
import { NDataTable, type DataTableColumns } from 'naive-ui'
import {type UsersPrediction} from '../../../interfaces/predictions.ts'
import type { Match } from '../../../interfaces/MatchPrediction.ts';

const props = defineProps<{
  predictions: UsersPrediction[],
  match: Match
}>()


const columns: DataTableColumns<UsersPrediction> = [
  {
    title: 'Usuario',
    key: 'username',
    render(row) {
      return row.username
    }
  },
  {
    title: 'Nombre',
    key: 'nombre',
    render(row) {
      return row.first_name + ' ' + row.last_name
    }
  },
  {
    title: 'Predicción',
    key: 'prediction',
    render(row) {
      return `${row.score_team1 !== null ? row.score_team1 : '-'} - ${row.score_team2 !== null ? row.score_team2 : '-'}`
    }
  },
  {
    title: 'Puntos',
    key: 'points',
    render(row) {
      return row.points
    }
  }
]
</script>