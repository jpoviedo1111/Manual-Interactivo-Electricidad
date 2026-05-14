import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProgressProvider } from "@/contexts/ProgressContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Layout } from "@/components/layout/Layout";
import { Home } from "@/pages/Home";
import { ModulePage } from "@/pages/ModulePage";
import { LessonPage } from "@/pages/LessonPage";
import { QuizPage } from "@/pages/QuizPage";
import { CalculatorsPage } from "@/pages/CalculatorsPage";
import { FinalExamPage } from "@/pages/FinalExamPage";

export default function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/modulo/:id" element={<ModulePage />} />
                <Route path="/modulo/:id/leccion/:lid" element={<LessonPage />} />
                <Route path="/modulo/:id/quiz" element={<QuizPage />} />
                <Route path="/calculadoras" element={<CalculatorsPage />} />
                <Route path="/examen-final" element={<FinalExamPage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ProgressProvider>
    </AuthProvider>
  );
}
