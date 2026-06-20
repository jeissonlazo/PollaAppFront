<template>
    <NCard>
        <div class="header">

            
            <h2>
                {{ team?.country }}
            </h2>
            
        </div>
        
        <img :src="team?.flag" class="logo">

        <NDescriptions label-placement="left" :column="1">

<!--             <NDescriptionsItem label="Ranking FIFA">
                {{ team?.fifa_rank }}
            </NDescriptionsItem>

            <NDescriptionsItem label="Forma">
                {{ team?.form }}
            </NDescriptionsItem>

            <NDescriptionsItem label="Promedio goles">
                {{ team?.goals_average }}
            </NDescriptionsItem>

            <NDescriptionsItem label="Victorias últimos 5">
                {{ team?.wins_last_5 }}
            </NDescriptionsItem>
 -->
        </NDescriptions>

    </NCard>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import { type Team } from '../../../interfaces/Team'
//import { teamsService } from '../../../services/teamsService.ts';
const props = defineProps<{
    team: Team | undefined
}>()

/* async function loadTeamDetails(){
    if (props.team?.external_id) {
        try {
            const teamDetails = await teamsService.getTeamDetails(props.team.external_id);
        } catch (error) {
            console.error("Error loading team details:", error);
        }
    }
} */
onMounted(() => {
    //loadTeamDetails()
})
</script>
<style scoped>
.logo {
    width: 100px;
    height: auto;
    margin-bottom: 16px;
}
</style>