import api from "../api/axiosInstance";
import type { TodoResponse, AddTodoRequest, Todo } from "../types/todo";

export async function getTodosForUser(userId: number): Promise<TodoResponse> {
  const response = await api.get<TodoResponse>(`/todos/user/${userId}`);
  return response.data;
}

export async function getTodoById(todoId: number): Promise<Todo> {
  const response = await api.get<Todo>(`/todos/${todoId}`);
  return response.data;
}

interface UpdateTodoRequest {
  todo: string;
  completed: boolean;
}

export async function updateTodoRequest(
  id: number,
  changes: UpdateTodoRequest,
): Promise<void> {
  await api.put(`/todos/${id}`, changes);
}

export async function deleteTodoRequest(id: number): Promise<void> {
  await api.delete(`/todos/${id}`);
}

export async function addTodoRequest(todoData: AddTodoRequest): Promise<Todo> {
  const response = await api.post<Todo>("/todos/add", todoData);
  return response.data;
}
