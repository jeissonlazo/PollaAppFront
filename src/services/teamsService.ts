import api from './api'
import { type Team } from '../interfaces/Team'

export const teamsService = {

  async getPredictions(): Promise<Team[]> {
    const response = await api.get(`/teams`)
    return response.data    
  }
}
