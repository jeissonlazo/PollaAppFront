<template>
	<div class="register-view">
		<h2>Register</h2>
		<form @submit.prevent="onSubmit" class="register-form">
			<label>
				Name
				<input v-model="form.name" type="text" required />
			</label>

			<label>
				Email
				<input v-model="form.email" type="email" required />
			</label>

			<label>
				Password
				<input v-model="form.password" type="password" required minlength="6" />
			</label>

			<button type="submit">Create account</button>
		</form>
	</div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({ name: '', email: '', password: '' })

function onSubmit() {
	// basic placeholder action — replace with real registration logic
	// e.g., call API and handle response
	console.log('Registering user', { ...form })
	// reset form
	form.name = ''
	form.email = ''
	form.password = ''
}
</script>

<style scoped>
.register-view {
	max-width: 420px;
	margin: 40px auto;
	padding: 16px;
	border: 1px solid #e5e7eb;
	border-radius: 8px;
	background: #fff;
}
.register-form {
	display: flex;
	flex-direction: column;
	gap: 12px;
}
label {
	display: flex;
	flex-direction: column;
	font-size: 14px;
}
input {
	padding: 8px 10px;
	border: 1px solid #cbd5e1;
	border-radius: 4px;
}
button {
	padding: 10px 12px;
	background: #2563eb;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}
button:hover { opacity: 0.95 }
</style>
