import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTodoQuery, isValidTaskRouteId } from "@/hooks/useTodosQuery";
import { mockProjects } from "@/data/mockProjects";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function TaskDetail() {
  const { id } = useParams();
  const { t, i18n } = useTranslation("tasks");
  const { data: task, isPending, isError } = useTodoQuery(id);

  if (!isValidTaskRouteId(id) || isError || (!isPending && !task)) {
    return <p>{t("taskError")}</p>;
  }

  if (isPending || !task) {
    return <p>{t("taskUploaded")}</p>;
  }

  const project = mockProjects.find((item) => item.id === task.projectId);

  return (
    <div className="mx-auto max-w-3xl py-4">
      <Card className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">{project?.name}</p>
            <h1 className="mt-2 text-2xl font-bold">{task.todo}</h1>
          </div>
          <Badge variant={task.completed ? "secondary" : "default"}>
            {task.completed
              ? t("common:completedStatus")
              : t("common:inProgress")}
          </Badge>
        </div>
        <dl className="mt-6 grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-muted-foreground">{t("dueDate")}</dt>
            <dd className="mt-1 font-medium">
              {task.dueDate.toLocaleDateString(i18n.resolvedLanguage ?? "en")}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">{t("project")}</dt>
            <dd className="mt-1 font-medium">{project?.name ?? "—"}</dd>
          </div>
        </dl>
        <Link
          to={`/tasks/${task.id}/edit`}
          className="mt-6 inline-block text-sm font-semibold text-primary"
        >
          {t("common:editTask")}
        </Link>
      </Card>
    </div>
  );
}

export default TaskDetail;
