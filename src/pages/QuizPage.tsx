import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import { getModule, allModules } from "@/data/modules";
import { useProgress } from "@/contexts/ProgressContext";
import { Quiz } from "@/components/quiz/Quiz";

export function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const module = id ? getModule(id) : undefined;
  const { loading, isModuleUnlocked, recordQuizAttempt, quizAttempts } = useProgress();
  const previousAttempts = quizAttempts[id ?? ""] ?? [];

  if (!module) return <Navigate to="/" />;
  if (!loading && !isModuleUnlocked(module.id)) return <Navigate to="/" />;

  function handleComplete(score: number, passed: boolean) {
    if (!module) return;
    recordQuizAttempt(module.id, score, passed);
    if (passed) {
      const nextModule = allModules[module.number]; // index = number → siguiente
      setTimeout(() => {
        if (nextModule) {
          if (confirm(`¡Felicitaciones! Has aprobado el Módulo ${module.number}. ¿Continuar al Módulo ${nextModule.number}?`)) {
            navigate(`/modulo/${nextModule.id}`);
          }
        }
      }, 600);
    }
  }

  return (
    <div className="space-y-4">
      <nav className="text-xs text-gray-500">
        <Link to="/" className="hover:underline">Inicio</Link>
        {" / "}
        <Link to={`/modulo/${module.id}`} className="hover:underline">
          Módulo {module.number}
        </Link>
        {" / "}
        <span className="text-marca-azul">Quiz</span>
      </nav>

      <Quiz
        title={`Quiz Módulo ${module.number} — ${module.title}`}
        questions={module.quiz}
        passingPercent={100}
        previousAttempts={previousAttempts.length}
        onComplete={handleComplete}
      />
    </div>
  );
}
