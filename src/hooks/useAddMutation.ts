import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/auth-context";
import { createDemoTask } from "@/features/demo/store";
import type { AddTodoFormValues } from "@/schema/addTodoSchema";
import type { TodoWithDate } from "@/types/todo";

export function useAddMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (values: AddTodoFormValues): Promise<TodoWithDate> => {
      if (!user) throw new Error("Authentication is required");
      return createDemoTask(user.id, {
        todo: values.todo,
        completed: values.completed,
        dueDate: new Date(`${values.dueDate}T12:00:00`),
        projectId: values.projectId,
      });
    },
    onSuccess: (task) => {
      queryClient.setQueryData<TodoWithDate[]>(["tasks", user!.id], (current = []) => [...current, task]);
      queryClient.setQueryData<TodoWithDate>(["task", user!.id, task.id], task);
    },
  });
}