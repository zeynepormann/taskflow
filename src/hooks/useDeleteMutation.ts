import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodoRequest } from "../services/todoService";

export function useDeleteMutation(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async(
            id: number,
        ): Promise<void> => {
            await deleteTodoRequest(id);
        },

        onSuccess: async () =>  {
            await queryClient.invalidateQueries({
                queryKey: ["todos"],    
            });
        },

        onError: (error) => {
            console.error(
                "Görev Silinemedi",
                error,
            );
        },
    });
}