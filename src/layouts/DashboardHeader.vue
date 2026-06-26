<script setup lang="ts">
import { h } from 'vue'
import { useRouter } from 'vue-router'
import {
    NAvatar,
    NDropdown,
    NButton,
    NIcon,
} from 'naive-ui'
import AdminMenu from './AdminMenu.vue'
import { User, LogOut, Settings2, NotepadText } from '@lucide/vue';
import { useAuthStore } from '../stores/authStore'
const router = useRouter()
const authStore = useAuthStore()
const options = [
    {
        label: 'Mi Perfil',
        key: 'profile',
        icon: () => h(NIcon, null, {
            default: () => h(User)
        })
    },
    {
        label: 'Configuración',
        key: 'settings',
        icon: () => h(NIcon, null, {
            default: () => h(Settings2)
        })
    },
    {
        type: 'divider',
        key: 'divider'
    },
    {
        label: 'Cerrar Sesión',
        key: 'logout',
        icon: () => h(NIcon, null, {
            default: () => h(LogOut)
        })
    }
]

const handleSelect = (key: string) => {

    switch (key) {

        case 'profile':
            router.push('/dashboard/profile')
            break

        case 'settings':
            router.push('/dashboard/settings')
            break

        case 'logout':
            authStore.logout()
            router.push('/login')
            break
    }
}
</script>

<template>
    <header class="header">

        <div class="menu">

            <RouterLink to="/" class="brand">
                <img src="@/assets/logo.svg" alt="Pollapp" class="logo" />

                <span class="title">
                    Pollapp
                </span>
            </RouterLink>
            <RouterLink to="/home">
                <n-button quaternary>
                    <template #icon>
                        <n-icon>
                            <NotepadText />
                        </n-icon>
                    </template>
                    Mis Grupos
                </n-button>
            </RouterLink>

            <AdminMenu v-if="authStore.isGlobalAdmin" />
        </div>


        <div class="actions">

            <NDropdown trigger="click" :options="options" @select="handleSelect">
                <NButton quaternary>
                    <NAvatar round size="small">
                        <User />
                    </NAvatar>
                    <span style="margin-left: 8px;">
                        {{ authStore.user?.email }}
                    </span>
                </NButton>
            </NDropdown>

        </div>

    </header>
</template>

<style scoped>
.header {
    height: 64px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 24px;

    background: white;
    border-bottom: 1px solid #e5e7eb;
}

.brand {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
}
.menu{
    display: flex;
    align-items: center;
    gap: 24px;
}
.logo {
    width: 36px;
    height: 36px;
}

.title {
    font-size: 20px;
    font-weight: 600;
}

.actions {
    display: flex;
    align-items: center;
    gap: 16px;
}
</style>