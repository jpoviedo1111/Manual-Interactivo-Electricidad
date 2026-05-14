import { Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LoginScreen } from "./LoginScreen";

export function ProtectedRoute() {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-marca-azul to-indigo-900">
        <div className="text-white text-center">
          <div className="text-5xl mb-4 animate-pulse">⚡</div>
          <p className="text-sm opacity-80">Cargando…</p>
        </div>
      </div>
    );
  }

  if (!user) return <LoginScreen />;

  return <Outlet />;
}
