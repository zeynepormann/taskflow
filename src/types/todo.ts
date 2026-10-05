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

export interface TodoWithDate extends Omit<Todo, "id"> {   //dueDate ekleyerek gecmis bugun gelecekteki todoları ayır//
    id: string;
    remoteId?: number;
    source: "remote" | "local";
    dueDate: Date;
    projectId: number;
}

export interface AddTodoRequest{
    todo: string;
    completed: boolean;
    userId: number;    
}