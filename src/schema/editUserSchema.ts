import { z } from "zod"

export const editUserSchema = z.object({
  firstname: z.string().trim().min(1, "validation.firstnameRequired"),

  lastname: z.string().trim().min(1, "validation.lastnameRequired"),

  username: z.string().trim().min(1, "validation.usernameRequired"),

  email: z.string().trim().min(1, "validation.emailRequired"),
});
export type EditUserFormValues = z.infer<typeof editUserSchema>