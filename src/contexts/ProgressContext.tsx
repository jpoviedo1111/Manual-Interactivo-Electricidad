import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "./AuthContext";
import { EMPTY_PROGRESS, getProgress, saveProgress } from "@/firebase/firestore";
import type { ProgressData } from "@/firebase/firestore";

const MODULE_ORDER = ["m1", "m2", "m3", "m4", "m5", "m6", "m7"];
const LOCAL_STORAGE_KEY = "electricidad-app-progress-v1";

function readLocalProgress(): ProgressData | null {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const s = parsed?.state;
    if (!s || Object.keys(s.quizPassed ?? {}).length === 0) return null;
    return {
      studentName: s.studentName ?? "",
      lessonsRead: s.lessonsRead ?? {},
      quizAttempts: s.quizAttempts ?? {},
      quizPassed: s.quizPassed ?? {},
      finalExamAttempts: s.finalExamAttempts ?? [],
      finalExamPassed: s.finalExamPassed ?? false,
      finalExamLastScore: s.finalExamLastScore ?? 0,
    };
  } catch {
    return null;
  }
}

interface ProgressContextValue extends ProgressData {
  loading: boolean;
  markLessonRead: (lessonId: string) => void;
  recordQuizAttempt: (moduleId: string, score: number, passed: boolean) => void;
  recordFinalExam: (score: number, passed: boolean) => void;
  setStudentName: (name: string) => void;
  isModuleUnlocked: (moduleId: string) => boolean;
  isCalculatorsUnlocked: () => boolean;
  isFinalExamUnlocked: () => boolean;
  getProgressPercent: () => number;
  reset: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState<ProgressData>({ ...EMPTY_PROGRESS });
  const [loading, setLoading] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!user) {
      setProgress({ ...EMPTY_PROGRESS });
      setLoading(false);
      return;
    }

    setLoading(true);
    getProgress(user.uid).then((data) => {
      // Pre-rellenar nombre desde Google si es nuevo usuario
      if (!data.studentName && user.displayName) {
        data.studentName = user.displayName;
      }

      // Ofrecer migración desde localStorage si no hay progreso en la nube
      const hasCloudProgress = Object.keys(data.quizPassed).length > 0;
      if (!hasCloudProgress) {
        const local = readLocalProgress();
        if (local && window.confirm("Tienes progreso guardado localmente. ¿Deseas migrarlo a tu cuenta en la nube?")) {
          if (!local.studentName && user.displayName) local.studentName = user.displayName;
          setProgress(local);
          saveProgress(user.uid, local);
          localStorage.removeItem(LOCAL_STORAGE_KEY);
          setLoading(false);
          return;
        }
      }

      setProgress(data);
      setLoading(false);
    });
  }, [user]);

  const persist = useCallback((data: ProgressData) => {
    if (!user) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => saveProgress(user.uid, data), 500);
  }, [user]);

  const update = useCallback((fn: (p: ProgressData) => ProgressData) => {
    setProgress((prev) => {
      const next = fn(prev);
      persist(next);
      return next;
    });
  }, [persist]);

  const markLessonRead = useCallback((lessonId: string) => {
    update((p) => ({ ...p, lessonsRead: { ...p.lessonsRead, [lessonId]: true } }));
  }, [update]);

  const recordQuizAttempt = useCallback((moduleId: string, score: number, passed: boolean) => {
    update((p) => {
      const prev = p.quizAttempts[moduleId] ?? [];
      const newPassed = passed ? { ...p.quizPassed, [moduleId]: true as const } : p.quizPassed;
      return { ...p, quizAttempts: { ...p.quizAttempts, [moduleId]: [...prev, score] }, quizPassed: newPassed };
    });
  }, [update]);

  const recordFinalExam = useCallback((score: number, passed: boolean) => {
    update((p) => ({
      ...p,
      finalExamAttempts: [...p.finalExamAttempts, score],
      finalExamLastScore: score,
      finalExamPassed: passed || p.finalExamPassed,
    }));
  }, [update]);

  const setStudentName = useCallback((name: string) => {
    update((p) => ({ ...p, studentName: name }));
  }, [update]);

  const reset = useCallback(() => {
    update(() => ({ ...EMPTY_PROGRESS }));
  }, [update]);

  const isModuleUnlocked = useCallback((moduleId: string): boolean => {
    if (moduleId === "m1") return true;
    const idx = MODULE_ORDER.indexOf(moduleId);
    if (idx <= 0) return true;
    const prev = MODULE_ORDER[idx - 1];
    return Boolean(progress.quizPassed[prev]);
  }, [progress.quizPassed]);

  const isCalculatorsUnlocked = useCallback((): boolean => {
    return Boolean(progress.quizPassed["m1"] && progress.quizPassed["m2"] && progress.quizPassed["m3"]);
  }, [progress.quizPassed]);

  const isFinalExamUnlocked = useCallback((): boolean => {
    return MODULE_ORDER.every((m) => Boolean(progress.quizPassed[m]));
  }, [progress.quizPassed]);

  const getProgressPercent = useCallback((): number => {
    const count = MODULE_ORDER.filter((m) => Boolean(progress.quizPassed[m])).length;
    return Math.round((count / MODULE_ORDER.length) * 100);
  }, [progress.quizPassed]);

  return (
    <ProgressContext.Provider value={{
      ...progress,
      loading,
      markLessonRead,
      recordQuizAttempt,
      recordFinalExam,
      setStudentName,
      isModuleUnlocked,
      isCalculatorsUnlocked,
      isFinalExamUnlocked,
      getProgressPercent,
      reset,
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress debe usarse dentro de ProgressProvider");
  return ctx;
}
