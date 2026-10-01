import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/page/PageHeader";
import PageLayout from "../components/page/PageLayout";
import { useTodosQuery } from "../hooks/useTodosQuery";
import { Button } from "@/components/ui/button";

function Calendar() {
  const { t, i18n } = useTranslation("common");
  const [month, setMonth] = useState(() => new Date());
  const { data: todos = [], isPending } = useTodosQuery();
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const firstDay = (first.getDay() + 6) % 7;
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells = Array.from(
    { length: Math.ceil((firstDay + days) / 7) * 7 },
    (_, index) => index - firstDay + 1,
  );
  const label = new Intl.DateTimeFormat(i18n.resolvedLanguage ?? "en", {
    month: "long",
    year: "numeric",
  }).format(month);
  return (
    <PageLayout>
      <div className="flex items-end justify-between gap-4">
        <PageHeader
          title={t("common:calendar")}
          description={t("common:calendarDescription")}
        />
        <div className="flex gap-2">
          <Button
            aria-label={t("previousMonth")}
            onClick={() =>
              setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))
            }
            variant="outline"
            size="icon"
          >
            <ChevronLeft className="size-5" />
          </Button>
          <Button
            aria-label={t("nextMonth")}
            onClick={() =>
              setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))
            }
            variant="outline"
            size="icon"
          >
            <ChevronRight className="size-5" />
          </Button>
        </div>
      </div>
      <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <h2 className="border-b border-border px-5 py-4 text-lg font-semibold capitalize">
          {label}
        </h2>
        <div className="grid grid-cols-7 border-b border-border text-center text-xs font-semibold text-muted-foreground">
          {Array.from({ length: 7 }, (_, day) => (
            <div className="p-3" key={day}>
              {new Intl.DateTimeFormat(i18n.resolvedLanguage ?? "en", {
                weekday: "short",
              }).format(new Date(2024, 0, 1 + day))}
            </div>
          ))}
        </div>
        {isPending ? (
          <p className="p-8 text-sm text-muted-foreground">
            {t("common:calendarLoading")}
          </p>
        ) : (
          <div className="grid grid-cols-7">
            {cells.map((day, index) => {
              const date = new Date(month.getFullYear(), month.getMonth(), day);
              const tasks =
                day > 0 && day <= days
                  ? todos.filter(
                      (task) =>
                        task.dueDate.toDateString() === date.toDateString(),
                    )
                  : [];
              return (
                <div
                  key={index}
                  className="min-h-24 border-b border-r border-border p-2 sm:min-h-32"
                >
                  <span
                    className={
                      day > 0 && day <= days
                        ? "text-sm font-medium"
                        : "text-sm text-muted-foreground"
                    }
                  >
                    {day > 0 && day <= days ? day : ""}
                  </span>
                  <div className="mt-1 space-y-1">
                    {tasks.slice(0, 2).map((task) => (
                      <Link
                        key={task.id}
                        to={`/tasks/${task.id}/edit`}
                        className={`block truncate rounded px-1.5 py-1 text-[10px] font-medium ${task.completed ? "bg-emerald-500/15 text-emerald-700" : "bg-primary/10 text-primary"}`}
                      >
                        {task.todo}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </PageLayout>
  );
}
export default Calendar;
