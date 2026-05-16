import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useProgress } from "@/contexts/ProgressContext";
import { allModules } from "@/data/modules";
import { LockIcon, CheckIcon } from "@/components/common/LockIcon";

export function MobileTabBar() {
  const { pathname } = useLocation();
  const [modulesOpen, setModulesOpen] = useState(false);

  const isHome = pathname === "/";
  const isModulo = pathname.startsWith("/modulo");
  const isCalc = pathname === "/calculadoras";
  const isExamen = pathname === "/examen-final";

  return (
    <>
      {/* Bottom tab bar */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-marca-azul border-t border-white/10"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex h-16">
          <TabItem
            label="Inicio"
            active={isHome}
            onClick={() => setModulesOpen(false)}
            to="/"
            icon={<HomeIcon />}
          />
          <button
            onClick={() => setModulesOpen((o) => !o)}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors ${
              isModulo || modulesOpen ? "text-marca-naranja" : "text-white/60"
            }`}
          >
            <BookIcon />
            <span className="text-[10px] font-medium leading-none">Módulos</span>
          </button>
          <TabItem
            label="Herramientas"
            active={isCalc || isExamen}
            onClick={() => setModulesOpen(false)}
            to="/calculadoras"
            icon={<CalcIcon />}
          />
          <ProgressTab isActive={false} onClick={() => setModulesOpen(false)} />
        </div>
      </nav>

      {/* Modules bottom sheet */}
      {modulesOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/40"
            onClick={() => setModulesOpen(false)}
          />
          <ModulesSheet onClose={() => setModulesOpen(false)} />
        </>
      )}
    </>
  );
}

interface TabItemProps {
  label: string;
  active: boolean;
  to: string;
  icon: React.ReactNode;
  onClick: () => void;
}

function TabItem({ label, active, to, icon, onClick }: TabItemProps) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors ${
        active ? "text-marca-naranja" : "text-white/60"
      }`}
    >
      {icon}
      <span className="text-[10px] font-medium leading-none">{label}</span>
    </NavLink>
  );
}

function ProgressTab({ isActive, onClick }: { isActive: boolean; onClick: () => void }) {
  const { getProgressPercent, finalExamPassed } = useProgress();
  const percent = getProgressPercent();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        onClick();
        navigate("/");
      }}
      className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors ${
        isActive ? "text-marca-naranja" : "text-white/60"
      }`}
    >
      {finalExamPassed ? <TrophyIcon /> : (
        <div className="relative w-6 h-6 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.3" />
            <circle
              cx="12" cy="12" r="10"
              stroke="currentColor" strokeWidth="2"
              strokeDasharray={`${(percent / 100) * 62.8} 62.8`}
              strokeLinecap="round"
              transform="rotate(-90 12 12)"
            />
          </svg>
          <span className="absolute text-[8px] font-bold leading-none">{percent}%</span>
        </div>
      )}
      <span className="text-[10px] font-medium leading-none">Progreso</span>
    </button>
  );
}

function ModulesSheet({ onClose }: { onClose: () => void }) {
  const { isModuleUnlocked, quizPassed, isCalculatorsUnlocked, isFinalExamUnlocked, finalExamPassed } = useProgress();
  const navigate = useNavigate();
  const isCalcUnlocked = isCalculatorsUnlocked();
  const isFinalUnlocked = isFinalExamUnlocked();

  function go(path: string) {
    navigate(path);
    onClose();
  }

  return (
    <div className="lg:hidden fixed bottom-16 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-card max-h-[70vh] overflow-y-auto"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="sticky top-0 bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <span className="text-sm font-bold text-marca-azul">Módulos del curso</span>
        <button onClick={onClose} className="text-marca-gris-l p-1">
          <CloseIcon />
        </button>
      </div>
      <ul className="py-2">
        {allModules.map((mod) => {
          const unlocked = isModuleUnlocked(mod.id);
          const done = !!quizPassed[mod.id];
          return (
            <li key={mod.id}>
              <button
                disabled={!unlocked}
                onClick={() => go(`/modulo/${mod.id}`)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  unlocked
                    ? "text-marca-negro active:bg-marca-azul-cl"
                    : "text-marca-gris-l cursor-not-allowed"
                }`}
              >
                <span
                  className={`inline-flex w-7 h-7 items-center justify-center rounded-full text-white text-xs font-bold flex-shrink-0 ${
                    done ? "bg-marca-verde" : unlocked ? "bg-marca-azul" : "bg-marca-gris-l"
                  }`}
                >
                  {!unlocked ? <LockIcon size={12} /> : done ? <CheckIcon size={13} /> : mod.number}
                </span>
                <span className="text-sm">{mod.number}. {mod.title}</span>
              </button>
            </li>
          );
        })}

        <li className="border-t border-gray-100 mt-1 pt-1">
          <button
            disabled={!isCalcUnlocked}
            onClick={() => go("/calculadoras")}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
              isCalcUnlocked ? "text-marca-negro active:bg-marca-azul-cl" : "text-marca-gris-l cursor-not-allowed"
            }`}
          >
            <span className={`inline-flex w-7 h-7 items-center justify-center rounded-full text-white text-xs font-bold flex-shrink-0 ${isCalcUnlocked ? "bg-marca-azul" : "bg-marca-gris-l"}`}>
              {isCalcUnlocked ? "⚙" : <LockIcon size={12} />}
            </span>
            <span className="text-sm">Calculadoras</span>
          </button>
        </li>
        <li>
          <button
            disabled={!isFinalUnlocked}
            onClick={() => go("/examen-final")}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
              isFinalUnlocked ? "text-marca-negro active:bg-marca-azul-cl" : "text-marca-gris-l cursor-not-allowed"
            }`}
          >
            <span className={`inline-flex w-7 h-7 items-center justify-center rounded-full text-white text-xs font-bold flex-shrink-0 ${
              finalExamPassed ? "bg-marca-verde" : isFinalUnlocked ? "bg-marca-naranja" : "bg-marca-gris-l"
            }`}>
              {!isFinalUnlocked ? <LockIcon size={12} /> : finalExamPassed ? <CheckIcon size={13} /> : "★"}
            </span>
            <span className="text-sm">Examen Final</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 14H8v-2h8v2zm0-4H8v-2h8v2zm0-4H8V6h8v2z" />
    </svg>
  );
}

function CalcIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zm-2 3c0 1.65-1.35 3-3 3s-3-1.35-3-3V5h6v3z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );
}
