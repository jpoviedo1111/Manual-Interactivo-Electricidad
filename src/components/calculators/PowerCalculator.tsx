import { useState } from "react";
import { CalcCard, Field, CalcButton, Result } from "./OhmCalculator";

export function PowerCalculator() {
  const [p, setP] = useState("");
  const [h, setH] = useState("");
  const [v, setV] = useState("220");
  const [precio, setPrecio] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function calc() {
    const P = parseFloat(p);
    const H = parseFloat(h);
    const V = parseFloat(v) || 220;
    const Pr = parseFloat(precio);
    if (isNaN(P) || isNaN(H)) {
      setResult("⚠️ Completa potencia y horas/día.");
      return;
    }
    const I = P / V;
    const kwhDia = (P * H) / 1000;
    const kwhMes = kwhDia * 30;
    let txt =
      `Corriente: <b>${I.toFixed(2)} A</b> &nbsp;|&nbsp; ` +
      `kWh/día: <b>${kwhDia.toFixed(3)}</b> &nbsp;|&nbsp; ` +
      `kWh/mes: <b>${kwhMes.toFixed(1)}</b>`;
    if (!isNaN(Pr) && Pr > 0) {
      txt += ` &nbsp;|&nbsp; Costo/mes: <b>$${(kwhMes * Pr).toFixed(2)}</b>`;
    }
    setResult(txt);
  }

  return (
    <CalcCard title="💡 Potencia, Energía y Costo">
      <Field label="Potencia (W)" value={p} setValue={setP} placeholder="ej: 1500" />
      <Field label="Horas de uso/día" value={h} setValue={setH} placeholder="ej: 4" />
      <Field label="Voltaje (V)" value={v} setValue={setV} placeholder="220" />
      <Field label="Precio del kWh ($, opcional)" value={precio} setValue={setPrecio} placeholder="ej: 0.15" />
      <CalcButton onClick={calc} />
      <Result text={result} />
    </CalcCard>
  );
}
