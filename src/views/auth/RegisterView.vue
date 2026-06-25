<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
	NCard,
	NButton,
	NForm,
	NFormItem,
	NInput,
	type FormRules,
	useMessage
} from 'naive-ui'
import { useAuthStore } from '../../stores/authStore'
const router = useRouter()
const message = useMessage()
const authStore = useAuthStore()

const loading = ref(false)
const formRef = ref()

const form = reactive({
	first_name: '',
	last_name: '',
	username: '',
	email: '',
	password: '',
	repeat_password: ''
})

const rules: FormRules = {
	first_name: [
		{
			required: true,
			message: 'El nombre es obligatorio',
			trigger: ['blur']
		}
	],
	last_name: [
		{
			required: true,
			message: 'El apellido es obligatorio',
			trigger: ['blur']
		}
	],
	username: [
		{
			required: true,
			message: 'El usuario es obligatorio',
			trigger: ['blur']
		},
		{
			min: 3,
			message: 'El usuario debe tener mínimo 3 caracteres',
			trigger: ['blur']
		}
	],
	email: [
		{
			required: true,
			message: 'El email es obligatorio',
			trigger: ['blur']
		},
		{
			type: 'email',
			message: 'Email inválido',
			trigger: ['blur']
		}
	],
	password: [
		{
			required: true,
			message: 'La contraseña es obligatoria',
			trigger: ['blur']
		},
		{
			min: 8,
			message: 'La contraseña debe tener mínimo 8 caracteres',
			trigger: ['blur']
		}
	],
	repeat_password: [
		{
			required: true,
			message: 'Debe confirmar la contraseña',
			trigger: ['blur']
		},
		{
			validator: () => {
				return form.password === form.repeat_password
			},
			message: 'Las contraseñas no coinciden',
			trigger: ['input', 'blur']
		}
	]
}

const handleRegister = async () => {
	try {
		await formRef.value?.validate()

		loading.value = true

		await authStore.register(form)

		message.success('Cuenta creada correctamente')

		router.push(`/confirm-email/${form.email}`)
	} catch {
		message.error('Verifique los datos del formulario')
	} finally {
		loading.value = false
	}
}

const goToLogin = () => {
	router.push('/login')
}

const registerWithGoogle = () => {
	window.location.href =
		`${import.meta.env.VITE_API_URL}auth/google/login`
}

</script>

<template>
	<div class="register-container">
		<NCard class="register-card">
			<div style="text-align: center; margin-bottom: 24px;">
				<img src="../../assets/logo.svg" class="logo" />
			</div>

			<n-h3>Registra tu cuenta</n-h3>

			<NButton block size="large" @click="registerWithGoogle">
				Continuar con Google
				<template #icon>
					<n-icon>
						<img src="@/assets/google-authenticator.svg" style="height: 19px;"/>
					</n-icon>
				</template>
			</NButton>

			<NDivider>
				o
			</NDivider>
			<NForm ref="formRef" :model="form" :rules="rules">
				<NFormItem label="Nombre" path="first_name">
					<NInput v-model:value="form.first_name" placeholder="Nombre" />
				</NFormItem>

				<NFormItem label="Apellido" path="last_name">
					<NInput v-model:value="form.last_name" placeholder="Apellido" />
				</NFormItem>

				<NFormItem label="Usuario" path="username">
					<NInput v-model:value="form.username" placeholder="Usuario" />
				</NFormItem>

				<NFormItem label="Correo electrónico" path="email">
					<NInput v-model:value="form.email" placeholder="correo@ejemplo.com" />
				</NFormItem>

				<NFormItem label="Contraseña" path="password">
					<NInput v-model:value="form.password" type="password" show-password-on="click" placeholder="Contraseña" />
				</NFormItem>

				<NFormItem label="Confirmar contraseña" path="repeat_password">
					<NInput v-model:value="form.repeat_password" type="password" show-password-on="click"
						placeholder="Confirmar contraseña" />
				</NFormItem>

				<NButton type="primary" block :loading="loading" @click="handleRegister">
					Crear Cuenta
				</NButton>

				<NButton block style="margin-top: 16px;" @click="goToLogin">
					Ya tengo una cuenta
				</NButton>
			</NForm>
		</NCard>
	</div>
</template>

<style scoped>
.register-container {
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #f5f7fa;
}

.register-card {
	width: 100%;
	max-width: 500px;
}

.logo {
	width: 80px;
}
</style>