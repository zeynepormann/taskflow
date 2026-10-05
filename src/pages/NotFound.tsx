import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NotFound() {
  const { t } = useTranslation("common");
  return (
    <main className="grid min-h-dvh place-items-center bg-background p-6 text-center">
      <div>
        <p className="text-sm font-semibold text-primary">404</p>
        <h1 className="mt-2 text-3xl font-bold">{t("notFoundTitle")}</h1>
        <p className="mt-3 text-muted-foreground">{t("notFoundDescription")}</p>
        <Link
          to="/dashboard"
          className="mt-6 inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
        >
          {t("backDashboard")}
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
