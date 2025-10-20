// lib/validations/admin.ts
import { z } from "zod";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,64}$/;
// Explanation:
// (?=.*[a-z])  -> at least one lowercase
// (?=.*[A-Z])  -> at least one uppercase
// (?=.*\d)     -> at least one digit
// (?=.*[^\da-zA-Z]) -> at least one special char
// .{8,64}      -> total length between 8 and 64

export const AdminSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password must not exceed 64 characters")
      .regex(
        PASSWORD_REGEX,
        "Password must include upper and lower case letters, a number and a special character"
      ),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type AdminFormValues = z.infer<typeof AdminSchema>;