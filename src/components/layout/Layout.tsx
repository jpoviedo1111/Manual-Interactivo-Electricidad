import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function Layout() {
  return (
    <div className="h-full flex flex-col bg-[#ECEFF1]">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-7 max-w-5xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
