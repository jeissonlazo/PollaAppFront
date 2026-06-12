import { type Team } from './Team'
export interface Match {
    match_id: string
    round: string

    match_date: string
    time: string

    group_name: string
    ground: string

    team1_id: string
    team1_name: string
    team1: Team | null
    team2: Team | null

    team2_id: string
    team2_name: string

    score_team1: number | null
    score_team2: number | null

    user_prediction_team1: number | null
    user_prediction_team2: number | null

    created_at: string

    finish: boolean
}

export interface UserPredictions {
    user_id: string
    group_id: string
    predictions: MatchUserPrediction[]
}

export interface MatchUserPrediction {
    match_id: string
    team1_id: string
    team2_id: string
    score_team1: number | null
    score_team2: number | null
}
