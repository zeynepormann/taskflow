import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query"

import { addTodoRequest } from "../services/todoService"
import { useAuth } from "../context/AuthContext"
import type { AddTodoFormValues } from "../schema/addTodoSchema"

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

        onSuccess: async () => {    //mutasyon hata vermediginde calısır    
            await queryClient.invalidateQueries({
                queryKey: ["todos"],   //todos cache'ini gecersiz-eski olarak isaretler yeniden cagırır axios-GET gelen cevap cache yazılır 
            });
        },

        onError: (error) => {
            console.error(
                "Görev Eklenemedi",
                error,
            );
        },
    });
}