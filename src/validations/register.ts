import { z } from "zod";

export const registerSchema = z.object({
  email: z.email(),
  username: z
    .string()
    .min(6, { error: "Username should be at least 6 character" }),
  password: z
    .string()
    .min(8, { error: "Password should be at least 8 characters" }),
  name: z.string().min(1, { error: "Name is required" }),
});

export type RegisterFormType = z.infer<typeof registerSchema>;
