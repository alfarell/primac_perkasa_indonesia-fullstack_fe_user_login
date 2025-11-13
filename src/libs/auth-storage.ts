import { defineStore } from "pinia";
import { loginAccount } from "../services/auth/service";
import type { LoginFormType } from "../validations/login";
import type { IUserData } from "../services/user/interface";
import { getUserDetail } from "../services/user/service";

export interface AuthStoreState {
  userData: IUserData | null;
  accessToken: string | null;
}

export const useAuthStore = defineStore("auth", {
  state: () =>
    ({
      userData: null,
      accessToken: null,
    }) as AuthStoreState,

  persist: {
    storage: localStorage,
  },

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },

  actions: {
    async handleLogin(payload: LoginFormType) {
      const response = await loginAccount(payload);
      const accessToken = response?.data?.accessToken as string;
      this.accessToken = accessToken;
    },

    async handleUserDetail() {
      if (!this.accessToken) return;

      const response = await getUserDetail();
      if (response.data) {
        this.userData = response.data;
      }
    },

    handleLogout() {
      this.$reset();
    },
  },
});
