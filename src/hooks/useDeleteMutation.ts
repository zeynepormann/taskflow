import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodoRequest } from "../services/todoService";
import type { TodoWithDate } from "../types/todo";

export function useDeleteMutation(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async(
            id: number,
        ): Promise<void> => {
            await deleteTodoRequest(id);
        },

        onSuccess: (_, deletedId) =>  {
            queryClient.setQueryData<TodoWithDate[]>(["todos"], (current = []) =>
                current.filter((todo) => todo.id !== deletedId),
            );
        },

        onError: (error) => {
            console.error(
                "Görev Silinemedi",
                error,
            );
        },
    });
}