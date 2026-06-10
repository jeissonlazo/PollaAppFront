<script setup lang="ts">
import { h, onMounted, ref } from 'vue'
import { useMatchesStore } from '../../../stores/MatchesStore'
import { NH2, NDataTable, NButton, type DataTableColumns } from 'naive-ui'
import EditMatchDialog from '../../../components/admin/EditMatchDialog.vue'
const matchesStore = useMatchesStore()
const editDialogVisible = ref(false)
const selectedMatch = ref<any>(null)

const columns: DataTableColumns<any> = [
    {
        title: 'Fecha',
        key: 'match_date',

        render(row) {
            return formatDate(row.match_date)
        },
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
        title: 'Estado',
        key: 'status',
        render(row: any) {
            return row.finish
                ? 'Finalizado'
                : 'Pendiente'
        }
    },

    {
        title: 'Acciones',
        key: 'actions',
        render(row: any) {

            return h(
                NButton,
                {
                    size: 'small',
                    onClick: () => openEditDialog(row)
                },
                {
                    default: () => 'Editar'
                }
            )
        }
    }
]

function openEditDialog(match: any) {
    selectedMatch.value = match
    editDialogVisible.value = true
}
function formatDate(date: string) {
    return new Date(date).toLocaleDateString('es-CO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}


onMounted(() => {
    matchesStore.loadMatches()
})
</script>

<template>


    <n-h2>Administrar Partidos</n-h2>
    <NDataTable :columns="columns" :data="matchesStore.matches" :pagination="{
        pageSize: 10
    }" />

    <EditMatchDialog
        v-model:show="editDialogVisible"
        :match="selectedMatch"
    />
</template>