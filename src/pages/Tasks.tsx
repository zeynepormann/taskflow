import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTodosQuery } from "../hooks/useTodosQuery";
import { useDeleteMutation } from "../hooks/useDeleteMutation";

import PageLayout from "../components/page/PageLayout";
import PageBody from "../components/page/PageBody";
import AddTaskButton from "../components/task/AddTaskButton";
import TaskTable from "../components/task/TaskTable";

function Tasks() {
  const { t } = useTranslation("tasks");

  const columnNames = [t("task"), t("dueDate"), t("status"), t("action")];

  const navigate = useNavigate();

  const { data: todos = [], isPending, isError } = useTodosQuery();

  const deleteTodoMutation = useDeleteMutation();

  if (isPending) {
    return <p>{t("common:loading")}</p>;
  }

  if (isError) {
    return <p>{t("common:loadError")}</p>;
  }

  return (
    <PageLayout>
      <PageBody>
        <div className="mb-6 flex justify-end">
          <AddTaskButton
            label={t("addNewTask")}
            onClick={() => navigate("/tasks/new")}
          />
        </div>
        <div className="mx-auto w-full max-w-8xl">
          <Card className="w-full p-0">
            <TaskTable
              todos={todos}
              columnNames={columnNames}
              onEdit={(todoId) => navigate(`/tasks/${todoId}/edit`)}
              onDelete={(todoId) => deleteTodoMutation.mutate(todoId)}
              isDeleting={deleteTodoMutation.isPending}
            />
          </Card>
        </div>
      </PageBody>
    </PageLayout>
  );
}
export default Tasks;
