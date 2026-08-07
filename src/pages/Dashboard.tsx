import { useAuth } from "../context/AuthContext"; //kullanıcı ismini gostermek icin kalması gerekiyor
import TaskSummaryCard from "../components/dashboard/TaskSummaryCard";
import { ListTodo, LayoutList, ListChecks } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTodosQuery } from "../hooks/useTodosQuery";
import PageHeader from "../components/page/PageHeader";
import PageBody from "../components/page/PageBody";
import PageLayout from "../components/page/PageLayout";

function Dashboard() {
  const { t } = useTranslation("dashboard");

  const { user } = useAuth();

  const firstname = user?.firstName ?? "Kullanıcı";

  const today = new Date();

  const { data: todos = [], isPending, isError } = useTodosQuery();

  today.setHours(0, 0, 0, 0);

  if (isPending) {
    return <p>{t("loading")}</p>;
  }
  if (isError) {
    return <p>{isError}</p>;
  }

  const completedTasks = todos.filter((todo) => todo.completed);

  const upcomingTasks = todos.filter(
    (todo) => !todo.completed && todo.dueDate.getTime() >= today.getTime(),
  );

  const overdueTasks = todos.filter(
    (todo) => !todo.completed && todo.dueDate.getTime() < today.getTime(),
  );

  return (
    <PageLayout>
      <PageHeader
        title={t("welcome", {
          name: firstname,
        })}
        description={t("subtitle")}
      />

      <PageBody className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <TaskSummaryCard
          title={t("upcomingTasks")}
          tasks={upcomingTasks}
          icon={LayoutList}
        />

        <TaskSummaryCard
          title={t("completedTasks")}
          tasks={completedTasks}
          icon={ListChecks}
        />

        <TaskSummaryCard
          title={t("overdueTasks")}
          tasks={overdueTasks}
          icon={ListTodo}
        />
      </PageBody>
    </PageLayout>
  );
}
export default Dashboard;
