import { useTranslation } from "react-i18next";

import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Users } from "lucide-react";
import { useProjects } from "../context/ProjectContext";
import { useTodosQuery } from "../hooks/useTodosQuery";
import PageLayout from "../components/page/PageLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

function ProjectDetail() {
  const { t, i18n } = useTranslation("common");
  const { id } = useParams();
  const { projects, toggleFavorite } = useProjects();
  const { data: todos = [] } = useTodosQuery();
  const project = projects.find((item) => item.id === Number(id));
  if (!project)
    return (
      <PageLayout>
        <Link to="/projects" className="text-sm font-semibold text-primary">
          ← {t("backProjects")}
        </Link>
        <p className="rounded-2xl border border-border bg-card p-8 text-muted-foreground">
          {t("common:projectNotFound")}
        </p>
      </PageLayout>
    );
  const tasks = todos
    .filter((task) => task.projectId === project.id)
    .slice(0, 6);
  return (
    <PageLayout>
      <Link
        to="/projects"
        className="inline-flex items-center gap-1 text-sm font-semibold text-primary"
      >
        <ArrowLeft className="size-4" /> {t("common:backProjects")}
      </Link>
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">
                {t(`projects:demo.${project.id}.name`, {
                  defaultValue: project.name,
                })}
              </h1>
              <Badge variant="secondary">
                {t(`projects:status.${project.status}`)}
              </Badge>
            </div>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              {t(`projects:demo.${project.id}.description`, {
                defaultValue: project.description,
              })}
            </p>
          </div>
          <Button onClick={() => toggleFavorite(project.id)} variant="outline">
            {project.isFavorite ? t("removeFavorite") : t("addFavorite")}
          </Button>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-muted p-4">
            <p className="text-xs text-muted-foreground">
              {t("common:progress")}
            </p>
            <p className="mt-1 text-2xl font-bold">
              {new Intl.NumberFormat(i18n.resolvedLanguage ?? "en", {
                style: "percent",
              }).format(project.progress / 100)}
            </p>
            <Progress value={project.progress} className="mt-3" />
          </div>
          <div className="rounded-lg bg-muted p-4">
            <p className="text-xs text-muted-foreground">{t("common:task")}</p>
            <p className="mt-1 text-2xl font-bold">{project.taskCount}</p>
          </div>
          <div className="rounded-lg bg-muted p-4">
            <p className="text-xs text-muted-foreground">
              {t("common:member")}
            </p>
            <p className="mt-1 flex items-center gap-1 text-2xl font-bold">
              <Users className="size-5" /> {project.memberCount}
            </p>
          </div>
        </div>
      </section>
      <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <h2 className="font-semibold">{t("common:linkedTasks")}</h2>
        <div className="mt-3 divide-y divide-border">
          {tasks.map((task) => (
            <Link
              key={task.id}
              to={`/tasks/${task.id}/edit`}
              className="flex items-center justify-between gap-3 py-3 text-sm hover:text-primary"
            >
              <span className="flex items-center gap-2 truncate">
                <CheckCircle2
                  className={`size-4 shrink-0 ${task.completed ? "text-emerald-500" : "text-muted-foreground"}`}
                />
                {task.todo}
              </span>
              <span className="shrink-0 text-muted-foreground">
                {task.dueDate.toLocaleDateString(i18n.resolvedLanguage ?? "en")}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
export default ProjectDetail;
