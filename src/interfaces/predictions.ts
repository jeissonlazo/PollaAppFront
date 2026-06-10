export interface Prediction {
  prediction_id: string
  match_id: string
  team1_id: string
  team2_id: string
  score_team1: number
  score_team2: number
  ended: boolean
}