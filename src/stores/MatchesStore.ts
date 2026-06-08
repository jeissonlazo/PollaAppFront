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
    } catch (error) {
      console.error("Error loading matches:", error);
    }
  }

  return {
    loading,
    matches,
    loadMatches,
  };
});
