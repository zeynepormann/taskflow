import type { LucideIcon } from "lucide-react";
import type { TodoWithDate } from "../../types/todo";
import { useTranslation } from "react-i18next";
import CardItem from "../card/CardItem";
import CardItems from "../card/CardItems";
import CardHead from "../card/CardHead";
import CardBody from "../card/CardBody";
import Card from "../card/Card";

interface TaskSummaryProps {
  title: string;
  tasks: TodoWithDate[];
  icon: LucideIcon;
}

function TaskSummaryCard({ title, tasks, icon: Icon }: TaskSummaryProps) {
  const { t } = useTranslation("tasks");
  return (
    <Card className="h-full min-h-100 rounded-xl bg-muted p-5 shadow-xl">
      <CardBody>
        <CardHead>
          <Icon size={30} aria-hidden="true" className="shrink-0" />

          <div className="min-w-0">
            <h2 className="text-xl font-bold">
              {title} {tasks.length}
            </h2>
          </div>
        </CardHead>

        <div className="min-w-0">
          {tasks.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              {t("taskError")}
            </p>
          ) : (
            <CardItems className="mt-4 gap-4">
              {tasks.slice(0, 4).map((task) => (
                <CardItem key={task.id}>{task.todo}</CardItem>
              ))}
            </CardItems>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
export default TaskSummaryCard;
