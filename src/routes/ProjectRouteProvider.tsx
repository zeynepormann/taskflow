import { Outlet } from "react-router-dom";
import { ProjectProvider } from "@/context/ProjectContext";

function ProjectRouteProvider() {
  return (
    <ProjectProvider>
      <Outlet />
    </ProjectProvider>
  );
}

export default ProjectRouteProvider;
