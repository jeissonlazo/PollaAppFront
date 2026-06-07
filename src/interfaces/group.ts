export interface Group {
    id: string
    name: string
    eventName: string
    members: number
}

export interface CreateGroupRequest {
    name: string
    tournament: string,
    description?: string
    observations?: string
    users_limit?: number,
    admin_id: string,
    invite_code?: string
}