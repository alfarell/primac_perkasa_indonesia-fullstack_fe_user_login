<script setup lang="ts">
  import { Toast } from "primevue";
  import { RouterView } from "vue-router";
</script>

<template>
  <div class="w-full min-h-screen flex flex-col">
    <RouterView />

    <Toast />
  </div>
</template>

<style scoped></style>
