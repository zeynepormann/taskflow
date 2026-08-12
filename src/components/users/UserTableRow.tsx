import { Trash2, Pencil } from "lucide-react";
import type { User } from "../../types/user";


interface UserTableRowProps {
    user: User;
    onEdit: (userId: number) => void;
    onDelete: (userId: number) => void;
}

function UserTableRow({
  user,
  onEdit,
  onDelete
}: UserTableRowProps) {
  return (
    <tr className="flex w-full items-center border-t border-border">
      <td className="min-w-0 shrink-0 basis-1/7 px-1 py-3 sm:px-6  text-center">
        {user.id}
      </td>
      <td className="min-w-0 shrink-0 basis-1/7 px-1 py-3 sm:px-6  text-center">
        {user.firstName}
      </td>

      <td className="min-w-0 shrink-0 basis-1/7 px-1 py-3 sm:px-6  text-center">
        {user.lastName}
      </td>

      <td className="min-w-0 shrink-0 basis-1/7 px-1 py-3 sm:px-6  text-center">
        {user.username}
      </td>
      <td className="min-w-0 shrink-0 basis-2/7 px-1 py-3 sm:px-6 text-center">
        {user.email}
      </td>
      <td className="flex flex-row gap-2 min-w-0 shrink-0 basis-1/7 px-1 py-3 sm:px-6 items-center justify-center">
        <button
          type="button"
          aria-label="Kullanıcıyı Düzenle"
          onClick={() => onEdit(user.id)}
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
          aria-label="Kullanıcıyı Sil"
          onClick={() => onDelete(user.id)}
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

export default UserTableRow;
