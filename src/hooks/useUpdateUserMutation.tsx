import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { updateDemoUser } from "@/features/demo/store";
import type { EditUserFormValues } from "@/schema/editUserSchema";
import type { User, userResponse } from "@/types/user";

interface UpdateUserVariables {
  user: User;
  values: EditUserFormValues;
}

export function useUpdateUserMutation() {
  const queryClient = useQueryClient();
  const { user: actor } = useAuth();

  return useMutation({
    mutationFn: async ({ user, values }: UpdateUserVariables): Promise<User> => {
      if (!actor) throw new Error("Authentication is required");
      return updateDemoUser(actor.id, user, {
        firstName: values.firstname,
        lastName: values.lastname,
        username: values.username,
        email: values.email,
      });
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData<User>(["user", actor!.id, updatedUser.id], updatedUser);
      queryClient.setQueriesData<userResponse>(
        { queryKey: ["users", actor!.id] },
        (current) => current ? {
          ...current,
          users: current.users.map((user) => user.id === updatedUser.id ? updatedUser : user),
        } : current,
      );
    },
  });
}
