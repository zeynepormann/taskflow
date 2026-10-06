import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/auth-context";
import { getTodoById, getTodosForUser } from "@/services/todoService";
import { getLocalDemoTask, mergeDemoTasks } from "@/features/demo/store";
import type { TodoWithDate } from "@/types/todo";

type TaskRouteId =
  | { source: "local"; value: string }
  | { source: "remote"; value: number };

function parseTaskRouteId(id: string | undefined): TaskRouteId | undefined {
  if (!id) return undefined;

  if (id.startsWith("local-") && id.length > "local-".length) {
    return { source: "local", value: id };
  }

  const remoteId = Number(id);
  if (Number.isInteger(remoteId) && remoteId > 0 && String(remoteId) === id) {
    return { source: "remote", value: remoteId };
  }

  return undefined;
}

export function isValidTaskRouteId(id: string | undefined): id is string {
  return parseTaskRouteId(id) !== undefined;
}

export function useTodosQuery() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["tasks", user?.id],
    enabled: Boolean(user),
    queryFn: async () =>
      mergeDemoTasks(user!.id, (await getTodosForUser(user!.id)).todos),
    staleTime: 60_000,
  });
}

export function useTodoQuery(id: string | undefined) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const taskRouteId = parseTaskRouteId(id);

  return useQuery({
    queryKey: ["task", user?.id, id],
    enabled: Boolean(user) && taskRouteId !== undefined,
    queryFn: async (): Promise<TodoWithDate> => {
      if (!user || !taskRouteId) throw new Error("Invalid task route");

      if (taskRouteId.source === "local") {
        const task = getLocalDemoTask(user.id, taskRouteId.value);
        if (!task) throw new Error("Task not found");
        return task;
      }

      const remoteTask = await getTodoById(taskRouteId.value);
      if (remoteTask.userId !== user.id) {
        throw new Error("Task not found");
      }

      const task = mergeDemoTasks(user.id, [remoteTask])[0];
      if (!task) throw new Error("Task not found");
      return task;
    },
    initialData: () =>
      queryClient
        .getQueryData<TodoWithDate[]>(["tasks", user?.id])
        ?.find((task) => task.id === id),
    staleTime: 60_000,
  });
}
