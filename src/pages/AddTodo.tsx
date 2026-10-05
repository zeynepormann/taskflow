import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { TaskForm } from "@/components/task/TaskForm";
import { useAddMutation } from "@/hooks/useAddMutation";
import type { TaskFormValues } from "@/schema/taskSchema";

function AddTodo() {
  const { t } = useTranslation("tasks");
  const navigate = useNavigate();
  const mutation = useAddMutation();

  async function onSubmit(values: TaskFormValues): Promise<void> {
    await mutation.mutateAsync(values);
    navigate("/tasks");
  }

  return (
    <div className="mx-auto w-full max-w-3xl py-4">
      <Card className="p-6">
        <TaskForm
          submitLabel={t("saveTask")}
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

export default AddTodo;
