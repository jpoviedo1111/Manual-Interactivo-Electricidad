import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { MobileTabBar } from "./MobileTabBar";

export function Layout() {
  const { pathname } = useLocation();
  // Hide tab bar during lesson/quiz to maximize reading space
  const isFullScreen = pathname.includes("/leccion/") || pathname.includes("/quiz") || pathname === "/examen-final";

  return (
    <div className="h-full flex flex-col bg-[#ECEFF1]">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar — hidden on mobile */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        {/* Main content — extra bottom padding on mobile for tab bar */}
        <main className={`flex-1 overflow-y-auto p-4 lg:p-7 max-w-5xl ${isFullScreen ? "" : "pb-20 lg:pb-7"}`}>
          <Outlet />
        </main>
      </div>
      {/* Mobile bottom navigation */}
      {!isFullScreen && <MobileTabBar />}
    </div>
  );
}
