<script setup lang="ts">
  import { onMounted } from "vue";
  import BaseNavbar from "../components/layout/BaseNavbar.vue";
  import { isAxiosError } from "axios";
  import type { IErrorResponse } from "../services/base";
  import { useToast } from "primevue";
  import { useAuthStore } from "../libs/auth-storage";

  const toast = useToast();
  const auth = useAuthStore();

  onMounted(() => {
    onGetUserDetail();
  });

  const onGetUserDetail = async () => {
    try {
      await auth.handleUserDetail();
    } catch (error) {
      let errorMsg;
      if (isAxiosError(error)) {
        const responseData = error.response?.data as IErrorResponse;
        errorMsg = responseData?.error?.msg;
      }

      toast.add({
        severity: "error",
        summary: "Error",
        detail: errorMsg ?? "Failed to get user detail",
        life: 2000,
      });
    }
  };
</script>

<template>
  <BaseNavbar />
  <div class="container mx-auto py-2">
    <div class="flex-2 rounded-lg shadow-lg p-8 bg-card">
      <h2 class="font-semibold text-2xl">Welcome, {{ auth.userData?.name }}</h2>
    </div>
  </div>
</template>
