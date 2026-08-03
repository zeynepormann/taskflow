import {
    useContext, 
    useEffect,
    createContext,
    useState,
    type ReactNode
} from "react";
import { getTodos } from "../services/todoService";
import type { TodoWithDate } from "../types/todo";
import { updateTodoRequest, deleteTodoRequest } from "../services/todoService";
import type { EditTodoFormValues } from "../schema/editTodoSchema";


interface TodoContextValue {
  todos: TodoWithDate[];
  isLoading: boolean;
  isError: string;
  fetchTodos: () => Promise<void>;
  updateTodo: (
    id: number, values: EditTodoFormValues
) => Promise<boolean>;
  deleteTodo: (
    id: number
) => Promise<boolean>;
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

    async function updateTodo(
        id: number,
        values: EditTodoFormValues,
    ): Promise <boolean> {
        try{
            await updateTodoRequest(id, {
                todo: values.todo,
                completed: values.completed,
            });

            const newDueDate = new Date(
                `${values.dueDate}T00:00:00`,
           );
           
           setTodos((currentTodos) => 
                currentTodos.map((currentTodo) =>
                    currentTodo.id === id
                        ? {
                            ...currentTodo,
                            todo: values.todo,
                            dueDate: newDueDate,
                            completed: values.completed,
                        }
                        : currentTodo
                )
            );
            return true
        } catch(caughtError: unknown) {
            console.error(
                "Görev güncellenemedi",
                caughtError,
            );
            return false
        }
    }

    async function deleteTodo(id: number): Promise<boolean> {
      try {
        await deleteTodoRequest(id);

        setTodos((currentTodos) =>
          currentTodos.filter((currentTodo) => currentTodo.id !== id),
        );

        return true;
      } catch (caughtError: unknown) {
        console.error("Görev silinemedi:", caughtError);

        return false;
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
                updateTodo,
                deleteTodo,
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