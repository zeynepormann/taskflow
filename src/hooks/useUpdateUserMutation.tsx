import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserRequest } from "../services/userService";
import type { EditUserFormValues } from "../schema/editUserSchema";
import type { User, userResponse } from "../types/user";

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
        }:UpdateUserVariables): Promise<User> => {
            return updateUserRequest(id,{
                firstName: values.firstname,
                lastName: values.lastname,
                username: values.username,
                email: values.email,
            });
        },
        
        onSuccess: (updatedUser, { id, values }) => {
            const updatedFields = {
                ...updatedUser,
                firstName: values.firstname,
                lastName: values.lastname,
                username: values.username,
                email: values.email,
            };

            queryClient.setQueryData<User>(["user", id], (current) => ({
                ...current,
                ...updatedFields,
            }));
            queryClient.setQueriesData<userResponse>(
                { queryKey: ["users"] },
                (current) =>
                    current
                        ? {
                              ...current,
                              users: current.users.map((user) =>
                                  user.id === id ? { ...user, ...updatedFields } : user,
                              ),
                          }
                        : current,
            );
        },

        onError: (error) => {
            console.error(
                "Kullanıcı güncellenemedi",
                error,
            );
        },
    });
}