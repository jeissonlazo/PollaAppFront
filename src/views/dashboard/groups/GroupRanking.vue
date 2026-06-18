<script setup lang="ts">
import { computed, h } from 'vue'
import {
    NDataTable,
    type DataTableColumns
} from 'naive-ui'

import { Crown } from '@lucide/vue';

import { useAuthStore } from '../../../stores/authStore'
import type { GroupRankingUser } from '../../../interfaces/groupRanking.ts'

const authStore = useAuthStore()

const props = defineProps<{
    ranking: GroupRankingUser[]
}>()

const sortedRanking = computed(() => {

    return [...props.ranking]
        .sort((a, b) => b.user_score - a.user_score)
        .map((user, index) => ({
            ...user,
            rank: index + 1
        }))
})

const columns: DataTableColumns<any> = [

    {
        title: '#',
        key: 'rank',

        render(row) {

            if (row.rank === 1) {

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
                        row.rank,
                        h(Crown, {
                            size: 18,
                            color: '#f59e0b'
                        })

                    ]
                )
            }

            return row.rank
        }
    },

    {
        title: 'Usuario',
        key: 'username',

        render(row) {

            return `${row.first_name} ${row.last_name}`
        }
    },

    {
        title: 'Username',
        key: 'username'
    },

    {
        title: 'Puntos',
        key: 'user_score'
    }
]

function rowClassName(row: any) {

    if (row.user_id === authStore.user?.id) {
        return 'current-user-row'
    }

    return ''
}
</script>

<template>

    <NDataTable :columns="columns" :data="sortedRanking" :row-class-name="rowClassName" />

</template>

<style scoped>
:deep(.current-user-row td) {

    background-color: #f0fdf4 !important;

    font-weight: 600;
}
</style>