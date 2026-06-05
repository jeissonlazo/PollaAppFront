<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'
import {
    NCard,
    NButton,
    NForm,
    NFormItem,
    NInput,
    NH3,
    NText,
    useMessage
} from 'naive-ui'

const router = useRouter()
const message = useMessage()

const loading = ref(false)
const confirmationCode = ref('')
const route = useRoute()
const authStore = useAuthStore()
const email = route.params.email as string || ''
const handleConfirmEmail = async () => {
    try {
        if (!/^\d{5}$/.test(confirmationCode.value)) {
            message.error('Debe ingresar un código de 5 dígitos')
            return
        }

        loading.value = true

        // TODO:
        await authStore.confirmEmail({ email, code: confirmationCode.value })

        message.success('Correo confirmado correctamente')

        router.push('/login')
    } catch (error) {
        message.error('Código inválido o expirado')
    } finally {
        loading.value = false
    }
}

const goToLogin = () => {
    router.push('/login')
}

const resendCode = async () => {
    try {
        // TODO:
        // await authStore.resendConfirmationCode()

        message.success('Código reenviado')
    } catch (error) {
        message.error('No fue posible reenviar el código')
    }
}
</script>

<template>
    <div class="login-container">
        <NCard class="login-card">
            <div class="logo-container">
                <img
                    src="../../assets/logo.svg"
                    class="logo"
                    alt="Pollapp"
                />
            </div>

            <NH3>Confirmar correo electrónico</NH3>

            <NText depth="3">
                Ingresa el código de 5 dígitos enviado a tu correo electrónico.
            </NText>

            <NForm
                style="margin-top: 24px;"
                @submit.prevent="handleConfirmEmail"
            >
                <NFormItem label="Código de confirmación">
                    <NInput
                        v-model:value="confirmationCode"
                        maxlength="5"
                        placeholder="12345"
                        clearable
                    />
                </NFormItem>

                <NButton
                    type="primary"
                    block
                    :loading="loading"
                    @click="handleConfirmEmail"
                >
                    Confirmar Email
                </NButton>

                <NButton
                    tertiary
                    block
                    style="margin-top: 16px;"
                    @click="resendCode"
                >
                    Reenviar código
                </NButton>

                <NButton
                    block
                    style="margin-top: 16px;"
                    @click="goToLogin"
                >
                    Volver al Login
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

.logo-container {
    text-align: center;
    margin-bottom: 24px;
}

.logo {
    width: 80px;
}
</style>