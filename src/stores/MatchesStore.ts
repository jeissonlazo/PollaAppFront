import { defineStore } from "pinia";
import { ref } from "vue";

import { matchesService } from "../services/matchesService.ts";
import type { Match, UserPredictions } from "../interfaces/MatchPrediction.ts";
import { predictionService } from "../services/predictionService.ts";

export const useMatchesStore = defineStore("matches", () => {
  const loading = ref(false);
  const matches = ref<Match[]>([]);
  const predictions = ref<UserPredictions>();
  const matchDetails = ref<Match>();
  async function loadMatchesAndPredictions(userId: string = "", groupId: string = "") {
    loading.value = true;
    try {
      matches.value = await matchesService.getMatches();
      predictions.value = await predictionService.getPredictions(groupId, userId);
      matches.value = addUserPredictionsToMatches(matches.value, predictions.value);
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

  async function loadMatch(matchId: string) {
    loading.value = true;
    try {
      const match = await matchesService.getMatch(matchId);
      matchDetails.value = match;
    } catch (error) {
      console.error("Error loading match:", error);
    } finally {
      loading.value = false;
    }
  }

  function addUserPredictionsToMatches(
    matchesList: Match[],
    savedPredictions: UserPredictions | undefined,
  ) {
    matchesList.forEach((match) => {
      const userPrediction = savedPredictions?.predictions.find(
        (prediction) => prediction.match_id === match.match_id,
      );

      if (userPrediction) {
        match.user_prediction_team1 = userPrediction.score_team1;
        match.user_prediction_team2 = userPrediction.score_team2;
      }
      else{
        match.user_prediction_team1 = null;
        match.user_prediction_team2 = null;
      }
    });

    return matchesList;
  }

  async function updateMatch(matchData: Match) {
    try {
      const updatedMatch = await matchesService.updateMatch({ ...matchData });
      const index = matches.value.findIndex(
        (match) => match.match_id === matchData.match_id,
      );
      if (index !== -1) {
        matches.value[index] = updatedMatch;
      }
    } catch (error) {
      console.error("Error updating match prediction:", error);
    }
  }

  return {
    loading,
    matches,
    predictions,
    matchDetails,
    loadMatchesAndPredictions,
    loadMatches,
    loadMatch,
    updateMatch,
  };
});
