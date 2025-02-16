import { z } from "zod";

export const shopValidationSchema = z.object({
  shopName: z
    .string({ required_error: "Shop Name is Required!" })
    .min(1, "Shop Name cannot be empty"),
  businessLicenseNumber: z
    .string({ required_error: "Business License Number is Required!" })
    .min(1),
  address: z.string({ required_error: "Address is Required!" }).min(1),
  contactNumber: z
    .string({ required_error: "Contact Number is Required!" })
    .regex(/^\+?[0-9-]+$/, "Invalid Contact Number"),
  website: z
    .string({ required_error: "Website is Required!" })
    .url("Invalid URL"),
  servicesOffered: z
    .string({required_error:'At least one service is required'}),

  // Established Year (String format but validated as a number)
  establishedYear: z
    .string({ required_error: "Established Year is Required!" })
    .refine(
      (year) => /^\d{4}$/.test(year),
      "Established Year must be a valid 4-digit number"
    )
    .refine(
      (year) => parseInt(year, 10) >= 1900,
      "Established Year must be 1900 or later"
    ),

  socialMediaLinks: z.object({
    facebook: z
      .string({ required_error: "Facebook link is Required!" })
      .url("Invalid Facebook URL"),
    twitter: z
      .string({ required_error: "Twitter link is Required!" })
      .url("Invalid Twitter URL"),
    instagram: z
      .string({ required_error: "Instagram link is Required!" })
      .url("Invalid Instagram URL"),
  }),

  taxIdentificationNumber: z
    .string({ required_error: "Tax Identification Number is Required!" })
    .min(1),
});
