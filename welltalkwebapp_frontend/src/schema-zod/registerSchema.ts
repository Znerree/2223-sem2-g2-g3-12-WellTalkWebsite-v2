import * as z from "zod";

export const registerSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    schoolID: z.string(),
    userType: z.string({
      required_error: "Please select a user type",
    }),
    username: z.string().min(3, {
      message: "Username must be at least 3 characters long",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
