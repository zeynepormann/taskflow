import Card from "../components/card/Card";
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

  const { data: todos = [], isPending, isError, error } = useTodosQuery();

  const deleteTodoMutation = useDeleteMutation();

  if (isPending) {
    return <p>Görevler Yükleniyor...</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
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
