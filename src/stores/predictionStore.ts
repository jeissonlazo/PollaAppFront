import { defineStore } from "pinia";
import { ref } from "vue";
import { predictionService } from "../services/predictionService.ts";
import { type UserPredictions } from "../interfaces/MatchPrediction.ts";
import type { Prediction } from "../interfaces/predictions.ts";
export const usePredictionStore = defineStore("predictions", () => {
  const loading = ref(false);
  const predictions = ref<UserPredictions>({ user_id: '', group_id: '', predictions: [] });

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

  return {
    loading,
    predictions,
    loadPredictions,
    savePrediction
  };
});