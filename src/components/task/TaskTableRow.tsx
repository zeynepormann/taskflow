import { useTranslation } from "react-i18next";
import { Pencil, Trash2 } from "lucide-react";

import type { TodoWithDate } from "../../types/todo";
import { Button } from "@/components/ui/button";

interface TaskTableRowProps {
  todo: TodoWithDate;
  onEdit: (todoId: string) => void;
  onDelete: (todo: TodoWithDate) => void;
  isDeleting: boolean;
}

function TaskTableRow({
  todo,
  onEdit,
  onDelete,
  isDeleting,
}: TaskTableRowProps) {
  const { t, i18n } = useTranslation("common");
  return (
    <tr className="flex w-full items-center border-t border-border">
      <td className="min-w-0 shrink-0 basis-1/2 px-1 py-3 sm:px-6">
        {todo.todo}
      </td>

      <td className="min-w-0 shrink-0 basis-1/6 px-1 py-3 sm:px-6">
        {todo.dueDate.toLocaleDateString(i18n.resolvedLanguage ?? "en")}
      </td>

      <td className="min-w-0 shrink-0 basis-1/6 px-1 py-3 sm:px-6">
        {todo.completed ? t("completedStatus") : t("inProgress")}
      </td>

      <td className="flex min-w-0 shrink-0 basis-1/6 justify-center gap-3 py-3 sm:px-6">
          <Button
            type="button"
            aria-label={t("editTask")}
            onClick={() => onEdit(todo.id)}
            variant="outline"
            size="icon"
          >
            <Pencil size={22} aria-hidden="true" />
          </Button>

          <Button
            type="button"
            aria-label={t("deleteTask")}
            onClick={() => onDelete(todo)}
            disabled={isDeleting}
            variant="destructive"
            size="icon"
          >
            <Trash2 size={22} aria-hidden="true" />
          </Button>
    
      </td>
    </tr>
  );
}

export default TaskTableRow;
