import { useAuth } from "../context/AuthContext"; //kullanıcı ismini gostermek icin kalması gerekiyor 
import TaskSummaryCard from "../components/TaskSummaryCard";
import { ListTodo, LayoutList, ListChecks } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTodosQuery } from "../hooks/useTodosQuery";



function Dashboard() {
  const { t } = useTranslation("dashboard");

  const { user } = useAuth();

  const firstname = user?.firstName ?? "Kullanıcı";

  const today = new Date();

  const {
    data: todos = [],
    isPending,
    isError,
  } = useTodosQuery();

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
    <div className="flex flex-col px-3 gap-10">
      <div>
        <h1 className="flex items-center text-2xl font-bold ">
          {t("welcome",{
            name: firstname,
          })}
        </h1>
        <p className="text-xs font-semibold">{t("subtitle")}</p>
      </div>

      <div className="grid gird-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
      </div>
    </div>
  );
}
export default Dashboard;
