import { useProjects } from "../context/ProjectContext";
import ProjectTaskCard from "../components/ProjectsTaskCard";

function Projects(){
  const {projects, toggleFavorite} = useProjects();
    return (
      <div>
        <h1 className="font-bold text- text-primary-hover">Projelerin</h1>
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