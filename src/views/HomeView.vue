<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import BaseNavbar from "../components/layout/BaseNavbar.vue";
  import type { IUserData } from "../services/user/interface";
  import { getUserDetail } from "../services/user/service";
  import { isAxiosError } from "axios";
  import type { IErrorResponse } from "../services/base";
  import { useToast } from "primevue";

  const toast = useToast();

  const userData = ref<IUserData>();

  onMounted(() => {
    onGetUserDetail();
  });

  const onGetUserDetail = async () => {
    try {
      const response = await getUserDetail();

      if (response.data) {
        userData.value = response.data;
      }
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
      <h2 class="font-semibold text-2xl">Welcome, {{ userData?.name }}</h2>
    </div>
  </div>
</template>
