
export interface Project{
    id: number;
    name: string;
    description: string;
    progress: number;
    memberCount: number;
    taskCount: number;
    updatedAt: string;
    status: "active" | "planning" | "completed";
    isFavorite: boolean;
}