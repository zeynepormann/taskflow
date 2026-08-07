import { Pencil, Trash2 } from "lucide-react";

import type { TodoWithDate } from "../../types/todo";
import TaskTableRow from "./TaskTableRow";

interface TaskTableProps {
  todos: TodoWithDate[];
  columnNames: string[];
  onEdit: (todoId: number) => void;
  onDelete: (todoId: number) => void;
  isDeleting: boolean;
}

function TaskTable({
  todos,
  columnNames,
  onEdit,
  onDelete,
  isDeleting,
}: TaskTableProps) {
  return (
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
            {columnNames.map((columnName) => (
              <th
                key={columnName}
                scope="col"
                className="px-1 py-2 text-left font-sans sm:px-6 sm:py-3"
              >
                {columnName}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {todos.map((todo) => (
            <TaskTableRow
              key={todo.id}
              todo={todo}
              onEdit={onEdit}
              onDelete={onDelete}
              isDeleting={isDeleting}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable;
