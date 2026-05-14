import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { onAuthStateChanged, getRedirectResult } from "firebase/auth";
import { auth } from "@/firebase/config";
import { signInWithGoogle, signInWithEmail, registerWithEmail, signOut } from "@/firebase/auth";

interface AuthContextValue {
  user: User | null;
  authLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // Manejar el resultado cuando Firebase redirige de vuelta a la app
    getRedirectResult(auth).catch((err) => {
      console.error("[Auth] Redirect result error:", err?.code, err);
    });

    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={{ user, authLoading, signInWithGoogle, signInWithEmail, registerWithEmail, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
