import { NavLink } from "react-router-dom";
import { Plus } from "lucide-react";

interface MenuShortcutItemProps{
    title: string;
    description: string;
    buttonLabel: string;
    to: string;
}

function MenuShortcutItem({
    title,
    description,
    buttonLabel,
    to,
}: MenuShortcutItemProps){
    return (
      <div className="mt-6 rounded-2xl bg-primary/10 p-4 text-foreground">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold">
            {title}
          </p>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        <NavLink
          to={to}
          className="mt-4 flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
        >
            <span>{buttonLabel}</span>
            <Plus 
                size={18}
                aria-hidden="true"
            />
        </NavLink>
      </div>
    );
}
export default MenuShortcutItem
