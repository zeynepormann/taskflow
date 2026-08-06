import type { ReactNode } from "react";

interface MenuItemsProps{
    children: ReactNode;
}

function MenuItems({
    children,
}: MenuItemsProps){
    return(
        <nav className="font-sans font-semibold">
            {children}
        </nav>
    )
}
export default MenuItems