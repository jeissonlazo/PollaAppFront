<template>
  <NCard>

    <div class="header">

        <img
            :src="team.logo"
            class="logo"
        >

        <h2>
            {{ team.name }}
        </h2>

    </div>

    <NDescriptions
        label-placement="left"
        :column="1"
    >

        <NDescriptionsItem label="Ranking FIFA">
            {{ team.fifa_rank }}
        </NDescriptionsItem>

        <NDescriptionsItem label="Forma">
            {{ team.form }}
        </NDescriptionsItem>

        <NDescriptionsItem label="Promedio goles">
            {{ team.goals_average }}
        </NDescriptionsItem>

        <NDescriptionsItem label="Victorias últimos 5">
            {{ team.wins_last_5 }}
        </NDescriptionsItem>

    </NDescriptions>

</NCard>
</template>
<script lang="ts" setup>
const props = defineProps<{
    team: any
}>()
</script>