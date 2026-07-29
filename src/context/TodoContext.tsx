import {
    useContext, 
    useEffect,
    createContext,
    useState,
    type ReactNode
} from "react";
import { getTodos } from "../services/todoService";
import type { TodoWithDate } from "../types/todo";

interface TodoContextValue {
    todos: TodoWithDate[];
    isLoading: boolean;
    isError: string;
    fetchTodos: () => Promise<void>
};

interface TodoProviderProps {
    children: ReactNode;
};

const TodoContext = createContext<TodoContextValue | undefined>(undefined);

export function TodoProvider({
    children,
}: TodoProviderProps){
    const [todos, setTodos] = useState<TodoWithDate[]>([]);
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [isError, setisError] = useState<string>("");

    async function fetchTodos(
    ): Promise<void>{ 
        setisLoading(true);
        setisError("");

        try{
            const data = await getTodos(); //bu satır datayı = TodoResponse esitliyor//
            const today = new Date();
            today.setHours(0,0,0,0);
            const todosWithDates = data.todos.map(
                (todo,index) => {
                    const dueDate = new Date(today);
                    const dayOffset = (index % 7) -3;
                    dueDate.setDate(
                        dueDate.getDate() + dayOffset,
                    );
                    return{
                        ...todo,
                        dueDate,
                    };
                },
            );
            setTodos(todosWithDates);

        }catch(caughtError: unknown){
            console.error("Todo alınamadı", caughtError);
            setisError("Todo alınamadı");

        }finally{
            setisLoading(false);
        }
    }

    useEffect( () => {
        fetchTodos();
    }, []);
    
    return(
        <TodoContext.Provider
                value = {{
                todos,
                isLoading,
                isError,
                fetchTodos,
             }}
            >
                {children}

        </TodoContext.Provider>
    )
}

export function useTodos(): TodoContextValue{
    const context = useContext(TodoContext);

    if(context === undefined){
        throw new Error(
            "useTodos, TodoProvider icinde kullanılmalı",
        );
    }
    return context;

}