import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/userService";
import type { User } from "../types/user";

async function fetchUsers(): Promise <User[]>{
    const data = await getUser();

    return data.users
}

export function useUsersQuery(){
    return useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
        staleTime: 60_000,
    });
}