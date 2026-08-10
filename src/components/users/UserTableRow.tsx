import type { User } from "../../types/user";

interface UserTableRowProps {
    user: User;
}

function UserTableRow({
  user,
}: UserTableRowProps) {
  return (
    <tr className="flex w-full items-center border-t border-border">

      <td className="min-w-0 shrink-0 basis-1/6 px-1 py-3 sm:px-6">
        {user.id}
      </td>
      <td className="min-w-0 shrink-0 basis-1/6 px-1 py-3 sm:px-6">
        {user.firstName}
      </td>

      <td className="min-w-0 shrink-0 basis-1/6 px-1 py-3 sm:px-6">
        {user.lastName}
      </td>

      <td className="min-w-0 shrink-0 basis-1/6 px-1 py-3 sm:px-6">
        {user.username}
      </td>
      <td className="min-w-0 shrink-0 basis-2/6 px-1 py-3 sm:px-6 text-center">
        {user.email}
      </td>
    </tr>
  );
}

export default UserTableRow;
