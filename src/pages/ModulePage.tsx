import { Link, useParams, Navigate } from "react-router-dom";
import { getModule } from "@/data/modules";
import { useProgress } from "@/contexts/ProgressContext";
import { CheckIcon } from "@/components/common/LockIcon";

export function ModulePage() {
  const { id } = useParams();
  const module = id ? getModule(id) : undefined;
  const { loading, isModuleUnlocked, lessonsRead, quizPassed, quizAttempts } = useProgress();

  if (!module) return <Navigate to="/" />;
  if (!loading && !isModuleUnlocked(module.id)) return <Navigate to="/" />;

  const moduleDone = !!quizPassed[module.id];
  const attempts = quizAttempts[module.id] ?? [];
  const bestScore = attempts.length > 0 ? Math.max(...attempts) : 0;

  return (
    <div className="space-y-5 fade-in">
      <section className="bg-gradient-to-r from-marca-azul to-marca-azul-med text-white rounded-lg p-6 shadow-card">
        <p className="text-xs opacity-80 uppercase tracking-wider">Módulo {module.number}</p>
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <span className="text-3xl">{module.icon}</span>
          {module.title}
          {moduleDone && <CheckIcon size={26} className="text-marca-verde-cl" />}
        </h2>
        <p className="opacity-90 mt-2">{module.description}</p>
      </section>

      <section className="bg-white rounded-lg p-6 shadow-card">
        <h3 className="text-lg font-bold text-marca-azul mb-4">Lecciones del módulo</h3>
        <ol className="space-y-2">
          {module.lessons.map((lesson, i) => {
            const done = !!lessonsRead[lesson.id];
            return (
              <li key={lesson.id}>
                <Link
                  to={`/modulo/${module.id}/leccion/${lesson.id}`}
                  className="flex items-center gap-3 p-3 rounded border border-marca-gris-l hover:border-marca-azul hover:bg-marca-azul-cl transition group"
                >
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                      done ? "bg-marca-verde" : "bg-marca-azul"
                    }`}
                  >
                    {done ? <CheckIcon size={14} /> : i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-marca-negro group-hover:text-marca-azul">
                      Lección {i + 1}: {lesson.title}
                    </p>
                    <p className="text-xs text-gray-500">⏱ {lesson.estimatedMin} min de lectura</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="bg-white rounded-lg p-6 shadow-card">
        <h3 className="text-lg font-bold text-marca-azul mb-3">
          Quiz del módulo {module.number}
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          {module.quiz.length} preguntas · Requiere <strong>100%</strong> para aprobar y desbloquear el siguiente módulo.
        </p>
        {attempts.length > 0 && (
          <p className="text-xs text-gray-500 mb-3">
            Intentos: {attempts.length} · Mejor puntaje: {bestScore}%
          </p>
        )}
        <Link
          to={`/modulo/${module.id}/quiz`}
          className={`inline-block px-5 py-2 rounded font-bold text-white text-sm transition ${
            moduleDone ? "bg-marca-verde" : "bg-marca-naranja hover:bg-orange-700"
          }`}
        >
          {moduleDone ? "Repasar quiz (aprobado)" : "Iniciar quiz"}
        </Link>
      </section>

      <div className="text-center">
        <Link to="/" className="text-sm text-marca-azul hover:underline">
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
}
