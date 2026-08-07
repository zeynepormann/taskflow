import type { ReactNode } from "react";

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

function CardBody({ children, className = "" }: CardBodyProps) {
  return <div className={className}>{children}</div>;
}

export default CardBody;
