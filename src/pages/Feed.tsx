import { useTranslation } from "react-i18next";
import { useState } from "react";
import { CheckCircle2, FileEdit, FolderKanban, UserPlus } from "lucide-react";
import PageHeader from "../components/page/PageHeader";
import PageLayout from "../components/page/PageLayout";
import { Button } from "@/components/ui/button";

const activities = [
  {
    id: 1,
    type: "task",
    user: "Ayşe Demir",
    text: "activityPayment",
    project: "ecommerce",
    time: "tenMinutesAgo",
    icon: CheckCircle2,
  },
  {
    id: 2,
    type: "project",
    user: "Mehmet Kaya",
    text: "activityProgress",
    project: "taskflow",
    time: "oneHourAgo",
    icon: FolderKanban,
  },
  {
    id: 3,
    type: "member",
    user: "Elif Yılmaz",
    text: "activityJoined",
    project: "banking",
    time: "threeHoursAgo",
    icon: UserPlus,
  },
  {
    id: 4,
    type: "task",
    user: "Can Aydın",
    text: "activityNote",
    project: "taskflow",
    time: "yesterday",
    icon: FileEdit,
  },
];

function Feed() {
  const { t } = useTranslation("common");
  const [filter, setFilter] = useState("all");
  const visible =
    filter === "all"
      ? activities
      : activities.filter((activity) => activity.type === filter);
  return (
    <PageLayout>
      <PageHeader
        title={t("common:feed")}
        description={t("common:feedDescription")}
      />
      <div className="flex flex-wrap gap-2">
        {[
          ["all", "all"],
          ["task", "tasks"],
          ["project", "projects"],
          ["member", "team"],
        ].map(([value, label]) => (
          <Button
            key={value}
            onClick={() => setFilter(value)}
            variant={filter === value ? "default" : "outline"}
            size="sm"
          >
            {t(label)}
          </Button>
        ))}
      </div>
      <section className="rounded-xl border border-border bg-card shadow-sm">
        {visible.map((activity) => {
          const Icon = activity.icon;
          return (
            <article
              key={activity.id}
              className="flex gap-4 border-b border-border p-5 last:border-0"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="text-sm">
                  <strong>{activity.user}</strong> {t(activity.text)}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t(activity.project)} · {t(activity.time)}
                </p>
              </div>
            </article>
          );
        })}
      </section>
    </PageLayout>
  );
}
export default Feed;
