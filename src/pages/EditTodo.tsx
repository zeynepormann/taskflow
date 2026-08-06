import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  editTodoSchema,
  type EditTodoFormValues,
} from "../schema/editTodoSchema";
import { useEffect } from "react";
import Card from "../components/Card";
import { useTranslation } from "react-i18next";
import { useTodosQuery } from "../hooks/useTodosQuery";
import { useUpdateMutation } from "../hooks/useUpdateMutation";


function dateForInput(date: Date): string {
    const year = date.getFullYear();

    const month = String(
        date.getMonth() + 1,  //js ayları 0 dan sayar +1 ekle
    ).padStart(2, "0");  //iki haneden kucukse basına 0 ekler-> "2" -> "02"

    const day = String(
        date.getDate(),
    ).padStart(2,"0");

    return `${year}-${month}-${day}`;  //tarihleri birlestirir 2026-07-30
} 

function EditTodo() {
  const { t } = useTranslation("tasks");

  const navigate = useNavigate();

  const { id } = useParams(); //urldeki idyi alır

  const todoId = Number(id);  //stringi tekrardan numbera donusturur  12==="12" -> 12===12

  const  {
    data: todos = [],
    isPending,
    isError,
  } = useTodosQuery();

  const updateTodoMutation = useUpdateMutation();

  const selectedTodo = todos.find((currentTodo) => currentTodo.id === todoId); //buradaki currentTodo tanımlanan yeni parametredir

  

  const {
    register, //inputu react hook forma baglar <input {...register("todo")} ... => spread operatoru
    handleSubmit, //form gonderilince zod dogrulamasını calıstırır    <form onSubmit = {handleSubmit (onSubmit)} form valid-> onSubmit(data)
    reset, //formun butun input degerleriin sonrada degistirilmesini saglar
    formState: { errors, isSubmitting, isDirty }, //ic ice destructuring
  } = useForm<EditTodoFormValues>({
    resolver: zodResolver(editTodoSchema), //from gonderildiginde verileri editTodoSchemaya gonderir

    defaultValues: {
      //formun baslangıc degerlerini doldurmak icin kullanılır güvenli baslangıc degeri diyebilirsin
      todo: "",
      dueDate: "",
      completed: false,
    },
  });

  useEffect( ()=> {
    if(!selectedTodo) { //ilk renderda gorev bulunamamıssa diye effect burada durur
        return;
    }
    reset({   //reset contexteki gorevi degistirmez sadece gorev degerlerini RHF un duzenlenebilir stateine kopyalar!!
        todo: selectedTodo.todo, //formdaki görev acıklamasını mevcut gorev acıklaması yapar 
        dueDate: dateForInput(   //context icindeki Date nesnesini inputun anlayacagı stringe cevirir
            selectedTodo.dueDate,
        ),
        completed: selectedTodo.completed,  //formdaki checkboxun baslangıc durumunu belirler 
    });
  }, [selectedTodo, reset]); //dependency array denir effectin hangi degerleri takip ettigini soyler selectedTodo degisirse degisir,reset de yazdık cunku icinde kullanıldı

  async function onSubmit(
    data: EditTodoFormValues,
  ): Promise <void> {
        try{
          await updateTodoMutation.mutateAsync({
            id: todoId,
            values: data,
          });
          navigate("/tasks");
        } catch{

        }
  }

  if (isPending) {
    return <p>{t("taskUploaded")}</p>;
  }
  if (isError) {
    return <p>{isError}</p>;
  }
  if (!selectedTodo) {
    return <p>{t("taskError")}</p>;
  }

  return (
    <div className="w-full px-6 py-4">
      <Card className="w-full px-4 shadow-2xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col  mt-6 space-y-5"
        >
          <div>
            <label htmlFor="todo" className="mb-2 block font-medium">
              {t("taskDescription")}
            </label>

            <textarea
              id="todo"
              rows={4}
              {...register("todo")}
              className="
                w-full rounded-xl
                border border-border bg-input
                px-4 py-3 text-foreground
                outline-none
                focus:border-ring focus:ring-2
                focus:ring-ring
            "
            />

            {errors.todo?.message && (
              <p className="mt-2 text-sm text-red-500">{t(errors.todo.message)}</p>
            )}
          </div>

          <div>
            <label htmlFor="dueDate" className="mb-2 block font-medium">
              {t("dueDate")}
            </label>

            <input
              id="dueDate"
              type="date"
              {...register("dueDate")}
              className="
                h-12 w-full rounded-xl
                border border-border bg-input
                px-4 text-foreground
                outline-none
                focus:border-ring focus:ring-2
                focus:ring-ring
            "
            />

            {errors.dueDate?.message && (
              <p className="mt-2 text-sm text-red-500">
                {t(errors.dueDate.message)}
              </p>
            )}
          </div>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              {...register("completed")}
              className="h-5 w-5 accent-primary"
            />

            <span> {t("taskCheckbox")}</span>
          </label>

          <div className="flex justify-end gap-3 mb-4">
            <button
              type="button"
              onClick={() => navigate("/tasks")}
              className="
                rounded-xl border border-border
                px-5 py-3 transition-colors
                hover:bg-muted cursor-pointer
            "
            >
              {t("taskCancel")}
            </button>

            <button
              type="submit"
              disabled={!isDirty || isSubmitting}
              className="
                rounded-xl bg-primary
                px-5 py-3 font-semibold
                text-primary-foreground
                cursor-pointer
                transition-colors
                hover:bg-primary/90
                duration-300
            "
            >
              {isSubmitting ? t("savingTask") : t("saveTaskChanges")}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
export default EditTodo;
