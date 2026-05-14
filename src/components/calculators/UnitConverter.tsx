import { useState } from "react";
import { CalcCard, Field, SelectField, CalcButton, Result } from "./OhmCalculator";

type ConversionKey =
  | "HP_W"      // HP → W
  | "W_HP"      // W → HP
  | "kW_W"      // kW → W
  | "W_kW"      // W → kW
  | "kWh_MJ"    // kWh → MJ
  | "VA_W"      // VA × cosφ → W
  | "A_mA"      // A → mA
  | "mA_A";     // mA → A

const CONVERSIONS: { key: ConversionKey; label: string; factor: number; needsFP?: boolean; unitIn: string; unitOut: string }[] = [
  { key: "HP_W",   label: "HP → Watts",    factor: 746,    unitIn: "HP",  unitOut: "W"  },
  { key: "W_HP",   label: "Watts → HP",    factor: 1/746,  unitIn: "W",   unitOut: "HP" },
  { key: "kW_W",   label: "kW → Watts",    factor: 1000,   unitIn: "kW",  unitOut: "W"  },
  { key: "W_kW",   label: "Watts → kW",    factor: 0.001,  unitIn: "W",   unitOut: "kW" },
  { key: "kWh_MJ", label: "kWh → MJ",      factor: 3.6,    unitIn: "kWh", unitOut: "MJ" },
  { key: "VA_W",   label: "VA → W (con FP)",factor: 1,     needsFP: true, unitIn: "VA",  unitOut: "W"  },
  { key: "A_mA",   label: "A → mA",        factor: 1000,   unitIn: "A",   unitOut: "mA" },
  { key: "mA_A",   label: "mA → A",        factor: 0.001,  unitIn: "mA",  unitOut: "A"  },
];

export function UnitConverter() {
  const [tipoIdx, setTipoIdx] = useState("0");
  const [valor, setValor] = useState("");
  const [fp, setFp] = useState("0.85");
  const [result, setResult] = useState<string | null>(null);

  const idx = parseInt(tipoIdx);
  const conv = CONVERSIONS[idx];

  function calc() {
    if (!conv) return;
    const v = parseFloat(valor);
    const f = parseFloat(fp);
    if (isNaN(v)) {
      setResult("⚠️ Ingresa un valor.");
      return;
    }
    let resultado: number;
    if (conv.needsFP) {
      if (isNaN(f) || f <= 0 || f > 1) {
        setResult("⚠️ Factor de potencia debe estar entre 0 y 1.");
        return;
      }
      resultado = v * f;
    } else {
      resultado = v * conv.factor;
    }
    setResult(
      `${v} ${conv.unitIn} = <b>${resultado.toFixed(4)} ${conv.unitOut}</b>`
    );
  }

  return (
    <CalcCard title="🔄 Conversor de unidades">
      <SelectField
        label="Tipo de conversión"
        value={tipoIdx}
        setValue={setTipoIdx}
        options={CONVERSIONS.map((c, i) => ({ value: i.toString(), label: c.label }))}
      />
      <Field label={`Valor (${conv?.unitIn ?? ""})`} value={valor} setValue={setValor} placeholder="ej: 2" />
      {conv?.needsFP && (
        <Field label="Factor de potencia cos(φ)" value={fp} setValue={setFp} placeholder="0.85" />
      )}
      <CalcButton onClick={calc} label="Convertir" />
      <Result text={result} />
      <p className="text-xs text-gray-500 mt-2 italic">
        Nota: 1 HP = 746 W (no 1.000 W). VA × cos(φ) = W (potencia activa).
      </p>
    </CalcCard>
  );
}
