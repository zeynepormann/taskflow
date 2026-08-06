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
      <div className="mt-5 bg-primary/80 rounded-2xl h-40 text-primary px-4 py-4  gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-background font-semibold font-sans">
            {title}
          </p>
          <p className="text-xs text-background font-semibold font-sans">
            {description}
          </p>
        </div>

        <NavLink
          to={to}
          className="mt-4 h-14 w-50 rounded-2xl bg-border cursor-pointer flex justify-center items-center gap-6 font-semibold text-primary-hover"
        >
            <span>{buttonLabel}</span>
            <Plus 
                size={25}
                aria-hidden="true"
            />
        </NavLink>
      </div>
    );
}
export default MenuShortcutItem