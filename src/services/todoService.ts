import api from "../api/axiosInstance";
import type { TodoResponse, AddTodoRequest, Todo } from "../types/todo";

export async function getTodos(): Promise<TodoResponse> {
  const response = await api.get<TodoResponse>("/todos");

  return response.data;
}

interface UpdateTodoRequest {
  todo: string;
  completed: boolean;
}

export async function updateTodoRequest(
  id: number, //güncellenecek gorev
  changes: UpdateTodoRequest, //apıya gonderilecek yeni acıklama ve durum
): Promise<void> {
  await api.put(`/todos/${id}`, changes);
}
//dueDate dummyJSONun gercek alanı olmadıgı icin onu contexte duzenleyeceksin

export async function deleteTodoRequest(  //silme fonksyionu
    id: number
): Promise<void> {  
  await api.delete(`/todos/${id}`);
}

export async function addTodoRequest(
  todoData: AddTodoRequest,
):Promise<Todo>{
  const response = await api.post<Todo>
    (
      "/todos/add",
      todoData,
    );
    return response.data
}