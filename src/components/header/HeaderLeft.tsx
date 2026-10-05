import Breadcrumb from "../Breadcrumb";
import { Menu } from "lucide-react";
import type { MouseEventHandler } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

interface HeaderLeftProps {
  onOpenSidebar: MouseEventHandler<HTMLButtonElement>;
}

function HeaderLeft({ onOpenSidebar }: HeaderLeftProps) {
  const { t } = useTranslation("sidebar");
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="shrink-0 lg:hidden"
        aria-label={t("openMenu")}
        onClick={onOpenSidebar}
      >
        <Menu className="size-5" aria-hidden="true" />
      </Button>
      <Breadcrumb />
    </div>
  );
}

export default HeaderLeft;
