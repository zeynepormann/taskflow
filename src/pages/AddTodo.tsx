import { addTodoSchema, type AddTodoFormValues } from "../schema/addTodoSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "../components/card/Card";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAddMutation } from "../hooks/useAddMutation";

function AddTodo() {
  const { t } = useTranslation("tasks");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddTodoFormValues>({
    resolver: zodResolver(addTodoSchema),

    defaultValues: {
      todo: "",
      dueDate: "",
      completed: false,
    },
  });

  const navigate = useNavigate();

  const addTodoMutation = useAddMutation();

  async function onSubmit(data: AddTodoFormValues): Promise<void> {
    try {
      await addTodoMutation.mutateAsync(data);
      navigate("/tasks");
    } catch {}
  }

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-5xl">
        <Card className="w-full p-0 shadow-2xl ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 items-center gap-5 p-6 md:grid-cols-2"
          >
            <div>
              <label htmlFor="todo" className="mb-2 block font-medium">
                {t("taskDescription")}
              </label>
              <input
                id="todo"
                type="text"
                placeholder={t("taskPlaceholder")}
                {...register("todo")}
                className="h-12 w-full rounded-xl border border-border bg-input px-4"
              />
              <div className="min-h-7 pt-2">
                {errors.todo?.message && (
                  <p className="mt-2 text-sm text-red-500" role="alert">
                    {t(errors.todo.message)}
                  </p>
                )}
              </div>
            </div>

            <label
              htmlFor="completed"
              className="flex h-12 w-full cursor-pointer items-center gap-3 rounded-xl border border-border bg-muted/40 px-4 "
            >
              <input
                id="completed"
                type="checkbox"
                {...register("completed")}
                className="cursor-pointer accent-primary h-4 w-4 rounded-xl" //accent-primary: checkbox isaretli rengini tema rengiyle uyumlu yapar
              />
              <span className="font-medium"> {t("taskCheckbox")}</span>
            </label>

            <div>
              <label htmlFor="dueDate" className="mb-2 block font-medium ">
                {t("dueDate")}
              </label>
              <input
                id="dueDate"
                type="date"
                {...register("dueDate")}
                className="h-12 w-full rounded-xl border border-border bg-input px-4"
              />
              <div className="min-h-7 pt-2">
                {errors.dueDate?.message && (
                  <p className="mt-2 text-sm text-red-500" role="alert">
                    {t(errors.dueDate.message)}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full cursor-pointer rounded-xl text-primary-foreground bg-primary px-4 "
            >
              {isSubmitting ? t("savingTask") : t("saveTask")}
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}
export default AddTodo;
