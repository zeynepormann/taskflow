import { useTranslation } from "react-i18next";
import { Trash2, Pencil } from "lucide-react";
import type { User } from "../../types/user";
import { Button } from "@/components/ui/button";


interface UserTableRowProps {
    user: User;
    onEdit: (userId: number) => void;
    onDelete: (userId: number) => void;
    isDeleting: boolean;
}

function UserTableRow({
  user,
  onEdit,
  onDelete,
  isDeleting,
}: UserTableRowProps) {
  const { t } = useTranslation("common");
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
        <Button
          type="button"
          aria-label={t("editUser")}
          onClick={() => onEdit(user.id)}
          variant="outline"
          size="icon"
        >
          <Pencil size={22} aria-hidden="true" />
        </Button>
        <Button
          type="button"
          aria-label={t("deleteUser")}
          onClick={() => onDelete(user.id)}
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

export default UserTableRow;
