import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodoRequest } from "../services/todoService";
import type { EditTodoFormValues } from "../schema/editTodoSchema";

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

        onSuccess: async () =>{
            await queryClient.invalidateQueries({
                queryKey: ["todos"],
            });
        },

        onError: (error) => {
            console.error(
                "Görev güncellenemedi",
                error,
            );
        },
    });
}