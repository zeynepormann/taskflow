import type { ReactNode } from "react";

interface CardHeadProps {
  children: ReactNode;
  className?: string;
}

function CardHead({ children, className = "" }: CardHeadProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>{children}</div>
  );
}

export default CardHead;
