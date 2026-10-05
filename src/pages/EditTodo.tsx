import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { TaskForm } from "@/components/task/TaskForm";
import { isValidTaskRouteId, useTodoQuery } from "@/hooks/useTodosQuery";
import { useUpdateMutation } from "@/hooks/useUpdateMutation";
import type { TaskFormValues } from "@/schema/taskSchema";

function dateForInput(date: Date): string {
  return date.toLocaleDateString("en-CA");
}

function EditTodo() {
  const { t } = useTranslation("tasks");
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: task, isPending, isError } = useTodoQuery(id);
  const mutation = useUpdateMutation();

  if (!isValidTaskRouteId(id) || isError) return <p>{t("taskError")}</p>;
  if (isPending) return <p>{t("taskUploaded")}</p>;
  if (!task) return <p>{t("taskError")}</p>;
  const selectedTask = task;

  const initialValues: TaskFormValues = {
    todo: selectedTask.todo,
    dueDate: dateForInput(selectedTask.dueDate),
    completed: selectedTask.completed,
    projectId: selectedTask.projectId,
  };

  async function onSubmit(values: TaskFormValues): Promise<void> {
    await mutation.mutateAsync({ task: selectedTask, values });
    navigate("/tasks");
  }

  return (
    <div className="mx-auto w-full max-w-3xl py-4">
      <Card className="p-6">
        <TaskForm
          initialValues={initialValues}
          submitLabel={t("saveTaskChanges")}
          submittingLabel={t("savingTask")}
          isSubmitting={mutation.isPending}
          onSubmit={onSubmit}
          onCancel={() => navigate("/tasks")}
        />
        {mutation.isError && (
          <p className="mt-4 text-sm text-destructive" role="alert">
            {t("common:saveError")}
          </p>
        )}
      </Card>
    </div>
  );
}

export default EditTodo;
