import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { deleteDemoTask } from "@/features/demo/store";
import type { TodoWithDate } from "@/types/todo";

export function useDeleteMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (task: TodoWithDate): Promise<void> => {
      if (!user) throw new Error("Authentication is required");
      deleteDemoTask(user.id, task);
    },
    onSuccess: (_, task) => {
      queryClient.setQueryData<TodoWithDate[]>(["tasks", user!.id], (current = []) =>
        current.filter((item) => item.id !== task.id),
      );
      queryClient.removeQueries({ queryKey: ["task", user!.id, task.id] });
    },
  });
}