<template>
  <NGrid cols="2" x-gap="32">

    <NGridItem>

        <TeamStatsCard
            :team="team1"
        />

    </NGridItem>

    <NGridItem>

        <TeamStatsCard
            :team="team2"
        />

    </NGridItem>

</NGrid>
</template>

<script lang="ts" setup>
import TeamStatsCard from './TeamStatsCard.vue';
const props = defineProps<{
    team1: any,
    team2: any
}>()
</script>