import Card from "../components/Card";
import { useTodos } from "../context/TodoContext";
import { Pencil, Trash2, Plus} from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import AddTodo from "./AddTodo";

function Tasks() {
  const columnNames = ["Görev", "Son Tarih", "Durum", "İşlemler"];

  const { todos, isLoading, isError, deleteTodo} = useTodos();
  const navigate = useNavigate();

  return (
    <div className="w-full px-4">
      <div className="mb-6 flex justify-end">
        <button
          type="button"
          aria-label="Yeni görev ekle"
          onClick={() => navigate(`/tasks/new`)}
          className="flex items-center h-11 px-4 rounded-xl cursor-pointer bg-primary text-sans text-primary-foreground transition-colors duration-300 hover:bg-primary-hover"
        >
          <Plus size={20} aria-hidden="true" />
          <span>Yeni Görev</span>
        </button>
      </div>
      <div className="mx-auto w-full max-w-8xl">
        <Card className="w-full p-0">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <colgroup>
                <col className="w-[38%] lg:w-[45%]" />
                <col className="w-[21%] lg:w-[20%]" />
                <col className="w-[21%] lg:w-[20%]" />
                <col className="w-[20%] lg:w-[15%]" />
              </colgroup>
              <thead className="bg-muted">
                <tr>
                  {columnNames?.map((columnName) => (
                    <th
                      key={columnName}
                      scope="col"
                      className="px-1 py-2 text-left font-sans sm:px-6 sm:py-3 "
                    >
                      {columnName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {todos.map((todo) => (
                  <tr key={todo.id} className="border-t border-border ">
                    <td className="wrap-break-word px-1 py-3 text-xs sm:px-6 sm:py-4 sm:text-sm">
                      {todo.todo}
                    </td>

                    <td className="wrap-break-word px-1 py-3 text-xs sm:px-6 sm:py-4 sm:text-sm">
                      {todo.dueDate.toLocaleDateString("tr-TR")}
                    </td>

                    <td className="wrap-break-word px-1 py-3 text-xs sm:px-6 sm:py-4 sm:text-sm">
                      {todo.completed ? "Tamamlandı" : "Devam ediyor"}
                    </td>

                    <td className="wrap-break-word px-1 py-3 text-xs sm:px-6 sm:py-4 sm:text-sm">
                      <div className="flex flex-row gap-5 ">
                        <button
                          type="button"
                          aria-label="Görevi Düzenle"
                          onClick={() => navigate(`/tasks/${todo.id}/edit`)}
                          className="rounded-xl px-2 py-2 cursor-pointer bg-green-500/10 hover:bg-green-500/40 duration-300"
                        >
                          <Pencil size={22} aria-hidden="true" />
                        </button>

                        <button
                          type="button"
                          aria-label="Görevi Sil"
                          onClick={() => deleteTodo(todo.id)}
                          className="rounded-xl px-2 py-2 cursor-pointer bg-red-500/20 hover:bg-red-500/50 duration-300"
                        >
                          <Trash2 size={22} aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
export default Tasks;
