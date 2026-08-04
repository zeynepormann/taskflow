import Card from "./Card";
import type { LucideIcon } from "lucide-react";
import type { TodoWithDate } from "../types/todo";

interface TaskSummaryProps {
    title: string;
    tasks: TodoWithDate[];
    icon: LucideIcon;
}

function TaskSummaryCard({
    title,
    tasks,
    icon: Icon,
}: TaskSummaryProps){
    return(
        <Card className="h-full min-h-100 rounded-xl bg-muted p-5 shadow-xl">
            <div className="flex items-start gap-3">
                <Icon
                    size={30}
                    aria-hidden="true"
                    className="shrink-0"
                />
                <div className="min-w-0">
                    <h2 className="text-xl font-bold">
                        {title} {tasks.length}
                    </h2>

                    {tasks.length === 0 ?(
                        <p className="mt-4 text-sm text-muted-foreground">
                            Görev bulunamadı
                        </p>
                    ): (
                        <ul className="mt-4 flex flex-col gap-4 text-sm">
                            {tasks.slice(0,4).map((task) => (
                                <li 
                                    key={task.id}
                                    className="wrap-break-word"
                                >
                                    {task.todo}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </Card>
    )
}
export default TaskSummaryCard