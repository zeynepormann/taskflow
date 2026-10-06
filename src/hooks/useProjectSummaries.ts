import { useMemo } from "react";
import { useProjects } from "@/context/project-context";
import { useTodosQuery } from "@/hooks/useTodosQuery";

export function useProjectSummaries() {
  const { projects, toggleFavorite } = useProjects();
  const tasksQuery = useTodosQuery();

  const projectsWithTaskStats = useMemo(() => {
    if (!tasksQuery.data) return projects;

    return projects.map((project) => {
      const projectTasks = tasksQuery.data.filter(
        (task) => task.projectId === project.id,
      );
      const completedCount = projectTasks.filter(
        (task) => task.completed,
      ).length;

      return {
        ...project,
        taskCount: projectTasks.length,
        progress: projectTasks.length
          ? Math.round((completedCount / projectTasks.length) * 100)
          : 0,
      };
    });
  }, [projects, tasksQuery.data]);

  return {
    ...tasksQuery,
    projects: projectsWithTaskStats,
    tasks: tasksQuery.data ?? [],
    toggleFavorite,
  };
}
