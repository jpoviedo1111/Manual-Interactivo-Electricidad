import { Link } from "react-router-dom";
import { allModules } from "@/data/modules";
import { useProgress } from "@/contexts/ProgressContext";
import { ProgressBar } from "@/components/common/ProgressBar";
import { LockIcon, CheckIcon } from "@/components/common/LockIcon";

export function Home() {
  const {
    loading,
    getProgressPercent,
    isModuleUnlocked,
    quizPassed,
    isFinalExamUnlocked,
    finalExamPassed,
    finalExamLastScore,
    studentName,
    setStudentName,
    reset,
  } = useProgress();

  const percent = getProgressPercent();
  const finalUnlocked = isFinalExamUnlocked();

  return (
    <div className="space-y-6 fade-in">
      {/* Hero */}
      <section className="bg-gradient-to-br from-marca-azul to-indigo-700 text-white rounded-xl p-8 text-center shadow-card">
        <h2 className="text-2xl font-bold mb-2">¡Bienvenido al Manual Interactivo!</h2>
        <p className="opacity-90 leading-relaxed">
          Aprende electricidad domiciliaria paso a paso, con teoría, calculadoras y quiz de certificación.
          <br />
          Basado en la <strong>Guía Básica de Electricidad</strong> y el <strong>Manual Pirelli-SICA</strong>.
        </p>
        <div className="flex justify-center gap-8 mt-6 flex-wrap">
          <Stat n="7" l="Módulos" />
          <Stat n="50+" l="Lecciones" />
          <Stat n="6" l="Calculadoras" />
          <Stat n="155" l="Preguntas" />
          <Stat n="100" l="Páginas PDF" />
        </div>
      </section>

      {/* Tu nombre */}
      <section className="bg-white rounded-lg p-6 shadow-card">
        <h2 className="text-lg font-bold text-marca-azul mb-2">Tu nombre (para el certificado)</h2>
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Escribe tu nombre completo…"
          className="w-full border border-marca-gris-l rounded px-3 py-2 text-sm focus:outline-none focus:border-marca-azul"
        />
      </section>

      {/* Progreso global */}
      <section className="bg-white rounded-lg p-6 shadow-card">
        <h2 className="text-lg font-bold text-marca-azul mb-3">Tu progreso</h2>
        {loading ? (
          <div className="h-4 bg-marca-gris-f rounded animate-pulse" />
        ) : (
          <>
            <ProgressBar percent={percent} />
            <p className="text-sm text-gray-500 mt-2">
              {Object.keys(quizPassed).length} de 7 módulos aprobados ({percent}%)
              {finalExamPassed && (
                <span className="ml-3 inline-flex items-center gap-1 text-marca-verde font-bold">
                  <CheckIcon size={14} /> Certificado obtenido — {finalExamLastScore}%
                </span>
              )}
            </p>
          </>
        )}
      </section>

      {/* Módulos */}
      <section className="bg-white rounded-lg p-6 shadow-card">
        <h2 className="text-lg font-bold text-marca-azul mb-4">Módulos disponibles</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {allModules.map((m) => {
            const unlocked = isModuleUnlocked(m.id);
            const done = !!quizPassed[m.id];
            return (
              <Link
                key={m.id}
                to={unlocked ? `/modulo/${m.id}` : "#"}
                className={`block border rounded-lg p-4 transition ${
                  unlocked
                    ? "border-marca-azul-cl hover:bg-marca-azul-cl cursor-pointer"
                    : "border-marca-gris-l bg-marca-gris-f opacity-60 cursor-not-allowed"
                }`}
                onClick={(e) => !unlocked && e.preventDefault()}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{m.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-marca-azul">
                      Módulo {m.number}: {m.title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">{m.description}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {m.lessons.length} lecciones · {m.quiz.length} preguntas
                    </p>
                  </div>
                  {done ? (
                    <span className="text-marca-verde flex-shrink-0">
                      <CheckIcon size={20} />
                    </span>
                  ) : !unlocked ? (
                    <span className="text-marca-gris-l flex-shrink-0">
                      <LockIcon size={16} />
                    </span>
                  ) : null}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Examen final */}
      {finalUnlocked && (
        <section className="bg-gradient-to-r from-marca-naranja to-orange-700 text-white rounded-lg p-6 shadow-card text-center">
          <h2 className="text-xl font-bold mb-2">🎓 Examen Final Disponible</h2>
          <p className="opacity-90 mb-4">
            Has completado los 7 módulos. Aprueba con 90% para obtener tu certificado.
          </p>
          <Link
            to="/examen-final"
            className="inline-block bg-white text-marca-naranja px-6 py-2 rounded font-bold hover:bg-marca-gris-f transition"
          >
            Iniciar examen
          </Link>
        </section>
      )}

      {/* Reiniciar progreso */}
      <section className="text-right">
        <button
          onClick={() => {
            if (confirm("¿Estás seguro de que quieres reiniciar todo el progreso?")) {
              reset();
            }
          }}
          className="text-xs text-marca-rojo hover:underline"
        >
          Reiniciar progreso
        </button>
      </section>
    </div>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="text-3xl font-bold">{n}</div>
      <div className="text-xs opacity-80">{l}</div>
    </div>
  );
}
