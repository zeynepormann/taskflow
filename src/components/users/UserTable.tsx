
import type { User } from "../../types/user";
import UserTableRow from "./UserTableRow";

interface UserTableProps {
  users: User[];
  columnNames: string[];
}

function UserTable({
  users,
  columnNames,
}: UserTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full table-fixed">
        <thead className="bg-muted">
          <tr className="flex w-full">
            {columnNames.map((columnName) => (
              <th
                key={columnName}
                scope="col"
                className="min-w-0 basis-1/6 px-1 py-2 text-left font-sans last:text-center last:basis-2/6 sm:px-6 sm:py-3"
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
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
