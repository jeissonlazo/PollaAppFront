import type { Prediction } from '../interfaces/predictions'
import api from './api'


export const predictionService = {

  async getPredictions(group_id: string, user_id: string): Promise<Prediction[]> {
    const response = await api.get(`/predictions/group/${group_id}/user/${user_id}`)
    return response.data    
  }
}
