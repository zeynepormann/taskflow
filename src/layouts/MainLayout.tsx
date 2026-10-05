import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";

function MainLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div
      className="
                min-h-dvh bg-background font-sans
                text-foreground transition-colors duration-300
                lg:pl-68
            "
    >
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      <div className="min-w-0">
        <Header onOpenSidebar={() => setMobileSidebarOpen(true)} />

        <main
          className="
                        min-h-[calc(100dvh-72px)]
                        bg-background px-4 py-6 sm:px-6 lg:px-8 lg:py-8 xl:px-10
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

export default MainLayout;
