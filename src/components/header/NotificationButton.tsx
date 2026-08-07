import { Bell } from "lucide-react";

function NotificationButton() {
  return (
    <button
      type="button"
      aria-label="Bildirimler"
      className="
        flex h-10 w-10 cursor-pointer
        items-center justify-center
        rounded-xl border border-border
        bg-card text-muted-foreground
        transition-colors
        hover:bg-muted
        hover:text-foreground
      "
    >
      <Bell size={19} aria-hidden="true" />
    </button>
  );
}

export default NotificationButton
