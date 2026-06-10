import { defineStore } from "pinia";
import { ref } from "vue";
import { teamsService } from "../services/teamsService.ts";
import type { Team } from "../interfaces/Team.ts";

export const useTeamStore = defineStore("teams", () => {
  const loading = ref(false);
  const teams = ref<Team[]>([]);
  async function loadTeams() {
    loading.value = true;
    try {
      teams.value = await teamsService.getPredictions();
    } catch (error) {
      console.error("Error loading teams:", error);
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    teams,
    loadTeams
  };
});