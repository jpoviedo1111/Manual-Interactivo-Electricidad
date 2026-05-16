import { useEffect } from "react";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import { getModule, getLesson } from "@/data/modules";
import { useProgress } from "@/contexts/ProgressContext";
import { LessonView } from "@/components/lesson/LessonView";

export function LessonPage() {
  const { id, lid } = useParams();
  const navigate = useNavigate();
  const module = id ? getModule(id) : undefined;
  const lesson = id && lid ? getLesson(id, lid) : undefined;
  const { loading, isModuleUnlocked, markLessonRead } = useProgress();

  useEffect(() => {
    if (lesson) markLessonRead(lesson.id);
  }, [lesson, markLessonRead]);

  if (!module || !lesson) return <Navigate to="/" />;
  if (!loading && !isModuleUnlocked(module.id)) return <Navigate to="/" />;

  const idx = module.lessons.findIndex((l) => l.id === lesson.id);
  const next = module.lessons[idx + 1];
  const prev = module.lessons[idx - 1];

  return (
    <div className="space-y-4">
      <nav className="text-xs text-gray-500">
        <Link to="/" className="hover:underline">Inicio</Link>
        {" / "}
        <Link to={`/modulo/${module.id}`} className="hover:underline">
          Módulo {module.number}: {module.title}
        </Link>
        {" / "}
        <span className="text-marca-azul">Lección {idx + 1}</span>
      </nav>

      <article className="bg-white rounded-lg p-7 shadow-card">
        <LessonView lesson={lesson} />
      </article>

      <div className="flex items-center justify-between gap-3 sticky bottom-0 bg-[#ECEFF1] py-3 -mx-4 px-4 lg:mx-0 lg:px-0 lg:static lg:bg-transparent lg:py-0">
        {prev ? (
          <button
            onClick={() => navigate(`/modulo/${module.id}/leccion/${prev.id}`)}
            className="px-4 py-2 bg-marca-gris-l text-white rounded text-sm font-bold hover:bg-gray-500"
          >
            ← {prev.title.slice(0, 30)}{prev.title.length > 30 ? "…" : ""}
          </button>
        ) : (
          <Link
            to={`/modulo/${module.id}`}
            className="px-4 py-2 bg-marca-gris-l text-white rounded text-sm font-bold hover:bg-gray-500"
          >
            ← Volver al módulo
          </Link>
        )}

        {next ? (
          <button
            onClick={() => navigate(`/modulo/${module.id}/leccion/${next.id}`)}
            className="px-4 py-2 bg-marca-azul text-white rounded text-sm font-bold hover:bg-marca-azul-med"
          >
            Siguiente: {next.title.slice(0, 30)}{next.title.length > 30 ? "…" : ""} →
          </button>
        ) : (
          <Link
            to={`/modulo/${module.id}/quiz`}
            className="px-4 py-2 bg-marca-naranja text-white rounded text-sm font-bold hover:bg-orange-700"
          >
            Ir al quiz del módulo →
          </Link>
        )}
      </div>
    </div>
  );
}
