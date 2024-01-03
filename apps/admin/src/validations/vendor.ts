import * as z from "zod";

export const vendorSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  phone: z
    .string()
    .min(11, { message: "Phone number must be at least 11 characters long" }),
  address: z
    .string()
    .min(10, { message: "Address must be at least 10 characters long" }),
});

