import Card from "../components/Card";
import { useTodos } from "../context/TodoContext";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Tasks() {
  const columnNames = ["Görev", "Son Tarih", "Durum", "İşlemler"];

  const { todos, isLoading, isError } = useTodos();
  const navigate = useNavigate();

  return (
    <div className="w-full px-6 py-4">
      <div className="mx-auto w-full max-w-7xl">
        <Card className="w-full p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-180 table-fixed">
              <colgroup>
                <col className="w-[45%]" />
                <col className="w-[20%]" />
                <col className="w-[20%]" />
                <col className="w-[15%]" />
              </colgroup>
              <thead className="bg-muted">
                <tr>
                  {columnNames?.map((columnName) => (
                    <th
                      key={columnName}
                      scope="col"
                      className="px-6 py-3 text-left font-sans"
                    >
                      {columnName}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {todos.map((todo) => (
                  <tr key={todo.id} className="border-t border-border ">
                    <td className="px-6 py-4">{todo.todo}</td>

                    <td className="px-6 py-4">
                      {todo.dueDate.toLocaleDateString("tr-TR")}
                    </td>

                    <td className="px-6 py-4">
                      {todo.completed ? "Tamamlandı" : "Devam ediyor"}
                    </td>

                    <td className="px-6 py-4 ">
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
