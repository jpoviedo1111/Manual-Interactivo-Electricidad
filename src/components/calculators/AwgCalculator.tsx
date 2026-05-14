import { useState } from "react";
import { CalcCard, Field } from "./OhmCalculator";
import { AWG_TABLE } from "@/data/awgTable";

export function AwgCalculator() {
  const [I, setI] = useState("");

  const corriente = parseFloat(I);
  const valid = !isNaN(corriente) && corriente > 0;

  return (
    <CalcCard title="📏 Selector de calibre AWG">
      <p className="text-xs text-gray-600 mb-2">
        Ingresa la corriente del circuito. Verás qué calibres son adecuados (verde), justos (amarillo) o insuficientes (rojo).
      </p>
      <Field label="Corriente del circuito (A)" value={I} setValue={setI} placeholder="ej: 15" />

      {valid && (
        <div className="grid grid-cols-3 gap-2 mt-3">
          {AWG_TABLE.map((a) => {
            const cap = a.capTW60;
            let cls: string;
            let lbl: string;
            if (cap >= corriente * 1.25) {
              cls = "bg-marca-verde-cl text-marca-verde border-marca-verde";
              lbl = "✓ Adecuado";
            } else if (cap >= corriente) {
              cls = "bg-yellow-100 text-yellow-700 border-yellow-400";
              lbl = "⚠ Justo";
            } else {
              cls = "bg-marca-rojo-cl text-marca-rojo border-marca-rojo";
              lbl = "✗ Insuficiente";
            }
            return (
              <div key={a.awg} className={`text-center p-2 rounded border ${cls}`}>
                <div className="font-bold text-sm">AWG {a.awg}</div>
                <div className="text-xs mt-0.5">{cap} A · {lbl}</div>
              </div>
            );
          })}
        </div>
      )}

      {valid && (
        <p className="text-xs text-gray-600 mt-3">
          <strong>Regla AEA:</strong> la térmica nunca debe superar la capacidad admisible del conductor.
          Margen recomendado: 25% (verde).
        </p>
      )}
    </CalcCard>
  );
}
