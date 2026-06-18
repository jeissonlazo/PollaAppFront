import { type UserPredictions } from '../interfaces/MatchPrediction'
import api from './api'


export const predictionService = {

  async getPredictions(group_id: string, user_id: string): Promise<UserPredictions> {
    const response = await api.get(`/predictions/group/${group_id}/user/${user_id}`)
    return response.data    
  },

  async savePredictions(predictions: UserPredictions): Promise<void> {
    await api.post('/predictions', {user_id: predictions.user_id, group_id: predictions.group_id, predictions: predictions.predictions})
  },

  async getMatchPredictions(match_id: string, group_id: string): Promise<void> {
    await api.get(`/predictions/group/${group_id}/match/${match_id}`)
  }

}
