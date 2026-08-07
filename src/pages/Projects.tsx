import { useTranslation } from "react-i18next";

import ProjectCard from "../components/project/ProjectCard";
import PageBody from "../components/page/PageBody";
import PageHeader from "../components/page/PageHeader";
import PageLayout from "../components/page/PageLayout";

import { useProjects } from "../context/ProjectContext";

function Projects() {
  const { t } = useTranslation("projects");

  const { projects, toggleFavorite } = useProjects();

  return (
    <PageLayout>
      <PageHeader title={t("headerTitle")} />

      <PageBody className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </PageBody>
    </PageLayout>
  );
}

export default Projects;
