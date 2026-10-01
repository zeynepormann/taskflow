import { useTranslation } from "react-i18next";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

function NotificationButton() {
  const { t } = useTranslation("common");
  return (
    <Button
      type="button"
      aria-label={t("notifications")}
      variant="outline"
      size="icon"
    >
      <Bell size={19} aria-hidden="true" />
    </Button>
  );
}

export default NotificationButton
