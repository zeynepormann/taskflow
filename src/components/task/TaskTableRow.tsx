import { Pencil, Trash2 } from "lucide-react";

import type { TodoWithDate } from "../../types/todo";

interface TaskTableRowProps {
  todo: TodoWithDate;
  onEdit: (todoId: number) => void;
  onDelete: (todoId: number) => void;
  isDeleting: boolean;
}

function TaskTableRow({
  todo,
  onEdit,
  onDelete,
  isDeleting,
}: TaskTableRowProps) {
  return (
    <tr className="flex w-full items-center border-t border-border">
      <td className="min-w-0 shrink-0 basis-1/2 px-1 py-3 sm:px-6">
        {todo.todo}
      </td>

      <td className="min-w-0 shrink-0 basis-1/6 px-1 py-3 sm:px-6">
        {todo.dueDate.toLocaleDateString("tr-TR")}
      </td>

      <td className="min-w-0 shrink-0 basis-1/6 px-1 py-3 sm:px-6">
        {todo.completed ? "Tamamlandı" : "Devam ediyor"}
      </td>

      <td className="flex min-w-0 shrink-0 basis-1/6 justify-center gap-3 py-3 sm:px-6">
          <button
            type="button"
            aria-label="Görevi Düzenle"
            onClick={() => onEdit(todo.id)}
            className="
              cursor-pointer rounded-xl
              bg-green-500/10 px-2 py-2
              transition-colors duration-300
              hover:bg-green-500/40
            "
          >
            <Pencil size={22} aria-hidden="true" />
          </button>

          <button
            type="button"
            aria-label="Görevi Sil"
            onClick={() => onDelete(todo.id)}
            disabled={isDeleting}
            className="
              cursor-pointer rounded-xl
              bg-red-500/20 px-2 py-2
              transition-colors duration-300
              hover:bg-red-500/50
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <Trash2 size={22} aria-hidden="true" />
          </button>
    
      </td>
    </tr>
  );
}

export default TaskTableRow;
