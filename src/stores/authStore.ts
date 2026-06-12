import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { authService, type RegisterRequest } from "../services/authService";
import type ConfirmationEmailRequest from "../interfaces/ConfirmationEmailInterface";
import type { User } from "../interfaces/LoginInterface";
export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(localStorage.getItem("token"));
  const isGlobalAdmin = ref<boolean>(true);
  const loading = ref(false);

  const isAuthenticated = computed(() => !!token.value);

  const user = ref<User | null>(
    JSON.parse(localStorage.getItem("user") || "null"),
  );

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

  async function changePassword( email: string, code: string, password : string) {
    loading.value = true;

    try {
      const response = await authService.changePassword(email, code, password);
      return response.data;
    } finally {
      loading.value = false;
    }
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
    changePassword
  };
});
