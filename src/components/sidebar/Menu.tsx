import type { ReactNode } from "react";

interface MenuProps{
    children: ReactNode
}

function Menu({
    children,
}: MenuProps){
    return(
        <div className="flex min-h-0 flex-1 flex-col">
            {children}
        </div>
    )
}

export default Menu