import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

interface MenuItemProps {
  to: string;
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
}

function MenuItem({ to, label, icon: Icon, onClick }: MenuItemProps) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `mt-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`
      }
    >
      <Icon size={18} aria-hidden="true" />
      <span>{label}</span>
    </NavLink>
  );
}
export default MenuItem;
