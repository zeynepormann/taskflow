import { Outlet } from "react-router-dom";
import { Bell, ChevronRight } from "lucide-react";

import Sidebar from "../components/sidebar/Sidebar";
import ThemeToggle from "../components/ThemeToggle";
import LanguageSwitcher from "../components/LanguageSwitcher";

import Breadcrumb from "../components/Breadcrumb";

function DashboardLayout() {
  return (
    <div
      className="
                min-h-dvh bg-background font-sans
                text-foreground transition-colors duration-300
                lg:grid
                lg:grid-cols-[280px_minmax(0,1fr)]
            "
    >
      <Sidebar />

      <div className="min-w-0">
        <header
          className="
                        sticky top-0 z-30
                        flex h-18 items-center
                        justify-between
                        border-b border-border
                        bg-card px-6 lg:px-8
                    "
        >
          <Breadcrumb />

          <div className="ml-auto flex items-center gap-3">
            <LanguageSwitcher />
            <button
              type="button"
              aria-label="Bildirimler"
              className="
                                flex h-10 w-10 cursor-pointer
                                items-center justify-center
                                rounded-xl border border-border
                                bg-card text-muted-foreground
                                transition-colors
                                hover:bg-muted
                                hover:text-foreground
                            "
            >
              <Bell size={19} aria-hidden="true" />
            </button>

            <ThemeToggle />
          </div>
        </header>

        <main
          className="
                        min-h-[calc(100dvh-72px)]
                        bg-background px-6 py-8
                        lg:px-10
                    "
        >
          <div
            className="
                            mx-auto w-full
                            max-w-360
                        "
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
