import LanguageSwitcher from "../LanguageSwitcher";
import ThemeToggle from "../ThemeToggle";
import NotificationButton from "./NotificationButton";

function HeaderRight() {
  return (
    <div className="ml-auto flex items-center gap-3">
      <LanguageSwitcher />
      <NotificationButton />
      <ThemeToggle />
    </div>
  );
}

export default HeaderRight;
