import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/auth-context";
import { mergeDemoUsers } from "@/features/demo/store";
import { getUser } from "@/services/userService";

export function useUsersQuery(limit: number, page: number) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["users", user?.id, { limit, page }],
    enabled: Boolean(user),
    queryFn: async () => {
      const response = await getUser({ limit, page });
      const users = mergeDemoUsers(user!.id, response.users);
      return { ...response, users, total: response.total - (response.users.length - users.length) };
    },
    staleTime: 60_000,
  });
}
