import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/userService";
import type { userResponse } from "../types/user";

async function fetchUsers(
    limit: number,
    page: number,
): Promise <userResponse>{
    const data = await getUser({
        limit,
        page,
    });

    return data
}

export function useUsersQuery(limit: number, page: number) {
  return useQuery({
    queryKey: ["users", { limit, page }],
    queryFn: () => fetchUsers(limit, page),
    staleTime: 60_000,
  });
}