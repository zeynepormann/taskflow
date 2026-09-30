import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query"

import { addTodoRequest } from "../services/todoService"
import { useAuth } from "../context/AuthContext"
import type { AddTodoFormValues } from "../schema/addTodoSchema"
import type { TodoWithDate } from "../types/todo";

export function useAddMutation(){
    const queryClient = useQueryClient();
    const { user } = useAuth();

    return useMutation({
        mutationFn: async (  //addtodo formdan gelen veriyi alır -> apınin kabul ettigi sekilde donusturur
            values: AddTodoFormValues,
        ) => {
            if (!user){
                throw new Error(
                    "Görev eklemek için kullanıcı bulunamadı"
                );
            }
            return addTodoRequest({
                todo: values.todo,
                completed: values.completed,
                userId: user.id,
            });
        },

        onSuccess: (createdTodo, values) => {
            queryClient.setQueryData<TodoWithDate[]>(["todos"], (current = []) => [
                ...current,
                { ...createdTodo, dueDate: new Date(`${values.dueDate}T12:00:00`), isLocal: true },
            ]);
        },

        onError: (error) => {
            console.error(
                "Görev Eklenemedi",
                error,
            );
        },
    });
}