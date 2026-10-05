import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { deleteDemoUser } from "@/features/demo/store";
import type { userResponse } from "@/types/user";

export function useDeleteUserRequest() {
  const queryClient = useQueryClient();
  const { user: actor } = useAuth();

  return useMutation({
    mutationFn: async (id: number): Promise<void> => {
      if (!actor) throw new Error("Authentication is required");
      deleteDemoUser(actor.id, id);
    },
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: ["user", actor!.id, deletedId] });
      queryClient.setQueriesData<userResponse>(
        { queryKey: ["users", actor!.id] },
        (current) => current ? {
          ...current,
          users: current.users.filter((user) => user.id !== deletedId),
          total: Math.max(0, current.total - 1),
        } : current,
      );
    },
  });
}