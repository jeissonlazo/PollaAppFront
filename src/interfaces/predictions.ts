export interface Prediction {
  prediction_id: string
  match_id: string
  team1_id: string
  team2_id: string
  score_team1: number
  score_team2: number
  ended: boolean
}

export interface UsersPrediction {
    team2_score: any
    user_id:     string;
    username:    string;
    score_team1: number | null;
    score_team2: number | null;
    first_name:  string;
    last_name:   string;
    points:      number;
}
