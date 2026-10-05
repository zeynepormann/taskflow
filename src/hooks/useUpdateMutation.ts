import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { updateDemoTask } from "@/features/demo/store";
import type { EditTodoFormValues } from "@/schema/editTodoSchema";
import type { TodoWithDate } from "@/types/todo";

interface UpdateTodoVariables {
  task: TodoWithDate;
  values: EditTodoFormValues;
}

export function useUpdateMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ task, values }: UpdateTodoVariables): Promise<TodoWithDate> => {
      if (!user) throw new Error("Authentication is required");
      return updateDemoTask(user.id, task, {
        todo: values.todo,
        completed: values.completed,
        dueDate: new Date(`${values.dueDate}T12:00:00`),
        projectId: values.projectId,
      });
    },
    onSuccess: (updatedTask) => {
      queryClient.setQueryData<TodoWithDate[]>(["tasks", user!.id], (current = []) =>
        current.map((task) => task.id === updatedTask.id ? updatedTask : task),
      );
      queryClient.setQueryData<TodoWithDate>(["task", user!.id, updatedTask.id], updatedTask);
    },
  });
}
