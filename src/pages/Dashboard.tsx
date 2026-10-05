import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/auth-context";
import { useTodosQuery } from "../hooks/useTodosQuery";
import PageLayout from "../components/page/PageLayout";

function Dashboard() {
  const { t, i18n } = useTranslation("dashboard");
  const { user } = useAuth();
  const { data: todos = [], isPending, error } = useTodosQuery();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (isPending)
    return <p className="text-sm text-muted-foreground">{t("loading")}</p>;
  if (error)
    return <p className="text-sm text-red-500">{t("common:loadError")}</p>;

  const open = todos.filter((task) => !task.completed);
  const todayTasks = open.filter(
    (task) => task.dueDate.toDateString() === today.toDateString(),
  );
  const upcoming = open
    .filter((task) => task.dueDate.getTime() >= tomorrow.getTime())
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  const overdue = open.filter(
    (task) => task.dueDate.getTime() < today.getTime(),
  );
  const completed = todos.filter((task) => task.completed);

  return (
    <PageLayout>
      <section className="border-b border-border pb-7">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium text-primary">
              {t("common:workspace")}
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
              {t("welcome", { name: user?.firstName ?? t("common:user") })}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("common:dailySummary", {
                today: todayTasks.length,
                open: open.length,
              })}
            </p>
          </div>
          <Link
            to="/tasks/new"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary-hover"
          >
            <Plus className="size-4" /> {t("common:addTask")}
          </Link>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
        <div className="rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h2 className="font-semibold">{t("common:todayTasks")}</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {t("common:focusHint")}
              </p>
            </div>
            <Link to="/tasks" className="text-sm font-semibold text-primary">
              {t("common:viewAll")}
            </Link>
          </div>
          <div className="divide-y divide-border">
            {todayTasks.length ? (
              todayTasks.map((task) => (
                <Link
                  key={task.id}
                  to={`/tasks/${task.id}/edit`}
                  className="group flex items-center gap-3 px-5 py-4 transition-colors hover:bg-muted/70"
                >
                  <span className="size-2 shrink-0 rounded-full bg-primary" />
                  <span className="min-w-0 flex-1 truncate text-sm font-medium group-hover:text-primary">
                    {task.todo}
                  </span>
                  <ArrowRight className="size-4 text-muted-foreground" />
                </Link>
              ))
            ) : (
              <div className="px-5 py-12 text-center">
                <CheckCircle2 className="mx-auto size-7 text-emerald-500" />
                <p className="mt-3 text-sm font-medium">
                  {t("common:todayClear")}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t("common:addTaskHint")}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
          <article className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("common:openTasks")}
              </span>
              <CalendarDays className="size-5 text-primary" />
            </div>
            <p className="mt-5 text-3xl font-bold">{open.length}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {t("common:plannedWork")}
            </p>
          </article>
          <article className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("common:completed")}
              </span>
              <CheckCircle2 className="size-5 text-emerald-500" />
            </div>
            <p className="mt-5 text-3xl font-bold">{completed.length}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {t("common:totalTasksHint")}
            </p>
          </article>
          <article
            className={`rounded-2xl border p-5 shadow-sm ${overdue.length ? "border-amber-500/30 bg-amber-500/5" : "border-border bg-card"}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("common:overdue")}
              </span>
              <CircleAlert
                className={`size-5 ${overdue.length ? "text-amber-600" : "text-muted-foreground"}`}
              />
            </div>
            <p className="mt-5 text-3xl font-bold">{overdue.length}</p>
            <Link
              to="/calendar"
              className="mt-1 inline-block text-xs font-medium text-primary"
            >
              {t("common:viewCalendar")}
            </Link>
          </article>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="font-semibold">{t("common:upNext")}</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {t("common:upcomingDeadlines")}
            </p>
          </div>
          <Link to="/calendar" className="text-sm font-semibold text-primary">
            {t("common:openCalendar")}
          </Link>
        </div>
        <div className="grid divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
          {upcoming.slice(0, 3).map((task) => (
            <Link
              key={task.id}
              to={`/tasks/${task.id}/edit`}
              className="p-5 transition-colors hover:bg-muted/70"
            >
              <p className="truncate text-sm font-medium">{task.todo}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {task.dueDate.toLocaleDateString(
                  i18n.resolvedLanguage ?? "en",
                  { day: "numeric", month: "short" },
                )}
              </p>
            </Link>
          ))}
          {upcoming.length === 0 && (
            <p className="p-5 text-sm text-muted-foreground">
              {t("common:noUpcoming")}
            </p>
          )}
        </div>
      </section>
    </PageLayout>
  );
}

export default Dashboard;
