import { NavLink, useLocation } from "react-router-dom";
import { allModules } from "@/data/modules";
import { useProgress } from "@/contexts/ProgressContext";
import { LockIcon, CheckIcon } from "@/components/common/LockIcon";

export function Sidebar() {
  const { pathname } = useLocation();
  const { isModuleUnlocked, isCalculatorsUnlocked, isFinalExamUnlocked, quizPassed, finalExamPassed } = useProgress();
  const isCalcUnlocked = isCalculatorsUnlocked();
  const isFinalUnlocked = isFinalExamUnlocked();

  return (
    <nav className="w-64 flex-shrink-0 bg-white border-r border-marca-gris-l overflow-y-auto py-4">
      <SectionTitle>Inicio</SectionTitle>
      <SidebarLink to="/" label="Bienvenida" active={pathname === "/"} icon="●" />

      <SectionTitle>Módulos</SectionTitle>
      {allModules.map((mod) => {
        const unlocked = isModuleUnlocked(mod.id);
        const done = !!quizPassed[mod.id];
        const active = pathname.startsWith(`/modulo/${mod.id}`);
        return (
          <SidebarLink
            key={mod.id}
            to={unlocked ? `/modulo/${mod.id}` : "#"}
            label={`${mod.number}. ${mod.title}`}
            active={active}
            disabled={!unlocked}
            done={done}
            icon={mod.number.toString()}
          />
        );
      })}

      <SectionTitle>Herramientas</SectionTitle>
      <SidebarLink
        to={isCalcUnlocked ? "/calculadoras" : "#"}
        label="Calculadoras"
        active={pathname === "/calculadoras"}
        disabled={!isCalcUnlocked}
        icon="⚙"
      />
      <SidebarLink
        to={isFinalUnlocked ? "/examen-final" : "#"}
        label="Examen Final"
        active={pathname === "/examen-final"}
        disabled={!isFinalUnlocked}
        done={finalExamPassed}
        icon="★"
      />
    </nav>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="px-5 pt-3 pb-1 text-[0.72rem] uppercase tracking-widest text-marca-gris-l font-bold">
      {children}
    </h3>
  );
}

interface LinkProps {
  to: string;
  label: string;
  icon: string;
  active?: boolean;
  disabled?: boolean;
  done?: boolean;
}

function SidebarLink({ to, label, icon, active, disabled, done }: LinkProps) {
  const baseCls = "flex items-center gap-3 w-full px-5 py-2.5 text-sm transition-colors";
  if (disabled) {
    return (
      <div className={`${baseCls} text-marca-gris-l cursor-not-allowed`}>
        <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-marca-gris-l text-white text-xs">
          <LockIcon size={11} />
        </span>
        <span className="truncate">{label}</span>
      </div>
    );
  }
  return (
    <NavLink
      to={to}
      className={`${baseCls} ${
        active
          ? "bg-marca-azul-cl text-marca-azul font-bold border-l-[3px] border-marca-azul"
          : "text-marca-negro hover:bg-marca-azul-cl"
      }`}
    >
      <span
        className={`inline-flex w-6 h-6 items-center justify-center rounded-full text-white text-xs font-bold ${
          done ? "bg-marca-verde" : "bg-marca-azul"
        }`}
      >
        {done ? <CheckIcon size={12} /> : icon}
      </span>
      <span className="truncate">{label}</span>
    </NavLink>
  );
}
