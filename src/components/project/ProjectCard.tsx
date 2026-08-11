import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import type { Project } from "../../types/projects";

import Card from "../card/Card";
import CardBody from "../card/CardBody";
import CardHead from "../card/CardHead";
import CardItem from "../card/CardItem";
import CardItems from "../card/CardItems";
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
  const { t } = useTranslation("projects");

   return (
    <Card className="relative h-full p-0 font-medium">
      <Link
        to={`/projects/${project.id}`}
        className="flex h-full cursor-pointer flex-col gap-4 p-6"
      >
        <CardHead className="pr-10">
          <h2 className="text-lg font-bold">{project.name}</h2>
        </CardHead>

        <CardBody className="flex flex-1 flex-col">
          <CardItems className="gap-2">
            <CardItem className="text-muted-foreground">
              {project.description}
            </CardItem>

            <CardItem>
              {t("progress", {
                value: project.progress,
              })}
            </CardItem>

            <CardItem>
              {t("members", {
                count: project.memberCount,
              })}
            </CardItem>

            {showTaskCount && (
              <CardItem>
                {t("task", {
                  count: project.taskCount,
                })}
              </CardItem>
            )}

            <CardItem>
              {t("lastUpdated", {
                date: project.updatedAt,
              })}
            </CardItem>

            {showStatus && (
              <CardItem>
                {t("statusLabel")} {t(`status.${project.status}`)}
              </CardItem>
            )}
          </CardItems>

          <span className="mt-auto pt-4 font-bold">
            {t("viewDetails")}
          </span>
        </CardBody>
      </Link>

      <div className="absolute right-6 top-6 z-10">
        <FavoriteButton
          isFavorite={project.isFavorite}
          onClick={() => onToggleFavorite(project.id)}
        />
      </div>
    </Card>
  );
}


export default ProjectCard;
