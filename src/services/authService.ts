import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export interface LoginRequest {
    usernameOrEmail: string
    password: string
}

export interface LoginResponse {
    access_token: string
    token_type: string
}

export const authService = {
    async login(payload: LoginRequest): Promise<LoginResponse> {
        const response = await api.post('/auth/login', payload)
        return response.data
    },
    async register(payload: RegisterRequest) {
        return api.post('/auth/register', payload)
    }
}

export interface RegisterRequest {
    first_name: string
    last_name: string
    username: string
    email: string
    password: string
}