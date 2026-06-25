import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { authService, type RegisterRequest } from "../services/authService";
import type ConfirmationEmailRequest from "../interfaces/ConfirmationEmailInterface";
import type { LoginResponse, User } from "../interfaces/LoginInterface";
export const useAuthStore = defineStore("auth", () => {
  const loading = ref(false);

  const token = ref<string | null>(localStorage.getItem("token"));

  const user = ref<User | null>(
    JSON.parse(localStorage.getItem("user") || "null"),
  );

  const isAuthenticated = computed(() => !!token.value);

  const isGlobalAdmin = computed(() => {
    return user.value?.roles?.includes(3) ?? false;
  });


  async function register(payload: RegisterRequest) {
    loading.value = true;

    try {
      const response = await authService.register(payload);
      return response.data;
    } finally {
      loading.value = false;
    }
  }

  async function login(usernameOrEmail: string, password: string) {
    loading.value = true;

    try {
      const response = await authService.login({
        usernameOrEmail,
        password,
      });

      token.value = response.access_token;

      user.value = response.user;

      localStorage.setItem("token", response.access_token);

      localStorage.setItem("user", JSON.stringify(response.user));
      if (response.user.roles.includes(3)) {
        // Assuming 3 represents global admin role
      }
      return true;
    } finally {
      loading.value = false;
    }
  }

  async function confirmEmail(confirmationCode: ConfirmationEmailRequest) {
    loading.value = true;

    try {
      const response = await authService.confirmEmail({
        email: confirmationCode.email,
        code: confirmationCode.code,
      });

      return response.data;
    } finally {
      loading.value = false;
    }
  }

  async function sendRecoveryCode(email: string) {
    loading.value = true;

    try {
      const response = await authService.sendRecoveryCode(email);
      return response.data;
    } finally {
      loading.value = false;
    }
  }

  async function validateRecoveryCode(email: string, code: string) {
    loading.value = true;

    try {
      const response = await authService.validateRecoveryCode(email, code);
      return response.data;
    } finally {
      loading.value = false;
    }
  }

  async function changePassword(email: string, code: string, password: string) {
    loading.value = true;

    try {
      const response = await authService.changePassword(email, code, password);
      return response.data;
    } finally {
      loading.value = false;
    }
  }

  function googleLogin(userData: LoginResponse) {
    console.log('userData', userData)
    localStorage.setItem("user", JSON.stringify(userData.user))
    localStorage.setItem("token", userData.access_token);
    token.value = userData.access_token;
    user.value = userData.user;
  }

  function logout() {
    token.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    user.value = null;
  }

  return {
    token,
    loading,
    isAuthenticated,
    user,
    isGlobalAdmin,
    login,
    logout,
    register,
    confirmEmail,
    sendRecoveryCode,
    validateRecoveryCode,
    changePassword,
    googleLogin
  };
});
