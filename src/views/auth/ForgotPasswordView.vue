<script setup lang="ts">
import { ref } from 'vue'
import {
    NCard,
    NForm,
    NFormItem,
    NInput,
    NInputOtp,
    NButton,
    useMessage
} from 'naive-ui'

import { useAuthStore } from '../../stores/authStore'
import { useRouter } from 'vue-router'
const authStore = useAuthStore()
const message = useMessage()

const Step = {
  EMAIL: 1,
  CODE: 2,
  PASSWORD: 3
}

const route = useRouter()

const currentStep = ref<(typeof Step)[keyof typeof Step]>(Step.EMAIL)

const email = ref('')

const code = ref<string[]>([])

const password = ref('')
const repeatPassword = ref('')

async function sendRecoveryCode() {

    try {

        await authStore.sendRecoveryCode(email.value)

        message.success('Código enviado al correo')

        currentStep.value = Step.CODE

    } catch {

        message.error('No fue posible enviar el código')
    }
}

async function validateCode() {

    try {

        await authStore.validateRecoveryCode(
            email.value,
            code.value.join('')
        )

        message.success('Código válido')

        currentStep.value = Step.PASSWORD

    } catch {

        message.error('Código inválido')
    }
}

async function changePassword() {

    if (password.value !== repeatPassword.value) {

        message.warning(
            'Las contraseñas no coinciden'
        )

        return
    }

    try {

        await authStore.changePassword(
            email.value,
            code.value.join(''),
            password.value
        )

        message.success(
            'Contraseña actualizada correctamente'
        )

        route.push('/login')

    } catch {

        message.error(
            'No fue posible actualizar la contraseña'
        )
    }
}
</script>
<template>

    <div class="container">

        <NCard
            class="card"
        >

            <!-- PASO 1 -->
            <div style="text-align: center; margin-bottom: 24px;">
                <img src="../../assets/logo.svg" class="logo" />
            </div>
            <n-h3>Recuperar Contraseña</n-h3>

            <NForm v-if="currentStep === 1">

                <NFormItem label="Correo electrónico">

                    <NInput
                        v-model:value="email"
                    />

                </NFormItem>

                <NButton
                    type="primary"
                    block
                    @click="sendRecoveryCode"
                >
                    Enviar Código
                </NButton>

            </NForm>


            <!-- PASO 2 -->

            <div
                v-else-if="currentStep === 2"
                class="otp-container"
            >

                <NInputOtp
                    v-model:value="code"
                    :length="5"
                />

                <NButton
                    type="primary"
                    @click="validateCode"
                >
                    Validar Código
                </NButton>

            </div>


            <!-- PASO 3 -->

            <NForm v-else>

                <NFormItem label="Nueva contraseña">

                    <NInput
                        type="password"
                        show-password-on="click"
                        v-model:value="password"
                    />

                </NFormItem>

                <NFormItem label="Repetir contraseña">

                    <NInput
                        type="password"
                        show-password-on="click"
                        v-model:value="repeatPassword"
                    />

                </NFormItem>

                <NButton
                    type="primary"
                    block
                    @click="changePassword"
                >
                    Cambiar Contraseña
                </NButton>

            </NForm>

        </NCard>

    </div>

</template>

<style scoped>
.container {

    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    background: #f5f7fa;
}

.card {

    width: 420px;
}

.otp-container {

    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 24px;
}

.logo {
	width: 80px;
}
</style>