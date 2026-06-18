import api from "./api";
import type { Match } from "../interfaces/MatchPrediction";

export const matchesService = {
  async getMatches(): Promise<Match[]> {
    const response = await api.get(`matches`);
    return response.data;
  },

  async getMatch(matchId: string): Promise<Match> {
    const response = await api.get(`matches/${matchId}/`);
    return response.data;
  },

  async updateMatch(matchData: Match): Promise<Match> {
    const response = await api.put(`matches/${matchData.match_id}/`, matchData);
    return response.data;
  }
};
