<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
    NCard,
    NButton,
    NForm,
    NFormItem,
    NInput,
    useMessage
} from 'naive-ui'

import { useAuthStore } from '../../stores/authStore'

const authStore = useAuthStore()
const router = useRouter()
const message = useMessage()

const usernameOrEmail = ref('')
const password = ref('')

const handleLogin = async () => {
    try {
        await authStore.login(
            usernameOrEmail.value,
            password.value
        )

        message.success('Bienvenido')

        router.push('/confirm-email')
    } catch (error) {
        message.error('Usuario o contraseña incorrectos')
    }
}

const handleRegister = () => {
    router.push('/register')
}
</script>

<template>
    <div class="login-container">
        <NCard title="" class="login-card">
            <div style="text-align: center; margin-bottom: 24px;">
                <img src="../../assets/logo.svg" class="logo" />
            </div>
            <n-h3>Pollapp</n-h3>
            <NForm @submit.prevent="handleLogin">

                <NFormItem label="Usuario o Email">
                    <NInput v-model:value="usernameOrEmail" placeholder="Ingresa tu usuario" />
                </NFormItem>

                <NFormItem label="Contraseña">
                    <NInput v-model:value="password" type="password" show-password-on="click"
                        placeholder="Ingresa tu contraseña" />
                </NFormItem>

                <NButton type="primary" block :loading="authStore.loading" @click="handleLogin">
                    Iniciar Sesión
                </NButton>

                <NButton block style="margin-top: 24px;" :loading="authStore.loading" @click="handleRegister">
                    Crear Cuenta
                </NButton>

            </NForm>
        </NCard>
    </div>
</template>

<style scoped>
.login-container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f7fa;
}

.login-card {
    width: 400px;
}

.logo {
	width: 80px;
}
</style>