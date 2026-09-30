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
            queryClient.setQueryData<TodoWithDate[]>(["todos"], (current = []) =>
                current.map((todo) => todo.id === id ? {
                    ...todo,
                    todo: values.todo,
                    completed: values.completed,
                    dueDate: new Date(`${values.dueDate}T12:00:00`),
                } : todo),
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