import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Project } from "../../types/projects";
import FavoriteButton from "./FavoriteButton";

interface ProjectCardProps {
  project: Project;
  onToggleFavorite: (projectId: number) => void;
  showTaskCount?: boolean;
  showStatus?: boolean;
}

function ProjectCard({
  project,
  onToggleFavorite,
  showTaskCount = false,
  showStatus = true,
}: ProjectCardProps) {
  const { t, i18n } = useTranslation("projects");
  const projectName = t(`projects:demo.${project.id}.name`, {
    defaultValue: project.name,
  });
  const description = t(`projects:demo.${project.id}.description`, {
    defaultValue: project.description,
  });

  return (
    <Card className="relative h-full">
      <Link to={`/projects/${project.id}`} className="flex h-full flex-col">
        <CardHeader className="pr-14">
          <div className="flex items-center gap-2">
            <CardTitle>{projectName}</CardTitle>
            {showStatus && (
              <Badge variant="secondary">{t(`status.${project.status}`)}</Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col gap-3">
          <p className="text-muted-foreground">{description}</p>
          <div>
            <div className="flex items-center justify-between text-sm">
              <span>{t("progress", { value: project.progress })}</span>
              <span>{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="mt-2" />
          </div>
          <p>{t("members", { count: project.memberCount })}</p>
          {showTaskCount && <p>{t("task", { count: project.taskCount })}</p>}
          <p>
            {t("lastUpdated", {
              date: new Date(
                `${project.updatedAt}T12:00:00`,
              ).toLocaleDateString(i18n.resolvedLanguage ?? "en"),
            })}
          </p>
          <span className="mt-auto pt-4 font-semibold text-primary">
            {t("viewDetails")}
          </span>
        </CardContent>
      </Link>

      <div className="absolute right-5 top-5 z-10">
        <FavoriteButton
          isFavorite={project.isFavorite}
          onClick={() => onToggleFavorite(project.id)}
        />
      </div>
    </Card>
  );
}

export default ProjectCard;
