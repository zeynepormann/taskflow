import type { LucideIcon } from "lucide-react";
import type { TodoWithDate } from "../../types/todo";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface TaskSummaryProps {
  title: string;
  tasks: TodoWithDate[];
  icon: LucideIcon;
}

function TaskSummaryCard({ title, tasks, icon: Icon }: TaskSummaryProps) {
  const { t } = useTranslation("tasks");
  return (
    <Card className="h-full min-h-56">
      <CardHeader className="flex-row items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon size={20} aria-hidden="true" /></span>

          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">{title}</p><h2 className="text-2xl font-bold">{tasks.length}</h2>
          </div>
      </CardHeader>

      <CardContent className="min-w-0">
          {tasks.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              {t("taskError")}
            </p>
          ) : (
            <ul className="mt-4 space-y-4">
              {tasks.slice(0, 4).map((task) => (
                <li key={task.id}>{task.todo}</li>
              ))}
            </ul>
          )}
      </CardContent>
    </Card>
  );
}
export default TaskSummaryCard;
