import { mockProjects } from "../data/mockProjects";
import type { Project } from "../types/projects";
import { useState, createContext, useContext, type ReactNode } from "react";

interface ProjectContextValue {   //ProjectContext kullanan bir component, projects dizisine ve toggleFavorite fonksiyonuna ulasabilir
    projects: Project[];   //projelerden olusan dizi

    toggleFavorite: (    
        id: number,     //hangi projenin favorisinin degisecegini alır 
    ) => void;
}

interface ProjectProviderProps {   //ProjectProvider arasına React icerigi konulabilecegini belirtir 
    children: ReactNode
}

const ProjectContext = createContext<ProjectContextValue | undefined>(undefined); 

export function ProjectProvider({
    children,
}: ProjectProviderProps) {

  const [projects, setProjects] = useState<Project[]>(mockProjects); //useState sadece project dizisi alabilecegini gosterdi

  function toggleFavorite(id: number): void {
    setProjects((currentProjects) =>
      currentProjects.map((currentProjects) => {
        if (currentProjects.id === id) {
          return {
            ...currentProjects, //eski projenin tüm ozelliklerini yeni nesneye kopyalar
            isFavorite: !currentProjects.isFavorite, //isFavorite degeri degistirilir
          };
        }
        return currentProjects;
      }),
    );
  }
  return(
    <ProjectContext.Provider 
        value={{
            projects,
            toggleFavorite,
        }}
    >
        { children }

    </ProjectContext.Provider>
  );
}

export function useProjects(): ProjectContextValue {
    const context = useContext(ProjectContext);

    if (context === undefined) {
        throw new Error(
            "useProjects, ProjectProvider içinde kullanılmalıdır",
        );
    }
    return context;
}

