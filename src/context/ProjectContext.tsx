import { useState, type ReactNode } from "react";
import { z } from "zod";
import { useAuth } from "@/context/auth-context";
import { useTodosQuery } from "@/hooks/useTodosQuery";
import { mockProjects } from "@/data/mockProjects";
import { ProjectContext } from "@/context/project-context";
const favoritesSchema = z.array(z.number().int().positive());

function favoritesKey(userId: number): string {
  return `taskflow:favorites:v1:user:${userId}`;
}

function readFavorites(userId: number): number[] {
  try {
    const key = favoritesKey(userId);
    const parsed = favoritesSchema.safeParse(
      JSON.parse(
        localStorage.getItem(key) ?? sessionStorage.getItem(key) ?? "[]",
      ),
    );
    if (parsed.success) {
      localStorage.setItem(key, JSON.stringify(parsed.data));
      sessionStorage.removeItem(key);
      return parsed.data;
    }
  } catch {
    // Invalid storage is replaced by an empty favorite set.
  }
  localStorage.removeItem(favoritesKey(userId));
  sessionStorage.removeItem(favoritesKey(userId));
  return [];
}

export function ProjectProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { data: tasks = [] } = useTodosQuery();
  const [favoritesByUser, setFavoritesByUser] = useState<
    Record<number, number[]>
  >({});
  const favoriteIds = user
    ? (favoritesByUser[user.id] ?? readFavorites(user.id))
    : [];

  const projects = mockProjects.map((project) => {
    const projectTasks = tasks.filter((task) => task.projectId === project.id);
    const completedCount = projectTasks.filter((task) => task.completed).length;
    return {
      ...project,
      taskCount: projectTasks.length,
      progress: projectTasks.length
        ? Math.round((completedCount / projectTasks.length) * 100)
        : 0,
      isFavorite: favoriteIds.includes(project.id),
    };
  });

  function toggleFavorite(id: number): void {
    if (!user) return;
    setFavoritesByUser((current) => {
      const currentIds = current[user.id] ?? readFavorites(user.id);
      const next = currentIds.includes(id)
        ? currentIds.filter((item) => item !== id)
        : [...currentIds, id];
      localStorage.setItem(favoritesKey(user.id), JSON.stringify(next));
      return { ...current, [user.id]: next };
    });
  }

  return (
    <ProjectContext.Provider value={{ projects, toggleFavorite }}>
      {children}
    </ProjectContext.Provider>
  );
}
