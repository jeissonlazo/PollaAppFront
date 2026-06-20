import api from "./api";
import { footballApi } from "./api";
import { type Team } from "../interfaces/Team";

export const teamsService = {
  async getPredictions(): Promise<Team[]> {
    const response = await api.get(`/teams`);
    return response.data;
  },
  async getTeamDetails (teamId: string): Promise<Team> {
    const response = await footballApi.get('' , {
      params: {
        season: 2024,
        team: teamId,
        league: 1
      }
    });

    return response.data.response[0];
  },
};
