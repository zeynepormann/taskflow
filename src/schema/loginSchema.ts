import { z } from "zod";

export const loginSchema = z.object({
    username: z 
        .string()
        .trim()
        .min(1, {error:"Kullanıcı adı zorunludur."}),
    
    password: z
        .string()
        .min(6, {error: "Şifre en az 6 karakterli olmalı."}),

        
});

export type LoginFormValues = z.infer<typeof loginSchema>;
    