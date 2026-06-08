export interface Group {
    group_id: string
    name: string
    eventName: string
    members: number
    admin_id: string
    users_limit: number
    description?: string
    observations?: string
}

export interface GroupDetails {
    id: string
    name: string
    description?: string
    observations?: string

    adminId: string

    eventName: string

    usersLimit: number

    members: number
}

export interface CreateGroupRequest {
    name: string
    tournament_id: string,
    description?: string
    observations?: string
    users_limit?: number,
    admin_id: string,
    invite_code?: string
}