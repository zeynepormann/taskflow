import { useParams } from "react-router-dom";
import { useTodos } from "../context/TodoContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  editTodoSchema,
  type EditTodoFormValues,
} from "../schema/editTodoSchema";
import { useEffect } from "react";
import Card from "../components/Card";

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
  const { todos, isLoading, isError } = useTodos(); //context verisi alınır

  const { id } = useParams(); //urldeki idyi alır

  const todoId = Number(id);  //stringi tekrardan numbera donusturur  12==="12" -> 12===12

  const selectedTodo = todos.find((currentTodo) => currentTodo.id === todoId); //buradaki currentTodo tanımlanan yeni parametredir

  const {
    register, //inputu react hook forma baglar <input {...register("todo")} ... => spread operatoru
    handleSubmit, //form gonderilince zod dogrulamasını calıstırır    <form onSubmit = {handleSubmit (onSubmit)} form valid-> onSubmit(data)
    reset, //formun butun input degerleriin sonrada degistirilmesini saglar
    formState: { errors }, //ic ice destructuring
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

  if (isLoading) {
    return <p>Görev yükleniyor..</p>;
  }
  if (isError) {
    return <p>{isError}</p>;
  }
  if (!selectedTodo) {
    return <p>Görev bulunamadı..</p>;
  }

  return (
    <div className="w-full px-6 py-4">
      <div className="mx-auto w-full max-w-7xl ">
        <Card className="w-full p-0 shadow-2xl">
          <div className="overflow-x-auto px-2">
            <h1 className="text-xl font-bold "> Görevi değiştir </h1>
            <div className="font-semibold py-3">
              <p>Görev ID: {selectedTodo.id} </p>
              <p>Görev: {selectedTodo.todo} </p>
              <p>
                Durum:
                {selectedTodo.completed ? "Tamamlandı" : "Devam Ediyor"}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
export default EditTodo;
