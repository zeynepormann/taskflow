import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";
import type { MouseEventHandler } from "react";

interface HeaderProps {
  onOpenSidebar: MouseEventHandler<HTMLButtonElement>;
}

function Header({ onOpenSidebar }: HeaderProps) {
  return (
    <header
      className="
        sticky top-0 z-30
        flex h-18 items-center
        justify-between
        border-b border-border
        bg-card/95 px-4 backdrop-blur sm:px-6 lg:px-8
      "
    >
      <HeaderLeft onOpenSidebar={onOpenSidebar} />
      <HeaderRight />
    </header>
  );
}

export default Header;
