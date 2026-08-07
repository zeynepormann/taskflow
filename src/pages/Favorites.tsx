import { useTranslation } from "react-i18next";

import PageBody from "../components/page/PageBody";
import PageHeader from "../components/page/PageHeader";
import PageLayout from "../components/page/PageLayout";
import ProjectCard from "../components/project/ProjectCard";
import { useProjects } from "../context/ProjectContext";

function Favorites() {
  const { t } = useTranslation("projects");

  const { projects, toggleFavorite } = useProjects();

  const favoriteProjects = projects.filter((project) => project.isFavorite);

  return (
    <PageLayout>
      <PageHeader title={t("favoritesTitle")} />

      <PageBody className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {favoriteProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onToggleFavorite={toggleFavorite}
            showTaskCount
            showStatus={false}
          />
        ))}
      </PageBody>
    </PageLayout>
  );
}

export default Favorites;
