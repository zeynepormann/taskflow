import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/auth-context";
import { mergeDemoUsers } from "@/features/demo/store";
import { getUserById } from "@/services/userService";
import type { userResponse, User } from "@/types/user";

export const userQueryKeys = {
  lists: (actorId: number | undefined) => ["users", actorId] as const,
  detail: (actorId: number | undefined, userId: number) =>
    ["user", actorId, userId] as const,
};

export function isValidUserId(id: number): boolean {
  return Number.isInteger(id) && id > 0;
}

async function fetchDemoUser(actorId: number, userId: number): Promise<User> {
  const remoteUser = await getUserById(userId);
  const user = mergeDemoUsers(actorId, [remoteUser])[0];

  if (!user) throw new Error("USER_NOT_FOUND");

  return user;
}

function findCachedUser(
  queryClient: ReturnType<typeof useQueryClient>,
  actorId: number | undefined,
  userId: number,
): User | undefined {
  const cachedLists = queryClient.getQueriesData<userResponse>({
    queryKey: userQueryKeys.lists(actorId),
  });

  return cachedLists
    .flatMap(([, response]) => response?.users ?? [])
    .find((user) => user.id === userId);
}

export function useUserQuery(userId: number) {
  const { user: actor } = useAuth();
  const queryClient = useQueryClient();
  const actorId = actor?.id;
  const validUserId = isValidUserId(userId);

  return useQuery<User, Error>({
    queryKey: userQueryKeys.detail(actorId, userId),
    enabled: actorId !== undefined && validUserId,
    queryFn: () => fetchDemoUser(actorId!, userId),
    initialData: () => findCachedUser(queryClient, actorId, userId),
    staleTime: 60_000,
  });
}
