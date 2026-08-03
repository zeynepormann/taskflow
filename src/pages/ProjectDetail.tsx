import Favorites from "./Favorites"
import { Link, useParams } from "react-router-dom";

import { useProjects } from "../context/ProjectContext";

function ProjectDetail(){
    const { id } = useParams();

    const { projects, toggleFavorite } = useProjects();

    const projectId = Number(id);

    const selectedProject = projects.find(
      (project) => project.id === projectId,
    );
    return(
        <div>
            
        </div>
    )
}

export default ProjectDetail