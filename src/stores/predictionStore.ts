import { defineStore } from "pinia";
import { ref } from "vue";
import { predictionService } from "../services/predictionService.ts";
import type { Prediction } from "../interfaces/predictions.ts";
export const usePredictionStore = defineStore("predictions", () => {
  const loading = ref(false);
  const predictions = ref<Prediction[]>([]);

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

  return {
    loading,
    predictions,
    loadPredictions
  };
});