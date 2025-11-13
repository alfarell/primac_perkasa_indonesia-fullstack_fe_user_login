<script setup lang="ts">
  import { Form, FormField, type FormSubmitEvent } from "@primevue/forms";
  import { zodResolver } from "@primevue/forms/resolvers/zod";
  import {
    Button,
    Card,
    InputText,
    Message,
    Password,
    useToast,
  } from "primevue";
  import { loginSchema, type LoginFormType } from "../validations/login";
  import { isAxiosError } from "axios";
  import type { IErrorResponse } from "../services/base";
  import { router } from "../router";
  import { useAuthStore } from "../libs/auth-storage";

  const toast = useToast();
  const auth = useAuthStore();

  const onSubmitLogin = (event: FormSubmitEvent<Record<string, string>>) => {
    if (!event.valid) return;

    const formValues = event.values as LoginFormType;
    onProcessLogin(formValues);
  };

  const onProcessLogin = async (payload: LoginFormType) => {
    try {
      await auth.handleLogin(payload);

      toast.add({
        severity: "success",
        summary: "Login success",
        life: 2000,
      });

      router.replace("/");
    } catch (error) {
      let errorMsg;
      if (isAxiosError(error)) {
        const responseData = error.response?.data as IErrorResponse;
        errorMsg = responseData?.error?.msg;
      }

      toast.add({
        severity: "error",
        summary: "Login failed",
        detail: errorMsg ?? "Failed to login to your account",
        life: 2000,
      });
    }
  };
</script>

<template>
  <Card class="m-auto p-8">
    <template #title
      ><h2 class="m-auto mb-4 text-center font-semibold text-xl">
        Login
      </h2></template
    >
    <template #content>
      <Form
        :resolver="zodResolver(loginSchema)"
        @submit="onSubmitLogin"
        class="flex flex-col gap-4 w-full h-full items-stretch"
      >
        <FormField
          v-slot="$field"
          as="section"
          name="username"
          initialValue=""
          class="flex flex-col gap-2"
        >
          <InputText
            type="text"
            placeholder="Username"
            class="min-w-[300px] max-md:min-w-[200px]"
          />
          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</Message
          >
        </FormField>
        <FormField v-slot="$field" asChild name="password" initialValue="">
          <section class="flex flex-col gap-2">
            <Password
              type="text"
              placeholder="Password"
              :feedback="false"
              toggleMask
              fluid
            />
            <Message
              v-if="$field?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $field.error?.message }}</Message
            >
          </section>
        </FormField>
        <Button type="submit" label="Login" />
        <router-link to="/register" class="text-center">
          Don't have an account?
          <span class="font-semibold text-primary">Register</span>
        </router-link>
      </Form>
    </template>
  </Card>
</template>
