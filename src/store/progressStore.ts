import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProgressState {
  lessonsRead: Record<string, true>;
  quizAttempts: Record<string, number[]>;
  quizPassed: Record<string, true>;
  finalExamAttempts: number[];
  finalExamPassed: boolean;
  finalExamLastScore: number;
  studentName: string;

  // Acciones
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

const MODULE_ORDER = ["m1", "m2", "m3", "m4", "m5", "m6", "m7"];

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      lessonsRead: {},
      quizAttempts: {},
      quizPassed: {},
      finalExamAttempts: [],
      finalExamPassed: false,
      finalExamLastScore: 0,
      studentName: "",

      markLessonRead: (lessonId) =>
        set((state) => ({
          lessonsRead: { ...state.lessonsRead, [lessonId]: true },
        })),

      recordQuizAttempt: (moduleId, score, passed) =>
        set((state) => {
          const prev = state.quizAttempts[moduleId] ?? [];
          const newPassed = { ...state.quizPassed };
          if (passed) newPassed[moduleId] = true;
          return {
            quizAttempts: { ...state.quizAttempts, [moduleId]: [...prev, score] },
            quizPassed: newPassed,
          };
        }),

      recordFinalExam: (score, passed) =>
        set((state) => ({
          finalExamAttempts: [...state.finalExamAttempts, score],
          finalExamLastScore: score,
          finalExamPassed: passed || state.finalExamPassed,
        })),

      setStudentName: (name) => set({ studentName: name }),

      isModuleUnlocked: (moduleId) => {
        if (moduleId === "m1") return true;
        const idx = MODULE_ORDER.indexOf(moduleId);
        if (idx <= 0) return true;
        const prev = MODULE_ORDER[idx - 1];
        if (!prev) return true;
        return Boolean(get().quizPassed[prev]);
      },

      isCalculatorsUnlocked: () => {
        const p = get().quizPassed;
        return Boolean(p["m1"] && p["m2"] && p["m3"]);
      },

      isFinalExamUnlocked: () => {
        const p = get().quizPassed;
        return MODULE_ORDER.every((m) => p[m]);
      },

      getProgressPercent: () => {
        const passed = MODULE_ORDER.filter((m) => get().quizPassed[m]).length;
        return Math.round((passed / MODULE_ORDER.length) * 100);
      },

      reset: () =>
        set({
          lessonsRead: {},
          quizAttempts: {},
          quizPassed: {},
          finalExamAttempts: [],
          finalExamPassed: false,
          finalExamLastScore: 0,
          studentName: "",
        }),
    }),
    { name: "electricidad-app-progress-v1" }
  )
);
