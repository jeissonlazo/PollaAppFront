export interface Group {
    id: string
    name: string
    eventName: string
    members: number
}

export interface CreateGroupRequest {
    name: string
    eventId: string
}