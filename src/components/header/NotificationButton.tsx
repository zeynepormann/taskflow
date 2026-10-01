import { useTranslation } from "react-i18next";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function NotificationButton() {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  return (
    <Button
      type="button"
      aria-label={t("notifications")}
      variant="outline"
      size="icon"
      onClick={() => navigate("/notifications")}
    >
      <Bell size={19} aria-hidden="true" />
    </Button>
  );
}

export default NotificationButton
