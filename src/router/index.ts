import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/authStore";

const routes = [
  {
    path: "/",
    redirect: "/dashboard/home",
  },

  // AUTH
  {
    path: "/login",
    name: "login",
    component: () => import("../views/auth/LoginView.vue"),
    meta: {
      guest: true,
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/auth/RegisterView.vue"),
    meta: {
      guest: true,
    },
  },
  {
    path: "/confirm-email/:email",
    name: "confirm-email",
    component: () => import("../views/auth/ConfirmEmailView.vue"),
    meta: {
      guest: true,
    },
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: () => import("../views/auth/ForgotPasswordView.vue"),
    meta:{
      guest:true
    }
  },

  // DASHBOARD
  {
    path: "/dashboard",
    component: () => import("../layouts/DashboardLayout.vue"),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "",
        redirect: "/dashboard/home",
      },
      {
        path: "home/:code?",
        name: "home_code",
        component: () => import("../views/dashboard/HomeView.vue"),
      },
      {
        path: "home",
        name: "home",
        component: () => import("../views/dashboard/HomeView.vue"),
      },
      {
        path: "profile",
        name: "profile",
        component: () => import("../views/dashboard/ProfileView.vue"),
      },
      {
        path: "groups/:id",
        name: "group-details",
        component: () => import("../views/dashboard/groups/GroupView.vue"),
      },
      {
        path: "matches/:id/:group_id",
        name: "match-details",
        component: () => import("../views/dashboard/MatchDetails.vue"),
      },

      {
        path: "admin",
        children: [
          {
            path: "",
            name: "admin-home",
            component: () =>
              import("../views/dashboard/admin/AdminHomeView.vue"),
          },
          {
            path: "matches",
            name: "admin-matches",
            component: () =>
              import("../views/dashboard/admin/MatchManagementView.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/dashboard/home",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next("/login");
  }

  if (to.meta.guest && authStore.isAuthenticated) {
    return next("/dashboard/home");
  }

  next();
});

export default router;
