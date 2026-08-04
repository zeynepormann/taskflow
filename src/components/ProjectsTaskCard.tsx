import type { Project } from "../types/projects";
import Card from "./Card";
import { Link } from "react-router-dom";
import { Star } from "lucide-react"


interface ProjectTaskProps {
  project: Project;
  handleToggleFavorite: (projectId: number) => void;
}

function ProjectTaskCard({ project, handleToggleFavorite }: ProjectTaskProps) {
  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4 font-medium">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">{project.name}</h2>

          <button
            type="button"
            aria-label="Favorites"
            onClick={() => handleToggleFavorite(project.id)}
          >
            {project.isFavorite ? (
              <Star className="cursor-pointer fill-yellow-300 dark:fill-yellow-500 " />
            ) : (
              <Star className="cursor-pointer fill-amber-50" />
            )}
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground">{project.description}</p>

          <p>İlerleme: %{project.progress}</p>

          <p>Üye: {project.memberCount}</p>

          <p>Son güncelleme: {project.updatedAt}</p>

          <p>Durum: {project.status}</p>
        </div>

        <div className="flex flex-col">
          <Link
            to={`/projects/${project.id}`}
            className="mt-4 font-bold cursor-pointer"
          >
            Detayları Gör
          </Link>
        </div>
      </div>
    </Card>
  );
}
export default ProjectTaskCard
