import type { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

function PageLayout({ children }: PageLayoutProps) {
  return <div className="flex flex-col gap-10 px-3">{children}</div>;
}

export default PageLayout;
