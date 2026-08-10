import api from "../api/axiosInstance";
import type { userResponse } from "../types/user";

export async function getUser() : Promise<userResponse> {
    const response = await api.get<userResponse>("/users");
    return response.data
}
