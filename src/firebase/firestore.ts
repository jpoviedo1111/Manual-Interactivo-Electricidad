import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./config";

export interface ProgressData {
  studentName: string;
  lessonsRead: Record<string, true>;
  quizAttempts: Record<string, number[]>;
  quizPassed: Record<string, true>;
  finalExamAttempts: number[];
  finalExamPassed: boolean;
  finalExamLastScore: number;
}

export const EMPTY_PROGRESS: ProgressData = {
  studentName: "",
  lessonsRead: {},
  quizAttempts: {},
  quizPassed: {},
  finalExamAttempts: [],
  finalExamPassed: false,
  finalExamLastScore: 0,
};

export async function getProgress(uid: string): Promise<ProgressData> {
  const ref = doc(db, "users", uid, "progress", "data");
  const snap = await getDoc(ref);
  if (!snap.exists()) return { ...EMPTY_PROGRESS };
  const data = snap.data();
  return {
    studentName: data.studentName ?? "",
    lessonsRead: data.lessonsRead ?? {},
    quizAttempts: data.quizAttempts ?? {},
    quizPassed: data.quizPassed ?? {},
    finalExamAttempts: data.finalExamAttempts ?? [],
    finalExamPassed: data.finalExamPassed ?? false,
    finalExamLastScore: data.finalExamLastScore ?? 0,
  };
}

export async function saveProgress(uid: string, data: ProgressData): Promise<void> {
  const ref = doc(db, "users", uid, "progress", "data");
  await setDoc(ref, { ...data, updatedAt: serverTimestamp() });
}
