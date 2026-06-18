import { defineStore } from "pinia";
import { ref } from "vue";
import { predictionService } from "../services/predictionService.ts";
import { type UserPredictions } from "../interfaces/MatchPrediction.ts";
export const usePredictionStore = defineStore("predictions", () => {
  const loading = ref(false);
  const predictions = ref<UserPredictions>({ user_id: '', group_id: '', predictions: [] });
  const matchPredictions = ref([]);
  async function loadPredictions(group_id: string, user_id: string) {
    loading.value = true;
    try {
      predictions.value = await predictionService.getPredictions(group_id, user_id);
    } catch (error) {
      console.error("Error loading predictions:", error);
    } finally {
      loading.value = false;
    }
  }

  async function savePrediction(prediction: UserPredictions) {
    try {
      await predictionService.savePredictions(prediction);
    } catch (error) {
      console.error("Error saving prediction:", error);
    }
  }

  async function loadMatchPredictions(match_id: string, group_id: string) {
    try{
      await predictionService.getMatchPredictions(match_id, group_id)
    }catch (error) {
      console.error("Error loading match predictions:", error);
    }
  }

  return {
    loading,
    predictions,
    loadPredictions,
    savePrediction,
    loadMatchPredictions
  };
});