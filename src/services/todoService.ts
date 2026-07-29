import api from "../api/axiosInstance"
import type { TodoResponse } from "../types/todo"

export async function getTodos(): Promise<TodoResponse>{
    const response = await api.get<TodoResponse>("/todos");
    
    return response.data;
}
