import {
  Bell,
  CalendarDays,
  FolderKanban,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Star,
  Users,
  Newspaper,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import MenuItem from "./MenuItem";
import SidebarHeader from "./SidebarHeader";
import MenuItems from "./MenuItems";
import MenuGroupItem from "./MenuGroupItem";
import MenuShortcutItem from "./MenuShortcutItem";
import Menu from "./Menu";
import { Button } from "@/components/ui/button";

function Sidebar() {
  const { t } = useTranslation("sidebar");
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogOut(): void {
    logout();
    navigate("/login", {
      replace: true,
    });
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[272px] overflow-hidden border-r border-border bg-card lg:flex lg:flex-col">
      <div className="flex min-h-0 flex-1 flex-col p-4">
        <div className="shrink-0 border-b border-border pb-5">
        <SidebarHeader title="Taskflow" description={t("manageProjects")} />
        </div>
        <Menu>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain py-4">
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
          </div>
          <div className="shrink-0 border-t border-border pt-4">
            <MenuGroupItem title={t("shortcuts")} />
            <MenuItems>
              <MenuItem to="/favorites" label={t("favorites")} icon={Star} />
              <MenuItem
                to="/notifications"
                label={t("notifications")}
                icon={Bell}
              />

              <Button
                type="button"
                onClick={handleLogOut}
                variant="ghost"
                className="mt-3 w-full justify-start text-muted-foreground hover:text-destructive"
              >
                <LogOut size={18} aria-hidden="true" />
                <span>{t("logout")}</span>
              </Button>
            </MenuItems>
          </div>
        </Menu>
      </div>
    </aside>
  );
}

export default Sidebar;
