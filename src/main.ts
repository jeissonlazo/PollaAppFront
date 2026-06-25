import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import naive from 'naive-ui'
import router from './router/index.ts'
import vue3GoogleLogin from 'vue3-google-login'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
const app = createApp(App)
app.use( vue3GoogleLogin, {
  clientId: import.meta.env.VITE_ID_CLIENT,
})
app.use(naive)
app.use(createPinia())
app.use(router)
app.mount('#app')
