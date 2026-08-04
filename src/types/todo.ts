export interface Todo {
    id: number;
    todo: string;
    completed: boolean;
    userId : number;
}

export interface TodoResponse  {
    total: number;
    skip: number;
    limit: number;
    todos: Todo[];
}

export interface TodoWithDate extends Todo{   //dueDate ekleyerek gecmis bugun gelecekteki todoları ayır//
    dueDate: Date;
    isLocal?: boolean;
} 

export interface AddTodoRequest{
    todo: string;
    completed: boolean;
    userId: number;    
}