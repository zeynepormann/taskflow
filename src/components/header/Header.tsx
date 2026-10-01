import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";

function Header() {
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
      <HeaderLeft />
      <HeaderRight />
    </header>
  );
}

export default Header;
