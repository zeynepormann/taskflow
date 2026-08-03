import { useProjects } from "../context/ProjectContext";
import Card from "../components/Card";
import {Star} from  "lucide-react"
import { Link } from "react-router-dom";

function Favorites(){
    const {projects, toggleFavorite} = useProjects();

    const favoriteProjects = projects.filter(
        (project) => project.isFavorite
    )

    return (
      <div>
        <h1 className="font-bold">Favori Projelerin</h1>
        <div
          className="
                mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {favoriteProjects.map((project) => (
            <Card key={project.id} className="p-6">
              <div className="flex flex-col gap-2 font-medium ">
                <div className="flex flex-row justify-between">
                  <h2>{project.name}</h2>
                  <button
                    type="button"
                    aria-label="Favoriden çıkar"
                    onClick={() => toggleFavorite(project.id)}
                  >
                    {project.isFavorite ? (
                      <Star className="cursor-pointer fill-yellow-300 dark:fill-yellow-500 " />
                    ) : (
                      <Star className="cursor-pointer fill-amber-50" />
                    )}
                  </button>
                </div>

                <div className="flex flex-col">
                  <p>{project.description}</p>

                  <p>İlerleme: %{project.progress}</p>

                  <p>Üye: {project.memberCount}</p>

                  <p>Görev: {project.taskCount}</p>

                  <p>Son Güncelleme: {project.updatedAt}</p>

                  <Link 
                        to={`/projects/${project.id}`}
                        className="mt-4 font-bold cursor-pointer">
                            Detayları Gör
                    </Link>

                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
}
export default Favorites