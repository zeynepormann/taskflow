import type {ReactNode} from "react";

type CardProps = {
    children: ReactNode;
    className?: string;
};

function Card ({children, className= ""} : CardProps){
    return (
       <div className={`rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition-colors duration-300 ${className}`}
       >
        {children}
       </div> 
    );
}
export default Card;