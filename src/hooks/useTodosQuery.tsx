import { useQuery } from "@tanstack/react-query";   //istegi ve cache yonetir
import { getTodoById, getTodos } from "../services/todoService"; // axios ile dummyjsona istek atar
import { useQueryClient } from "@tanstack/react-query";
import type { TodoWithDate } from "../types/todo"; //uygulamada kullanılan görev türü

function dueDateForIndex(index: number): Date {
    const today = new Date();
    today.setHours(0,0,0,0);
    const dueDate = new Date(today);
    const dayOffSet = (index % 7) - 3;

    dueDate.setDate(dueDate.getDate() + dayOffSet);

    return dueDate;
}

async function fetchTodosWithDates(): Promise<TodoWithDate[]> {
    const data = await getTodos();

    return data.todos.map((todo,index) => {
        return{
            ...todo,
            dueDate: dueDateForIndex(index),
        };
    });   
}

async function fetchTodoWithDate(todoId: number): Promise<TodoWithDate> {
    const todo = await getTodoById(todoId);

    return {
        ...todo,
        dueDate: dueDateForIndex(todo.id - 1),
    };
}

export function useTodosQuery(){
    return useQuery({
        queryKey: ["todos"],
        queryFn: fetchTodosWithDates,
        staleTime: 60_000,
    });
}

export function useTodoQuery(todoId: number) {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ["todo", todoId],
        queryFn: () => fetchTodoWithDate(todoId),
        enabled: Number.isInteger(todoId) && todoId > 0,
        initialData: () =>
            queryClient
                .getQueryData<TodoWithDate[]>(["todos"])
                ?.find((todo) => todo.id === todoId),
        staleTime: 60_000,
    });
}

