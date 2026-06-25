<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import type { LoginResponse } from '../../interfaces/LoginInterface'
import { useAuthStore } from '../../stores/authStore'

const route = useRoute()
const router = useRouter()
const message = useMessage()

const authStore = useAuthStore()

async function loginByOauth() {

    const token = route.query.token as string

    if (!token) {
        message.error('No fue posible completar la autenticación.')
        router.push('/login')
        return
    }

    const userData: LoginResponse = {

        access_token: token,

        token_type: 'Bearer',

        user: {

            id: route.query.id as string,
            username: route.query.username as string,
            email: route.query.email as string,
            first_name: route.query.first_name as string,
            last_name: route.query.last_name as string,
            roles: route.query.roles? JSON.parse(route.query.roles as string): []
        }
    }

    authStore.googleLogin(userData)
    message.success('¡Bienvenido a Pollapp!')
    router.replace('/dashboard/home')
}

onMounted(loginByOauth)
</script>
<template>
    <div class="container">
        <NCard class="card" :bordered="false">
            <div class="content">
                <img src="../../assets/logo.svg" class="logo">
                <NSpin size="large" />
                <NH2>
                    Iniciando sesión...
                </NH2>
                <NText depth="3">
                    Estamos verificando tu cuenta y
                    preparando tu experiencia.
                </NText>
            </div>
        </NCard>
    </div>
</template>
<style scoped>
.container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f5f7fa;
}

.card {
    width: 420px;
}

.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 24px 0;
}

.logo {
    width: 90px;
}
</style>