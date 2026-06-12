import axios from 'axios'
import type ConfirmationEmailRequest from '../interfaces/ConfirmationEmailInterface'
import type { LoginResponse } from '../interfaces/LoginInterface'
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export interface LoginRequest {
    usernameOrEmail: string
    password: string
}


export const authService = {
    async login(payload: LoginRequest): Promise<LoginResponse> {
        const response = await api.post('/auth/login', payload)
        return response.data
    },
    async register(payload: RegisterRequest) {
        return api.post('/auth/register', payload)
    },
    async confirmEmail(payload: ConfirmationEmailRequest) {
        return api.post('/auth/verify-email', payload)
    },

    async sendRecoveryCode(email: string) {
        return api.post('/auth/send-recovery-code', { usernameOrEmail:email })
    },

    async validateRecoveryCode(email: string, code: string) {
        return api.post('/auth/validate-recovery-code', { usernameOrEmail: email, code })
    },
    
    async changePassword(email: string, code: string, password: string) {
        return api.post('/auth/reset-password', { usernameOrEmail: email, code, new_password:password })
    }
}

export interface RegisterRequest {
    first_name: string
    last_name: string
    username: string
    email: string
    password: string
}