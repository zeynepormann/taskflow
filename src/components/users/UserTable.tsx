
import type { User } from "../../types/user";
import UserTableRow from "./UserTableRow";

interface UserTableProps {
  users: User[];
  columnNames: string[];
  onEdit: (userId:number) => void;
  onDelete: (userId: number) => void;
  isDeleting: boolean
}

function UserTable({
  users,
  columnNames,
  onEdit,
  onDelete,
  isDeleting,
}: UserTableProps) {
  return (
    <div className="my-6 mx-6 rounded-xl border border-border overflow-x-auto">
      <table className="w-full table-fixed">
        <thead className="bg-muted">
          <tr className="flex w-full">
            {columnNames.map((columnName, index) => (
              <th
                key={columnName}
                scope="col"
                className={`min-w-0 px-1 py-2 text-start font-sans sm:px-6 sm:py-3 flex justify-center ${
                  index === columnNames.length - 2
                    ? "basis-2/7"
                    : "basis-1/7"
                }`}
              >
                {columnName}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <UserTableRow 
            key={user.id}
            user={user} 
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

export default UserTable;
