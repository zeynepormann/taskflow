import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

import axios from "axios";
import { LoginUser } from "../services/authService";
import type { LoginFormValues } from "../schema/loginSchema";
import type {
    AuthUser,
    LoginErrorResponse,
} from "../types/auth";

type AuthContextValue = {
    user: AuthUser | null;
    token: string | null;
    loading: boolean;
    error: string;

    login: (
        credentials: LoginFormValues,
    ) => Promise<boolean>;

    logout: () => void;
};

type AuthProviderProps = {
    children: ReactNode;
};

const AuthContext = createContext<
    AuthContextValue | undefined
>(undefined);

export function AuthProvider({
    children,
}: AuthProviderProps) {
    const [user, setUser] = useState<AuthUser | null> (null);

    const [token, setToken] = useState<string | null> (
        () => sessionStorage.getItem("accessToken"),
    );

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    async function login(
        credentials: LoginFormValues,
    ): Promise<boolean> {
        setLoading(true);
        setError("");

        try {
            const authenticatedUser = await LoginUser(credentials);

            setUser(authenticatedUser);
            setToken(authenticatedUser.accessToken);

            sessionStorage.setItem(
                "accessToken",
                authenticatedUser.accessToken,
            );

            sessionStorage.setItem(
                "refreshToken",
                authenticatedUser.refreshToken,
            );
            return true;
        } catch (caughtError: unknown) {
            if( 
                axios.isAxiosError<LoginErrorResponse>(caughtError)
            ) {
                setError (
                    caughtError.response?.data?.message ??
                        "Giriş başarısız.",
                );
            } else{
                setError("Beklenmeyen hata oluştu.");
            }
            return false;
        } finally {
            setLoading(false);
        }
    }
    function logout(): void {
        setUser(null);
        setToken(null);
        setError("");

        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
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

export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);

    if (context === undefined){
        throw new Error(
            "useAuth, AuthProvider içinde kullanılmalıdır.",
        );
    }
    return context;
}
