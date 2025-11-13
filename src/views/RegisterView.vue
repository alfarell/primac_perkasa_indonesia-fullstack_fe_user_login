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
  import { registerSchema } from "../validations/register";
  import type { RegisterFormType } from "../validations/register";
  import { registerAccount } from "../services/auth/service";
  import { isAxiosError } from "axios";
  import type { IErrorResponse } from "../services/base";

  const toast = useToast();

  const onSubmitRegister = (event: FormSubmitEvent<Record<string, string>>) => {
    if (!event.valid) return;

    const formValues = event.values as RegisterFormType;
    onProcessRegister(formValues, event);
  };

  const onProcessRegister = async (
    payload: RegisterFormType,
    event: FormSubmitEvent<Record<string, string>>
  ) => {
    try {
      await registerAccount(payload);

      toast.add({
        severity: "success",
        summary: "Register success",
        detail: "Go to login page to log in to your account",
        life: 2000,
      });

      event.reset();
    } catch (error) {
      let errorMsg;
      if (isAxiosError(error)) {
        const responseData = error.response?.data as IErrorResponse;
        errorMsg = responseData?.error?.msg;
      }

      toast.add({
        severity: "error",
        summary: "Registration failed",
        detail: errorMsg ?? "Failed to register new account",
        life: 2000,
      });
    }
  };
</script>

<template>
  <Card class="m-auto p-8">
    <template #title
      ><h2 class="m-auto mb-4 text-center font-semibold text-xl">
        Create a new account
      </h2></template
    >
    <template #content>
      <Form
        :resolver="zodResolver(registerSchema)"
        @submit="onSubmitRegister"
        class="flex flex-col gap-4 w-full h-full items-stretch"
      >
        <FormField
          v-slot="$field"
          as="section"
          name="name"
          initialValue=""
          class="flex flex-col gap-2"
        >
          <InputText
            type="text"
            placeholder="Name"
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
        <FormField
          v-slot="$field"
          as="section"
          name="email"
          initialValue=""
          class="flex flex-col gap-2"
        >
          <InputText
            type="text"
            placeholder="Email"
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
        <Button type="submit" severity="primary" label="Register" />
        <router-link to="/login" class="text-center">
          Already have account?
          <span class="font-semibold text-primary">Go to login</span>
        </router-link>
      </Form>
    </template>
  </Card>
</template>
