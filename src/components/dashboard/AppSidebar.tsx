import {
    Bell,
    CalendarDays,
    FolderKanban,
    LayoutDashboard,
    ListTodo,
    LogOut,
    Plus,
    Star,
    Users,
    Newspaper,
} from "lucide-react";

import {
    NavLink,
    useNavigate,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";


function AppSidebar() {
    const { t } = useTranslation("sidebar");
    const {logout} = useAuth();
    const navigate = useNavigate();

    function handleLogOut(): void{
        logout();
        navigate("/login", {
            replace:true,
        });
        
    }

    return (
      <aside className="hidden border-r border-border bg-card lg:block">
        <div className="sticky top-0 flex flex-col h-dvh overflow-y-auto shadow-2xl bg-card p-4 ">
          <div className="flex flex-col px-2 py-2 ">
            <div className="flex flex-col min-w-0">
              <p className="text-xl font-bold">TaskFlow</p>
              <p className="text-xs font-semibold">{t("manageProjects")}</p>
            </div>

            <div className="mt-4">
              <p className="mt-3 font-semibold font-sans">{t("menu")}</p>
              <nav className="font-semibold font-sans">
                <NavLink
                  to="/dashboard"
                  className="mt-3 flex items-center gap-3 rounded-xl px-3 py-3 bg-primary/10 text-primary cursor-pointer"
                >
                  <LayoutDashboard size={18} aria-hidden="true" />
                  <span>{t("dashboard")}</span>
                </NavLink>

                <NavLink
                  to="/projects"
                  className="mt-3 flex items-center gap-3 rounded-xl px-3 py-3 bg-primary/10 text-primary cursor-pointer "
                >
                  <FolderKanban size={18} aria-hidden="true" />
                  <span>{t("projects")}</span>
                </NavLink>

                <NavLink
                  to="/tasks"
                  className="mt-3 flex items-center gap-3 rounded-xl px-3 py-3 bg-primary/10 text-primary cursor-pointer"
                >
                  <ListTodo size={18} aria-hidden="true" />
                  <span>{t("tasks")}</span>
                </NavLink>

                <NavLink
                  to="/calendar"
                  className="
                                        mt-3 flex items-center gap-3 rounded-xl px-3 py-3 
                                        bg-primary/10 text-primary cursor-pointer hover:bg-primary-hover
                                        transition-colors duration-300
                                "
                >
                  <CalendarDays size={18} aria-hidden="true" />
                  <span>{t("calendar")}</span>
                </NavLink>

                <NavLink
                  to="/users"
                  className="mt-3 flex items-center gap-3 rounded-xl px-3 py-3 bg-primary/10 text-primary cursor-pointer"
                >
                  <Users size={18} aria-hidden="true" />
                  <span>{t("users")}</span>
                </NavLink>
                <NavLink
                  to="/feed"
                  className="mt-3 flex items-center gap-3 rounded-xl px-3 py-3 bg-primary/10 text-primary cursor-pointer"
                >
                  <Newspaper size={18} aria-hidden="true" />
                  <span>{t("feed")}</span>
                </NavLink>
              </nav>
            </div>

            <div
              className="
                            mt-5 bg-primary/80 rounded-2xl h-40  text-primary
                            px-4 py-4  gap-4
                            "
            >
              <div className="flex flex-col gap-2">
                <p className="text-sm text-background font-semibold font-sans">
                  {t("newTaskPlan")}
                </p>
                <p className="text-xs text-background font-semibold font-sans">
                  {t("newTaskCreateandPlan")}
                </p>
              </div>
              <div className="mt-4 h-14 w-40 flex items-center justify-center rounded-2xl bg-border cursor-pointer">
                <NavLink
                  to="/tasks/new"
                  className="flex justify-center items-center gap-6 font-semibold text-primary-hover"
                >
                  <span> {t("newTask")}</span>
                  <Plus size={24} aria-hidden="true" />
                </NavLink>
              </div>
            </div>

            <div className="mt-4">
              <p className="font-semibold font-sans">{t("shortcuts")}</p>
              <nav className="font-semibold font-sans">
                <NavLink
                  to="/favorites"
                  className="mt-3 flex items-center gap-3 rounded-xl px-3 py-3 bg-primary/10 text-primary cursor-pointer"
                >
                  <Star size={18} aria-hidden="true" />
                  <span>{t("favorites")}</span>
                </NavLink>

                <NavLink
                  to="/notifications"
                  className="mt-3 flex items-center gap-3 rounded-xl px-3 py-3 bg-primary/10 text-primary cursor-pointer"
                >
                  <Bell size={18} aria-hidden="true" />
                  <span>{t("notifications")}</span>
                </NavLink>

                <button
                  type="button"
                  onClick={handleLogOut}
                  className="mt-3 flex h-14 w-full cursor-pointer items-center gap-3 rounded-xl bg-primary/10 px-3 text-primary transition-colors duration-300 hover:bg-red-500/50"
                >
                  <LogOut size={18} aria-hidden="true" />
                  <span>{t("logout")}</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </aside>
    );
}

export default AppSidebar;