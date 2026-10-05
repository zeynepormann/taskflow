import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useProjects } from "@/context/ProjectContext";
import { taskSchema, type TaskFormValues } from "@/schema/taskSchema";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface TaskFormProps {
  initialValues?: TaskFormValues;
  submitLabel: string;
  submittingLabel: string;
  isSubmitting: boolean;
  onSubmit: (values: TaskFormValues) => Promise<void>;
  onCancel: () => void;
}

function ErrorMessage({ id, message }: { id: string; message?: string }) {
  const { t } = useTranslation("tasks");
  return message ? (
    <p id={id} className="mt-2 text-sm text-destructive" role="alert">
      {t(message)}
    </p>
  ) : null;
}

export function TaskForm({
  initialValues,
  submitLabel,
  submittingLabel,
  isSubmitting,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const { t } = useTranslation("tasks");
  const { projects } = useProjects();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: initialValues ?? {
      todo: "",
      dueDate: "",
      completed: false,
      projectId: projects[0]?.id ?? 1,
    },
  });

  useEffect(() => {
    if (initialValues && !isDirty) reset(initialValues);
  }, [initialValues, isDirty, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <label htmlFor="todo" className="mb-2 block font-medium">
          {t("taskDescription")}
        </label>
        <Textarea
          id="todo"
          rows={4}
          aria-invalid={Boolean(errors.todo)}
          aria-describedby={errors.todo ? "todo-error" : undefined}
          {...register("todo")}
        />
        <ErrorMessage id="todo-error" message={errors.todo?.message} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="dueDate" className="mb-2 block font-medium">
            {t("dueDate")}
          </label>
          <Controller
            name="dueDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                id="dueDate"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder={t("dueDate")}
                aria-invalid={Boolean(errors.dueDate)}
                aria-describedby={errors.dueDate ? "due-date-error" : undefined}
              />
            )}
          />
          <ErrorMessage id="due-date-error" message={errors.dueDate?.message} />
        </div>
        <div>
          <label className="mb-2 block font-medium">{t("project")}</label>
          <Controller
            name="projectId"
            control={control}
            render={({ field }) => (
              <Select
                value={String(field.value)}
                onValueChange={(value) => field.onChange(Number(value))}
              >
                <SelectTrigger
                  className="h-12 w-full"
                  aria-invalid={Boolean(errors.projectId)}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={String(project.id)}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <ErrorMessage
            id="project-error"
            message={errors.projectId?.message}
          />
        </div>
      </div>
      <label className="flex items-center gap-3">
        <Checkbox {...register("completed")} />
        <span>{t("taskCheckbox")}</span>
      </label>
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          {t("taskCancel")}
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? submittingLabel : submitLabel}
        </Button>
      </div>
    </form>
  );
}
