import type { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

function PageLayout({ children }: PageLayoutProps) {
  return <div className="flex flex-col gap-7">{children}</div>;
}

export default PageLayout;
