import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z
    .string({ required_error: "User Email is Required!" })
    .email("Invalid Email Address"),
  password: z
    .string({ required_error: "User Password is Required!" })
    .min(8, "Password Must be 8 Characters"),

});