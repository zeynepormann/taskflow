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
import MenuItem from "../sidebar/MenuItem";
import SidebarHeader from "../sidebar/SidebarHeader";
import MenuItems from "../sidebar/MenuItems";
import MenuGroupItem from "../sidebar/MenuGroupItem";
import MenuShortcutItem from "../sidebar/MenuShortcutItem";
import Menu from "../sidebar/Menu";


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
          <Menu>
            <SidebarHeader title="Taskflow" description={t("manageProjects")} />

            <div className="mt-2">
              <MenuGroupItem title={t("menu")} />

              <MenuItems>
                <MenuItem
                  to="/dashboard"
                  label={t("dashboard")}
                  icon={LayoutDashboard}
                />
                <MenuItem
                  to="/projects"
                  label={t("projects")}
                  icon={FolderKanban}
                />
                <MenuItem to="/tasks" label={t("tasks")} icon={ListTodo} />
                <MenuItem
                  to="/calendar"
                  label={t("calendar")}
                  icon={CalendarDays}
                />
                <MenuItem to="/users" label={t("users")} icon={Users} />
                <MenuItem to="/feed" label={t("feed")} icon={Newspaper} />
              </MenuItems>
            </div>

            <MenuShortcutItem
              title={t("newTaskPlan")}
              description={t("newTaskCreateandPlan")}
              buttonLabel={t("newTask")}
              to="/tasks/new"
            />
            <MenuGroupItem title={t("shortcuts")} />
            <MenuItems>
              <MenuItem to="/favorites" label={t("favorites")} icon={Star} />
              <MenuItem
                to="/notifications"
                label={t("notifications")}
                icon={Bell}
              />

              <button
                type="button"
                onClick={handleLogOut}
                className="mt-3 flex h-14 w-full cursor-pointer items-center gap-3 rounded-xl bg-primary/10 px-3 text-primary transition-colors duration-300 hover:bg-red-500/50"
              >
                <LogOut size={18} aria-hidden="true" />
                <span>{t("logout")}</span>
              </button>
            </MenuItems>
          </Menu>
        </div>
      </aside>
    );
}

export default AppSidebar;