import type { ReactNode } from "react";

interface PageBodyProps {
  children: ReactNode;
  className?: string;
}

function PageBody({ children, className = "" }: PageBodyProps) {
  return <section className={className}>{children}</section>;
}

export default PageBody;
