import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
const routes = [
    {
        path: '/',
        redirect: '/home'
    },

    // Auth
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/auth/LoginView.vue'),
        meta: {
            guest: true
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/auth/RegisterView.vue'),
        meta: {
            guest: true
        }
    },

    // Private Routes
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/matches',
        name: 'matches',
        component: () => import('../views/MatchesView.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/predictions',
        name: 'predictions',
        component: () => import('../views/PredictionsView.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/ProfileView.vue'),
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/:pathMatch(.*)*',
        redirect: '/home'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, _from, next) => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return next('/login')
    }

    if (to.meta.guest && authStore.isAuthenticated) {
        return next('/home')
    }

    next()
})

export default router