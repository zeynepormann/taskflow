import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Breadcrumb() {
  const { pathname } = useLocation();
  const { t } = useTranslation("sidebar");

  const routeLabels: Record<string, string> = {
    dashboard: t("dashboard"),
    projects: t("projects"),
    tasks: t("tasks"),
    calendar: t("calendar"),
    users: t("users"),
    feed: t("feed"),
    favorites: t("favorites"),
    notifications: t("notifications"),
    new: t("newTask"),
  };

  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex min-w-0 items-center gap-2 text-sm">
        <li>
          <Link
            to="/dashboard"
            className="text-muted-foreground hover:text-foreground"
          >
            TaskFlow
          </Link>
        </li>

        {segments.map((segment, index) => {
          const path = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;
          const label = routeLabels[segment] ?? segment;

          return (
            <li key={path} className="flex min-w-0 items-center gap-2">
              <ChevronRight
                aria-hidden="true"
                className="size-4 shrink-0 text-muted-foreground"
              />

              {isLast ? (
                <span
                  aria-current="page"
                  className="truncate font-medium text-foreground"
                >
                  {label}
                </span>
              ) : (
                <Link
                  to={path}
                  className="
                    truncate text-muted-foreground
                    hover:text-foreground
                  "
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
