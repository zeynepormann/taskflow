import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

interface MenuItemProps{
    to: string;
    label: string;
    icon: LucideIcon;
}

function MenuItem({
    to,
    label,
    icon: Icon,
}: MenuItemProps){
    return (
      <NavLink
        to={to}
        className="mt-3 flex items-center gap-3 rounded-xl px-3 py-3 bg-primary/10 text-primary cursor-pointer hover:bg-primary-hover/40"
      >
        <Icon size={18} aria-hidden="true" />
        <span>{label}</span>
      </NavLink>
    );
}
export default MenuItem