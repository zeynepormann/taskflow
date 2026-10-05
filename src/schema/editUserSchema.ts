import { z } from "zod";

export const editUserSchema = z.object({
  firstname: z
    .string()
    .trim()
    .min(1, "validation.firstnameRequired")
    .max(80, "validation.firstnameTooLong"),

  lastname: z
    .string()
    .trim()
    .min(1, "validation.lastnameRequired")
    .max(80, "validation.lastnameTooLong"),

  username: z
    .string()
    .trim()
    .min(1, "validation.usernameRequired")
    .max(50, "validation.usernameTooLong"),

  email: z
    .string()
    .trim()
    .min(1, "validation.emailRequired")
    .email("validation.emailInvalid")
    .max(254, "validation.emailTooLong"),
});
export type EditUserFormValues = z.infer<typeof editUserSchema>;
