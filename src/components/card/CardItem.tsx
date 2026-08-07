import type { ReactNode } from "react";

interface CardItemProps {
  children: ReactNode;
  className?: string;
}

function CardItem({ children, className = "" }: CardItemProps) {
  return <li className={className}>{children}</li>;
}

export default CardItem;
