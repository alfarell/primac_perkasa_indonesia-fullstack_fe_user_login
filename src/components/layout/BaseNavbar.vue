<script setup lang="ts">
  import { Button } from "primevue";
  import { useAuthStore } from "../../libs/auth-storage";
  import { router } from "../../router";

  const authStore = useAuthStore();

  const onLogout = () => {
    authStore.handleLogout();
    router.push("/login");
  };
</script>

<template>
  <nav class="relative h-14 w-full">
    <div
      class="fixed m-auto rounded shadow container top-0 right-0 left-0 w-full h-14 bg-card flex items-center justify-between px-8"
    >
      <a class="cursor-pointer text-xl text-primary font-semibold">Dashboard</a>
      <Button
        icon="pi pi-sign-out"
        variant="text"
        class="flex items-center justify-center text-red-400!"
        label="Logout"
        v-on:click="onLogout"
      />
    </div>
  </nav>
</template>
