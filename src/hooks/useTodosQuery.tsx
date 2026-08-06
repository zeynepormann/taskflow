import { useQuery } from "@tanstack/react-query";   //istegi ve cache yonetir
import { getTodos } from "../services/todoService"; // axios ile dummyjsona istek atar
import type { TodoWithDate } from "../types/todo"; //uygulamada kullanılan görev türü

async function fetchTodosWithDates(): Promise<TodoWithDate[]> {
    const data = await getTodos();
    const today = new Date();
    today.setHours(0,0,0,0);

    return data.todos.map((todo,index) => {
        const dueDate = new Date(today);
        const dayOffSet = (index % 7) - 3;

        dueDate.setDate(
            dueDate.getDate() + dayOffSet,
        );
        return{
            ...todo,
            dueDate,
        };
    });   
}

export function useTodosQuery(){
    return useQuery({
        queryKey: ["todos"],
        queryFn: fetchTodosWithDates,
        staleTime: 60_000,
    });
}

