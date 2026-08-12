import api from "../api/axiosInstance";
import type { userResponse, User } from "../types/user";

interface UserPaginationProps{
    limit: number;
    page: number;
}
interface UpdateUserRequest {
    firstname: string;
    lastname: string;
    username: string;
    email: string;    
}
export async function updateUserRequest(
  id: number, 
  changes: UpdateUserRequest, 
): Promise<void> {
  await api.put(`/users/${id}`, changes);
}

export async function deleteUserRequest(
    id:number,
): Promise <void>{
    await api.delete(`/users/${id}`);
}

export async function getUserById(userId: number): Promise<User>{
    const response = await api.get<User>(`/users/${userId}`)
    return response.data
}

export async function getUser({
    limit,
    page,
}: UserPaginationProps): Promise<userResponse>{

    const skip = (page - 1) * limit; 
    const response = await api.get<userResponse>("/users",{
        params: {
            limit,
            skip,
        }
    })

    return response.data
    
}