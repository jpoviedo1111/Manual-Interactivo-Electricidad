import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export function LoginScreen() {
  const { signInWithGoogle, signInWithEmail, registerWithEmail } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGoogle() {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      console.error("[Auth] Google sign-in error:", code, err);
      if (code === "auth/operation-not-allowed") {
        setError("Google Auth no está habilitada en Firebase Console. Actívala en Authentication → Sign-in method → Google.");
      } else if (code === "auth/unauthorized-domain") {
        setError("Este dominio no está autorizado en Firebase. Agrégalo en Authentication → Settings → Authorized domains.");
      } else if (code === "auth/cancelled-popup-request" || code === "auth/popup-closed-by-user") {
        setError("Cerraste la ventana de Google antes de completar el login.");
      } else {
        setError(`Error: ${code || "desconocido"}. Revisa la consola (F12) para más detalles.`);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "login") {
        await signInWithEmail(email, password);
      } else {
        await registerWithEmail(email, password);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("user-not-found") || msg.includes("wrong-password") || msg.includes("invalid-credential")) {
        setError("Email o contraseña incorrectos.");
      } else if (msg.includes("email-already-in-use")) {
        setError("Ese email ya está registrado. Inicia sesión.");
      } else if (msg.includes("weak-password")) {
        setError("La contraseña debe tener al menos 6 caracteres.");
      } else {
        setError("Ocurrió un error. Intenta de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-marca-azul to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 fade-in">
        {/* Logo */}
        <div className="text-center mb-6">
          <span className="text-6xl">⚡</span>
          <h1 className="text-2xl font-bold text-marca-azul mt-2">Manual Interactivo</h1>
          <p className="text-sm text-gray-500 mt-1">de Electricidad Domiciliaria</p>
        </div>

        <p className="text-center text-sm text-gray-600 mb-6">
          Inicia sesión para guardar tu progreso en la nube y acceder desde cualquier dispositivo.
        </p>

        {/* Google */}
        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 mb-4"
        >
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.6 2.4 30.2 0 24 0 14.8 0 6.9 5.4 3 13.3l7.8 6C12.7 13.3 17.9 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8C43.8 37.5 46.5 31.5 46.5 24.5z"/>
            <path fill="#FBBC05" d="M10.8 28.7A14.6 14.6 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7L2.5 13.3A23.8 23.8 0 0 0 0 24c0 3.8.9 7.4 2.5 10.6l8.3-5.9z"/>
            <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2 1.4-4.6 2.2-7.7 2.2-6.1 0-11.3-3.8-13.2-9.2l-8.3 5.9C6.9 42.6 14.8 48 24 48z"/>
          </svg>
          Continuar con Google
        </button>

        <div className="flex items-center gap-3 mb-4">
          <hr className="flex-1 border-gray-200" />
          <span className="text-xs text-gray-400">o con email</span>
          <hr className="flex-1 border-gray-200" />
        </div>

        {/* Email form */}
        <form onSubmit={handleEmailSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-marca-gris-l rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-marca-azul"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full border border-marca-gris-l rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-marca-azul"
          />

          {error && (
            <p className="text-xs text-marca-rojo bg-marca-rojo-cl rounded px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-marca-azul hover:bg-marca-azul-med text-white rounded-lg px-4 py-2.5 text-sm font-bold transition disabled:opacity-50"
          >
            {loading ? "Cargando…" : mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-4">
          {mode === "login" ? (
            <>¿No tienes cuenta?{" "}
              <button onClick={() => { setMode("register"); setError(""); }} className="text-marca-azul font-bold hover:underline">
                Regístrate
              </button>
            </>
          ) : (
            <>¿Ya tienes cuenta?{" "}
              <button onClick={() => { setMode("login"); setError(""); }} className="text-marca-azul font-bold hover:underline">
                Inicia sesión
              </button>
            </>
          )}
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-6 mt-6 pt-5 border-t border-gray-100 text-center">
          {[["7", "Módulos"], ["50+", "Lecciones"], ["155", "Preguntas"]].map(([n, l]) => (
            <div key={l}>
              <div className="text-lg font-bold text-marca-azul">{n}</div>
              <div className="text-xs text-gray-400">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
