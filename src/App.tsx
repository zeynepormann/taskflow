import {
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Tasks from "./pages/Tasks";
import Calendar from "./pages/Calendar";
import Favorites from "./pages/Favorites";
import Notifications from "./pages/Notifications";
import Users from "./pages/Users";
import Projects from "./pages/Projects";
import DashboardLayout from "./layouts/DashboardLayout";
import Feed from "./pages/Feed";
import EditTodo from "./pages/EditTodo";
import ProjectDetail from "./pages/ProjectDetail";

function App() {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route
                    path="/login"
                    element={<Login />}
                />
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                 <Route
                    path="/tasks"
                    element={<Tasks />}
                />
                <Route
                    path="/tasks/:id/edit"
                    element= {<EditTodo />}
                />

                <Route
                    path="/calendar"
                    element={<Calendar />}
                />

                 <Route
                    path="/feed"
                    element={<Feed />}
                />

                <Route
                    path="/favorites"
                    element={<Favorites/>}
                />
               

                <Route
                    path="/notifications"
                    element={<Notifications />}
                />

                <Route
                    path="/projects"
                    element={<Projects />}
                />
                 <Route 
                    path="/projects/:id"
                    element={<ProjectDetail />}/>
                

                <Route
                    path="/users"
                    element={<Users />}
                />
                </Route>
            </Route>

            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            <Route
                path="*"
                element={<Navigate to="/login" replace />}
            />
        </Routes>
    );
}

export default App;