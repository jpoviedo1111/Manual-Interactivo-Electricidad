import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-gradient-to-r from-marca-azul to-marca-azul-med text-white px-6 py-4 shadow-card flex items-center gap-4">
      <Link to="/" className="flex items-center gap-4 no-underline text-white flex-1 min-w-0">
        <span className="text-4xl">⚡</span>
        <div className="min-w-0">
          <h1 className="text-xl font-bold leading-tight">Manual Interactivo de Electricidad</h1>
          <p className="text-xs opacity-80 truncate">
            Desde cero hasta instalaciones domiciliarias autónomas · Guía Básica + Pirelli-SICA
          </p>
        </div>
      </Link>

      {user && (
        <div className="flex items-center gap-3 flex-shrink-0">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName ?? ""}
              className="w-9 h-9 rounded-full border-2 border-white/40"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold border-2 border-white/40">
              {(user.displayName ?? user.email ?? "?")[0].toUpperCase()}
            </div>
          )}
          <div className="hidden sm:block text-right">
            <p className="text-xs font-bold leading-tight truncate max-w-[140px]">
              {user.displayName ?? user.email}
            </p>
          </div>
          <button
            onClick={() => signOut()}
            className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded font-bold transition"
          >
            Salir
          </button>
        </div>
      )}
    </header>
  );
}
