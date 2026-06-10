import api from "./api";
import type { MatchPrediction } from "../interfaces/MatchPrediction";

export const matchesService = {
  async getMatches(): Promise<MatchPrediction[]> {
    const response = await api.get(`matches`);
    return response.data;
  },
};
