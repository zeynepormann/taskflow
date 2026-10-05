import api from "../api/axiosInstance"; 
import type { LoginFormValues } from "../schema/loginSchema";
import type { AuthSession, LoginResponse } from "../types/auth";

export async function LoginUser(
    credentials: LoginFormValues,
): Promise<AuthSession> {
    const response = await api.post<LoginResponse>(
        "/auth/login",
        credentials,
    );
    const { accessToken, refreshToken, ...user } = response.data;
    return { user, accessToken, refreshToken };
}
