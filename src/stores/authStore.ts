
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { authService } from '../services/authService'

export const useAuthStore = defineStore('auth', () => { 

    const token = ref<string | null>(
        localStorage.getItem('token')
    )

    const loading = ref(false)

    const isAuthenticated = computed(() => !!token.value)

    async function login(
        usernameOrEmail: string,
        password: string
    ) {
        loading.value = true

        try {
            const response = await authService.login({
                usernameOrEmail,
                password
            })

            token.value = response.access_token

            localStorage.setItem(
                'token',
                response.access_token
            )

            return true
        } finally {
            loading.value = false
        }
    }

    function logout() {
        token.value = null
        localStorage.removeItem('token')
    }

    return {
        token,
        loading,
        isAuthenticated,
        login,
        logout
    }
})