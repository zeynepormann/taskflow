import type { ReactNode } from "react";

interface MenuProps{
    children: ReactNode
}

function Menu({
    children,
}: MenuProps){
    return(
        <div className="flex flex-col">
            {children}
        </div>
    )
}

export default Menu