import api from "../api/axiosInstance"; 
import type { LoginFormValues } from "../schema/loginSchema";
import type { AuthUser } from "../types/auth";

export async function LoginUser(
    credentials: LoginFormValues,
): Promise <AuthUser> {
    const response = await api.post<AuthUser>(
        "/auth/login",
        credentials,
    );
    return response.data
}
