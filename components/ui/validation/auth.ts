import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
