import type { ReactNode } from "react";

interface CardItemsProps {
  children: ReactNode;
  className?: string;
}

function CardItems({ children, className = "" }: CardItemsProps) {
  return <ul className={`flex flex-col  ${className}`}>{children}</ul>;
}

export default CardItems;
