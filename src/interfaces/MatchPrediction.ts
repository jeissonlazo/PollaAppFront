export interface MatchPrediction {
    match_id: string
    round: string

    match_date: string
    time: string

    group_name: string
    ground: string

    team1_id: string
    team1_name: string

    team2_id: string
    team2_name: string

    score_team1: number | null
    score_team2: number | null

    created_at: string

    finish: boolean
}