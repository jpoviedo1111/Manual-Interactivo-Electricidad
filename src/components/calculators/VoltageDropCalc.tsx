import { useState } from "react";
import { CalcCard, Field, SelectField, CalcButton, Result } from "./OhmCalculator";
import { AWG_TABLE } from "@/data/awgTable";

const RHO_CU = 0.0172; // Ω·mm²/m a 20°C

export function VoltageDropCalc() {
  const [I, setI] = useState("");
  const [L, setL] = useState("");
  const [v, setV] = useState("220");
  const [awgIdx, setAwgIdx] = useState("3"); // AWG 14 por defecto
  const [tipoCircuito, setTipoCircuito] = useState("derivado"); // derivado o seccional
  const [result, setResult] = useState<string | null>(null);

  function calc() {
    const Ia = parseFloat(I);
    const La = parseFloat(L);
    const Va = parseFloat(v) || 220;
    if (isNaN(Ia) || isNaN(La)) {
      setResult("⚠️ Completa corriente y longitud.");
      return;
    }
    const seleccionado = AWG_TABLE[parseInt(awgIdx)];
    if (!seleccionado) return;
    const sec = seleccionado.seccionMm2;
    const dV = (2 * Ia * La * RHO_CU) / sec;
    const pct = (dV / Va) * 100;
    const limite = tipoCircuito === "seccional" ? 1 : 3;
    const ok = pct <= limite;
    setResult(
      `ΔV = 2 × I × L × ρ / sección = 2 × ${Ia} × ${La} × ${RHO_CU} / ${sec} = <b>${dV.toFixed(2)} V</b><br>` +
      `Caída porcentual: <b>${pct.toFixed(2)}%</b> (límite AEA ${tipoCircuito}: ${limite}%)<br>` +
      (ok
        ? `<span style="color:#1B5E20">✅ Dentro del límite AEA.</span>`
        : `<span style="color:#B71C1C">⚠️ Excede el ${limite}%. Usar conductor más grueso o reducir longitud.</span>`)
    );
  }

  return (
    <CalcCard title="📐 Caída de tensión">
      <p className="text-xs text-gray-600 mb-2">
        Calcula la caída de tensión en un conductor de cobre. AEA permite hasta 3% en derivados y 1% en seccional.
      </p>
      <Field label="Corriente (A)" value={I} setValue={setI} placeholder="ej: 15" />
      <Field label="Longitud del tramo (m)" value={L} setValue={setL} placeholder="ej: 20" />
      <Field label="Voltaje nominal (V)" value={v} setValue={setV} placeholder="220" />
      <SelectField
        label="Calibre del conductor"
        value={awgIdx}
        setValue={setAwgIdx}
        options={AWG_TABLE.map((a, i) => ({
          value: i.toString(),
          label: `AWG ${a.awg} — ${a.seccionMm2} mm² (${a.capTW60}A TW)`,
        }))}
      />
      <SelectField
        label="Tipo de circuito"
        value={tipoCircuito}
        setValue={setTipoCircuito}
        options={[
          { value: "derivado", label: "Circuito derivado (límite 3%)" },
          { value: "seccional", label: "Circuito seccional (límite 1%)" },
        ]}
      />
      <CalcButton onClick={calc} />
      <Result text={result} />
    </CalcCard>
  );
}
