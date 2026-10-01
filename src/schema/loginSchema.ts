import { z } from "zod";

export const loginSchema = z.object({
    username: z 
        .string()
        .trim()
        .min(1, {error:"usernameRequired"}),

    password: z
        .string()
        .min(6, {error: "passwordMinimum"}),


});

export type LoginFormValues = z.infer<typeof loginSchema>;
