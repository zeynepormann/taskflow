import { Outlet } from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";


function MainLayout() {
  return (
    <div
      className="
                h-dvh bg-background font-sans
                text-foreground transition-colors duration-300
                lg:grid
                lg:grid-cols-[280px_minmax(0,1fr)]
            "
    >
      <Sidebar />

      <div className="min-w-0 min-h-0 overflow-y-auto">
        <Header/>

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

export default MainLayout;
