import { useState, type ReactNode } from "react";

import axios from "axios";
import { z } from "zod";
import { LoginUser } from "../services/authService";
import { queryClient } from "../lib/queryClient";
import type { LoginFormValues } from "../schema/loginSchema";
import type { AuthSession, LoginErrorResponse } from "../types/auth";
import { AuthContext } from "@/context/auth-context";

type AuthProviderProps = {
    children: ReactNode;
};

const storedSessionSchema = z.object({
    user: z.object({
        id: z.number().int().positive(),
        username: z.string(),
        email: z.string().email(),
        firstName: z.string(),
        lastName: z.string(),
        gender: z.string(),
        image: z.string(),
    }),
    accessToken: z.string().min(1),
    refreshToken: z.string().min(1),
});

function readStoredSession(): AuthSession | null {
    try {
        const raw = localStorage.getItem("authSession") ?? sessionStorage.getItem("authSession");
        if (!raw) return null;
        const parsed = storedSessionSchema.safeParse(JSON.parse(raw));
        if (parsed.success) {
            localStorage.setItem("authSession", JSON.stringify(parsed.data));
            sessionStorage.removeItem("authSession");
            return parsed.data;
        }
    } catch {
        // Invalid storage is removed below.
    }
    localStorage.removeItem("authSession");
    sessionStorage.removeItem("authSession");
    return null;
}

export function AuthProvider({
    children,
}: AuthProviderProps) {
    const [session, setSession] = useState<AuthSession | null>(readStoredSession);
    const user = session?.user ?? null;
    const token = session?.accessToken ?? null;

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    async function login(
        credentials: LoginFormValues,
    ): Promise<boolean> {
        setLoading(true);
        setError("");

        try {
            const authenticatedSession = await LoginUser(credentials);
            setSession(authenticatedSession);
            localStorage.setItem("authSession", JSON.stringify(authenticatedSession));
            return true;
        } catch (caughtError: unknown) {
            if( 
                axios.isAxiosError<LoginErrorResponse>(caughtError)
            ) {
                setError (
                    "loginFailed",
                );
            } else{
                setError("unexpectedError");
            }
            return false;
        } finally {
            setLoading(false);
        }
    }
    function logout(): void {
        void queryClient.cancelQueries();
        queryClient.clear();
        setSession(null);
        setError("");

        localStorage.removeItem("authSession");
       
    }
    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                error,
                login,
                logout,
            }}
        >
            { children }
        </AuthContext.Provider>
    );
}
