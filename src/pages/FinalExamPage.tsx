import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useProgress } from "@/contexts/ProgressContext";
import { Quiz } from "@/components/quiz/Quiz";
import { FINAL_QUIZ } from "@/data/finalQuiz";
import { CertificateModal } from "@/components/common/CertificateModal";

export function FinalExamPage() {
  const { loading, isFinalExamUnlocked, recordFinalExam, finalExamAttempts, studentName } = useProgress();

  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateScore, setCertificateScore] = useState(0);

  if (!loading && !isFinalExamUnlocked()) return <Navigate to="/" />;

  function handleComplete(score: number, passed: boolean) {
    recordFinalExam(score, passed);
    if (passed) {
      setCertificateScore(score);
      setShowCertificate(true);
    }
  }

  return (
    <div className="space-y-4">
      <section className="bg-gradient-to-r from-marca-naranja to-orange-700 text-white rounded-lg p-6 shadow-card">
        <h2 className="text-2xl font-bold">🎓 Examen Final Certificable</h2>
        <p className="opacity-90 text-sm mt-1">
          50 preguntas integradoras · Requiere <strong>90%</strong> para certificación.
          Si apruebas, podrás descargar tu certificado en PDF.
        </p>
      </section>

      <Quiz
        title="Examen Final — Manual Interactivo de Electricidad"
        questions={FINAL_QUIZ}
        passingPercent={90}
        previousAttempts={finalExamAttempts.length}
        onComplete={handleComplete}
      />

      {showCertificate && (
        <CertificateModal
          studentName={studentName || "Estudiante"}
          score={certificateScore}
          date={new Date()}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  );
}
