import { createContext, useContext } from "react";
import type { AuthSession } from "@/types/auth";
import type { LoginFormValues } from "@/schema/loginSchema";

export type AuthContextValue = {
  user: AuthSession["user"] | null;
  token: string | null;
  loading: boolean;
  error: string;
  login: (credentials: LoginFormValues) => Promise<boolean>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
