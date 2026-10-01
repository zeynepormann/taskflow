import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodoRequest } from "../services/todoService";
import type { EditTodoFormValues } from "../schema/editTodoSchema";
import type { TodoWithDate } from "../types/todo";

interface UpdateTodoVariables{
    id: number;
    values: EditTodoFormValues;
}

export function useUpdateMutation(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async({
            id,
            values,
        }: UpdateTodoVariables): Promise<void> => {
            await updateTodoRequest(id, {
                todo: values.todo,
                completed: values.completed,
            });
        },

        onSuccess: (_, { id, values }) => {
            const updateTodo = (todo: TodoWithDate) => ({
                    ...todo,
                    todo: values.todo,
                    completed: values.completed,
                    dueDate: new Date(`${values.dueDate}T12:00:00`),
            });

            queryClient.setQueryData<TodoWithDate[]>(["todos"], (current = []) =>
                current.map((todo) => todo.id === id ? updateTodo(todo) : todo),
            );
            queryClient.setQueryData<TodoWithDate>(["todo", id], (current) =>
                current ? updateTodo(current) : current,
            );
        },

        onError: (error) => {
            console.error(
                "Görev güncellenemedi",
                error,
            );
        },
    });
}
