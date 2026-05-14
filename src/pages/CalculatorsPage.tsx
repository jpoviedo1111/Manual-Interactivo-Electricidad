import { Navigate } from "react-router-dom";
import { useProgress } from "@/contexts/ProgressContext";
import { OhmCalculator } from "@/components/calculators/OhmCalculator";
import { PowerCalculator } from "@/components/calculators/PowerCalculator";
import { AwgCalculator } from "@/components/calculators/AwgCalculator";
import { DemandCalculator } from "@/components/calculators/DemandCalculator";
import { VoltageDropCalc } from "@/components/calculators/VoltageDropCalc";
import { UnitConverter } from "@/components/calculators/UnitConverter";

export function CalculatorsPage() {
  const { isCalculatorsUnlocked } = useProgress();
  const unlocked = isCalculatorsUnlocked();
  if (!unlocked) return <Navigate to="/" />;

  return (
    <div className="space-y-4 fade-in">
      <section className="bg-gradient-to-r from-marca-azul to-marca-azul-med text-white rounded-lg p-6 shadow-card">
        <h2 className="text-2xl font-bold">🛠 Calculadoras interactivas</h2>
        <p className="opacity-90 mt-1 text-sm">
          Seis herramientas de cálculo basadas en los métodos AEA y la Guía Básica de Electricidad.
        </p>
      </section>

      <div className="grid lg:grid-cols-2 gap-4">
        <OhmCalculator />
        <PowerCalculator />
        <AwgCalculator />
        <DemandCalculator />
        <VoltageDropCalc />
        <UnitConverter />
      </div>
    </div>
  );
}
