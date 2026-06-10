<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>

    <h1>Administración</h1>

    <NGrid cols="1 s:2 m:3">

        <NGridItem>
            <NCard
                hoverable
                @click="router.push('/dashboard/admin/matches')"
            >
                ⚽ Administrar Partidos
            </NCard>
        </NGridItem>

        <NGridItem>
            <NCard hoverable>
                👥 Administrar Usuarios
            </NCard>
        </NGridItem>

        <NGridItem>
            <NCard hoverable>
                🏆 Administrar Torneos
            </NCard>
        </NGridItem>

    </NGrid>

</template>