import { useProjects } from "../context/ProjectContext";
import ProjectTaskCard from "../components/ProjectsTaskCard";
import { useTranslation } from "react-i18next";

function Projects(){
  const { t } = useTranslation("projects");
  const {projects, toggleFavorite} = useProjects();
    return (
      <div>
        <h1 className="font-bold text-primary-hover">
          {t("headerTitle")}
        </h1>
        <div
          className="
                mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {projects.map((project) => (
            <ProjectTaskCard
              key={project.id}
              project={project}
              handleToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </div>
    );
}
export default Projects