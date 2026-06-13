export interface User {
    id: string
    username: string
    email: string
    first_name: string
    last_name: string
    roles: number[]
}

export interface LoginResponse {
    access_token: string
    token_type: string
    user: User
}