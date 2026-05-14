import { useState } from "react";
import type { Question, OptionKey } from "@/types/content";
import { QuestionView } from "./Question";
import { shouldRevealAnswers, getAttemptMessage } from "./RetryRules";

interface Props {
  title: string;
  questions: Question[];
  passingPercent: number;       // 100 para módulos, 90 para final
  previousAttempts: number;     // intentos previos (de la store)
  onComplete: (score: number, passed: boolean) => void;
}

export function Quiz({ title, questions, passingPercent, previousAttempts, onComplete }: Props) {
  const [answers, setAnswers] = useState<Record<string, OptionKey>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);
  const [thisAttemptNum, setThisAttemptNum] = useState(0);

  function handleSelect(qid: string, opt: OptionKey) {
    if (submitted) return;
    setAnswers((a) => ({ ...a, [qid]: opt }));
  }

  function handleSubmit() {
    const total = questions.length;
    const correct = questions.filter((q) => answers[q.id] === q.correct).length;
    const pct = Math.round((correct / total) * 100);
    const passedNow = pct >= passingPercent;
    const attemptN = previousAttempts + 1;
    setScore(pct);
    setPassed(passedNow);
    setThisAttemptNum(attemptN);
    setSubmitted(true);
    onComplete(pct, passedNow);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleRetry() {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setPassed(false);
    setThisAttemptNum(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const allAnswered = questions.every((q) => answers[q.id] != null);
  const reveal = submitted && shouldRevealAnswers(thisAttemptNum, passed);

  return (
    <div className="bg-white rounded-lg p-6 shadow-card fade-in">
      <h2 className="text-xl font-bold text-marca-azul mb-2">{title}</h2>
      <p className="text-sm text-gray-600 mb-1">
        {questions.length} preguntas · Requiere {passingPercent}% para aprobar
      </p>
      {previousAttempts > 0 && !submitted && (
        <p className="text-xs text-gray-500 mb-3">
          Intentos previos: {previousAttempts}
        </p>
      )}

      {submitted && (
        <ResultPanel
          score={score}
          passed={passed}
          passingPercent={passingPercent}
          attemptNumber={thisAttemptNum}
          onRetry={handleRetry}
        />
      )}

      <div className="mt-4">
        {questions.map((q, i) => (
          <QuestionView
            key={q.id}
            num={i + 1}
            question={q}
            selected={answers[q.id]}
            onSelect={(opt) => handleSelect(q.id, opt)}
            reveal={reveal}
            locked={submitted}
          />
        ))}
      </div>

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className={`mt-3 px-6 py-2 rounded font-bold text-white transition ${
            allAnswered
              ? "bg-marca-naranja hover:bg-orange-700 cursor-pointer"
              : "bg-marca-gris-l cursor-not-allowed"
          }`}
        >
          {allAnswered ? "Enviar respuestas" : `Responde todas (${Object.keys(answers).length}/${questions.length})`}
        </button>
      )}
    </div>
  );
}

interface ResultProps {
  score: number;
  passed: boolean;
  passingPercent: number;
  attemptNumber: number;
  onRetry: () => void;
}

function ResultPanel({ score, passed, passingPercent, attemptNumber, onRetry }: ResultProps) {
  const color = passed ? "text-marca-verde" : "text-marca-naranja";
  const bg    = passed ? "bg-marca-verde-cl" : "bg-marca-rojo-cl";
  return (
    <div className={`${bg} rounded-lg p-5 my-4 text-center border-l-4 ${passed ? "border-marca-verde" : "border-marca-naranja"}`}>
      <div className={`text-4xl font-bold ${color}`}>{score}%</div>
      <p className="mt-1 text-sm font-bold">
        {passed ? `✓ APROBADO — alcanzaste ${passingPercent}%` : `Necesitas ${passingPercent}% para aprobar`}
      </p>
      <p className="mt-2 text-xs">{getAttemptMessage(attemptNumber, passed)}</p>
      {!passed && (
        <button
          onClick={onRetry}
          className="mt-3 px-4 py-2 bg-marca-naranja hover:bg-orange-700 text-white rounded font-bold text-sm"
        >
          Reintentar quiz
        </button>
      )}
    </div>
  );
}
