import Card from "../components/Card";
import { useAuth } from "../context/AuthContext";
import { useTodos } from "../context/TodoContext";
import TaskSummaryCard from "../components/TaskSummaryCard";
import { ListTodo, LayoutList, ListChecks, CircleCheckBig } from "lucide-react";

function Dashboard() {
  const { user } = useAuth();
  const firstname = user?.firstName ?? "Kullanıcı";

  const { todos, isLoading, isError } = useTodos();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isLoading) {
    return <p>Görevler yükleniyor..</p>;
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
          Hoşgeldin, {firstname}
        </h1>
        <p className="text-xs font-semibold">
          Genel işlerini burada görebilirsin.
        </p>
      </div>

      <div className="grid gird-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <TaskSummaryCard
          title="Yaklaşan Etkinlikler"
          tasks={upcomingTasks}
          icon={LayoutList}
        />

        <TaskSummaryCard
          title="Tamamlanan Görevler"
          tasks={completedTasks}
          icon={ListChecks}
        />

        <TaskSummaryCard
          title="Geciken Görevler"
          tasks={overdueTasks}
          icon={ListTodo}
        />
      </div>
    </div>
  );
}
export default Dashboard;
