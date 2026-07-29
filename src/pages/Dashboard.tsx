import Card from "../components/Card";
import { useAuth } from "../context/AuthContext";
import { useTodos } from "../context/TodoContext";
import{
    ListTodo,
    LayoutList,
    ListChecks,
    CircleCheckBig,
} from "lucide-react"


function Dashboard(){
    const {user} = useAuth();
    const firstname = user?.firstName ?? "Kullanıcı";
    
    const {todos,isLoading,isError} = useTodos();
    const today = new Date();
    today.setHours(0,0,0,0);

    if (isLoading){
        return <p>Görevler yükleniyor..</p>
    }
    if (isError){
        return <p>{isError}</p> 
    }

    const completedCount = todos.filter(
        (todo) => todo.completed,
    ).length;

    const upcomingCount = todos.filter(
        (todo) => !todo.completed && todo.dueDate.getTime() >= today.getTime(),
    ).length;

    const overdueCount = todos.filter(
        (todo) => !todo.completed && todo.dueDate.getTime() < today.getTime(),
    ).length

    return(
        
            <div className="flex flex-col px-3 gap-10">
                <div>
                    <h1 className="flex items-center text-2xl font-bold ">
                    Hoşgeldin, {firstname} 
                    </h1>
                    <p className="text-xs font-semibold">
                    Genel işlerini burada görebilirsin.
                    </p>
                </div>
                <div className="flex gap-20">
                
                        <Card className="min-h-100 min-w-100 bg-muted rounded-xl p-5 shadow-xl">
                            <p className="flex text-xl font-semibold font-sans gap-2">
                                    <LayoutList
                                    size={30}
                                    aria-hidden="true"
                                    />
                                <div className="flex flex-col gap-4 font-bold font-sans">
                                    <span className="text-xl">Yaklaşan Etkinliklerin {upcomingCount} </span>
                                    <ul className="flex flex-col gap-4 text-sm">
                                    {todos.slice(0,4).map((todo) => (
                                    <li key={todo.id}>
                                        {todo.todo}
                                    </li>
                                    ))}
                                </ul>
                            </div>
                            </p>         
                
                        </Card>

                        <Card className="min-h-100 min-w-100 bg-muted rounded-xl p-5 shadow-xl">
                            <p className="flex text-xl font-semibold font-sans gap-2 ">
                                <ListChecks
                                size={30}
                                aria-hidden="true"
                                />
                            
                            <div className="flex flex-col gap-4 font-bold font-sans">
                                <span className="text-xl">Tamamlanan Görevler</span>
                                 <ul className="flex flex-col gap-4 text-sm">
                                    {todos.slice(5,8).map((todo) => (
                                        <li key={todo.id}>
                                        {todo.todo}
                                         </li>
                                    ))}
                                </ul>
                            </div>
                            </p>
                            
                        
                        </Card>
                        <Card className="min-h-100 min-w-100 bg-muted rounded-xl p-5 shadow-xl">
                            <p className="flex text-xl font-semibold font-sans gap-2">
                                <ListTodo
                                size={30}
                                aria-hidden="true"
                                />
                                <span>Geciken Görevlerin {overdueCount}</span>
                            </p>
                             <div className="flex flex-col gap-4 font-bold font-sans">
                                <ul className="flex flex-col gap-4 text-sm  ">
                                    {todos.slice(9,12).map((todo) => (
                                    <li key={todo.id}>
                                        {todo.todo}
                                    </li>
                                    ))}
                                </ul>
                            </div>

                        </Card>
                 
                </div>
           </div>
    )
    
}
export default Dashboard;