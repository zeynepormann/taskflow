import {
  Bell,
  CalendarDays,
  FolderKanban,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Newspaper,
  Star,
  Users,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import Menu from "./Menu";
import MenuGroupItem from "./MenuGroupItem";
import MenuItem from "./MenuItem";
import MenuItems from "./MenuItems";
import MenuShortcutItem from "./MenuShortcutItem";
import SidebarHeader from "./SidebarHeader";

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

interface SidebarContentProps {
  onNavigate?: () => void;
  onClose?: () => void;
}

function SidebarContent({ onNavigate, onClose }: SidebarContentProps) {
  const { t } = useTranslation("sidebar");
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogOut(): void {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col p-4">
      <div className="flex shrink-0 items-start justify-between border-b border-border pb-5">
        <SidebarHeader title="TaskFlow" description={t("manageProjects")} />
        {onClose && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={t("closeMenu")}
            onClick={onClose}
          >
            <X className="size-5" />
          </Button>
        )}
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
                onClick={onNavigate}
              />
              <MenuItem
                to="/projects"
                label={t("projects")}
                icon={FolderKanban}
                onClick={onNavigate}
              />
              <MenuItem
                to="/tasks"
                label={t("tasks")}
                icon={ListTodo}
                onClick={onNavigate}
              />
              <MenuItem
                to="/calendar"
                label={t("calendar")}
                icon={CalendarDays}
                onClick={onNavigate}
              />
              <MenuItem
                to="/users"
                label={t("users")}
                icon={Users}
                onClick={onNavigate}
              />
              <MenuItem
                to="/feed"
                label={t("feed")}
                icon={Newspaper}
                onClick={onNavigate}
              />
            </MenuItems>
          </div>
          <MenuShortcutItem
            title={t("newTaskPlan")}
            description={t("newTaskCreateandPlan")}
            buttonLabel={t("newTask")}
            to="/tasks/new"
            onClick={onNavigate}
          />
        </div>
        <div className="shrink-0 border-t border-border pt-4">
          <MenuGroupItem title={t("shortcuts")} />
          <MenuItems>
            <MenuItem
              to="/favorites"
              label={t("favorites")}
              icon={Star}
              onClick={onNavigate}
            />
            <MenuItem
              to="/notifications"
              label={t("notifications")}
              icon={Bell}
              onClick={onNavigate}
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
  );
}

function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const { t } = useTranslation("sidebar");

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-68 overflow-hidden border-r border-border bg-card lg:flex lg:flex-col">
        <SidebarContent />
      </aside>
      <div
        className={`fixed inset-0 z-50 lg:hidden ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-foreground/30 backdrop-blur-sm transition-opacity ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          aria-label={t("closeMenu")}
          tabIndex={mobileOpen ? 0 : -1}
          onClick={onMobileClose}
        />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="TaskFlow"
          className={`absolute inset-y-0 left-0 flex w-[min(86vw,320px)] flex-col border-r border-border bg-card shadow-2xl transition-transform duration-200 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <SidebarContent onNavigate={onMobileClose} onClose={onMobileClose} />
        </aside>
      </div>
    </>
  );
}

export default Sidebar;
