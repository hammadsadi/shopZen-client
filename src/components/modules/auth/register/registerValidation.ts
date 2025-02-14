import { z } from "zod";

export const registerValidationSchema = z.object({
  name: z
    .string({ required_error: "User Name is Required!" })
    .min(2, "First Name must be between 2 and 50 Characters")
    .max(50, "First Name must be between 2 and 50 Characters"),
  email: z
    .string({ required_error: "User Email is Required!" })
    .email("Invalid Email Address"),
  password: z
    .string({ required_error: "User Password is Required!" })
    .min(8, "Password Must be 8 Characters"),
  confirmPassword: z
    .string({ required_error: "Confirm Password is Required!" })
    .min(8, "Password Must be 8 Characters"),
});