import type { Project } from "../types/projects";

export const mockProjects: Project[] = [
  //dizi olusturur
  {
    id: 1,
    name: "TaskFlow",
    description: "An application for managing team projects and tasks",
    progress: 65,
    memberCount: 4,
    taskCount: 18,
    updatedAt: "2026-07-30",
    status: "active",
    isFavorite: true,
  },

  {
    id: 2,
    name: "E-Commerce Management",
    description: "A web application for managing products and orders",
    progress: 30,
    memberCount: 3,
    taskCount: 12,
    updatedAt: "2026-07-28",
    status: "planning",
    isFavorite: false,
  },

  {
    id: 3,
    name: "Mobile Banking",
    description: "A mobile application for managing financial transactions",
    progress: 100,
    memberCount: 5,
    taskCount: 10,
    updatedAt: "2026-07-29",
    status: "completed",
    isFavorite: true,
  },

  {
    id: 4,
    name: "Chat Application",
    description: "A real-time messaging application",
    progress: 75,
    memberCount: 2,
    taskCount: 8,
    updatedAt: "2026-07-31",
    status: "active",
    isFavorite: false,
  },
];
