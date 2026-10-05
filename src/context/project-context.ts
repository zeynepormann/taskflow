import { createContext, useContext } from "react";
import type { Project } from "@/types/projects";

export interface ProjectContextValue {
  projects: Project[];
  toggleFavorite: (id: number) => void;
}

export const ProjectContext = createContext<ProjectContextValue | undefined>(undefined);

export function useProjects(): ProjectContextValue {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error("useProjects must be used within ProjectProvider");
  }

  return context;
}
