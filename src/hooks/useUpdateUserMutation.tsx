import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserRequest } from "../services/userService";
import type { EditUserFormValues } from "../schema/editUserSchema";

interface UpdateUserVariables{
    id: number;
    values: EditUserFormValues;
}

export function useUpdateUserMutation(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async({
            id,
            values,
        }:UpdateUserVariables): Promise<void> => {
            await updateUserRequest(id,{
                firstname: values.firstname,
                lastname: values.lastname,
                username: values.username,
                email: values.email,
            });
        },
        
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },

        onError: (error) => {
            console.error(
                "Kullanıcı güncellenemedi",
                error,
            );
        },
    });
}