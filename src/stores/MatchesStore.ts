import { defineStore } from "pinia";
import { ref } from "vue";

import { matchesService } from "../services/matchesService.ts";
import type { MatchPrediction } from "../interfaces/MatchPrediction.ts";

export const useMatchesStore = defineStore("matches", () => {
  const loading = ref(false);
  const matches = ref<MatchPrediction[]>([]);

  async function loadMatches() {
    loading.value = true;

    try {
      matches.value = await matchesService.getMatches();

      matches.value.sort((a, b) => {
        const dateA = new Date(a.match_date);
        const dateB = new Date(b.match_date);
        return dateA.getTime() - dateB.getTime();
      });
    } catch (error) {
      console.error("Error loading matches:", error);
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    matches,
    loadMatches,
  };
});
