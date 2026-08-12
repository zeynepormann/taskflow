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
    <div className="w-full overflow-x-auto">
      <table className="w-full table-fixed">
        <thead className="bg-muted">
          <tr className="flex w-full">
            {columnNames.map((columnName) => (
              <th
                key={columnName}
                scope="col"
                className="min-w-0 basis-1/6 px-1 py-2 text-left font-sans first:basis-1/2 last:text-center sm:px-6 sm:py-3"
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
