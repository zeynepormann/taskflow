import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserRequest } from "../services/userService";

export function useDeleteUserRequest(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async(
            id: number,
        ): Promise <void> => {
            await deleteUserRequest(id);
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },

        onError: (error) => {
            console.error(
                "Kullanıcı silinemedi",
                error,
            );
        },
    })
}