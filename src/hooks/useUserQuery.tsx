import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../services/userService";

export function useUserQuery(userId: number){
    return useQuery({
        queryKey: ["user", userId],
        queryFn: () => getUserById(userId),
    });
};