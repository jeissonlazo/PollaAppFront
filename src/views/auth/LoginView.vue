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

import { useAuthStore } from '@/stores/authStore'

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

        router.push('/home')
    } catch (error) {
        message.error('Usuario o contraseña incorrectos')
    }
}
</script>

<template>
    <div class="login-container">
        <NCard
            title="Polla Man"
            class="login-card"
        >
            <NForm @submit.prevent="handleLogin">

                <NFormItem label="Usuario o Email">
                    <NInput
                        v-model:value="usernameOrEmail"
                        placeholder="Ingresa tu usuario"
                    />
                </NFormItem>

                <NFormItem label="Contraseña">
                    <NInput
                        v-model:value="password"
                        type="password"
                        show-password-on="click"
                        placeholder="Ingresa tu contraseña"
                    />
                </NFormItem>

                <NButton
                    type="primary"
                    block
                    :loading="authStore.loading"
                    @click="handleLogin"
                >
                    Iniciar Sesión
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
</style>