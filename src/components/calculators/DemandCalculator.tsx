import { useState } from "react";
import { CalcCard, Field, CalcButton, Result } from "./OhmCalculator";
import { awgRecomendadoParaCorriente } from "@/data/awgTable";

export function DemandCalculator() {
  const [bocas, setBocas] = useState("");
  const [tcg, setTcg] = useState("");
  const [tce, setTce] = useState("");
  const [esp, setEsp] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function calc() {
    const nBocas = parseInt(bocas) || 0;
    const nTcg = parseInt(tcg) || 0;
    const nTce = parseInt(tce) || 0;
    const wEsp = parseFloat(esp) || 0;

    const ilum = nBocas * 125 * 0.66;
    const gtcg = nTcg * 2200;
    const gtce = nTce * 2750;
    const total = ilum + gtcg + gtce + wEsp;
    const I = total / 220;
    const awgRec = awgRecomendadoParaCorriente(I, true); // usar THW

    setResult(
      `Iluminación: <b>${ilum.toFixed(0)} VA</b> &nbsp;|&nbsp; ` +
      `Tomac. gral.: <b>${gtcg} VA</b> &nbsp;|&nbsp; ` +
      `Tomac. esp.: <b>${gtce} VA</b> &nbsp;|&nbsp; ` +
      `Especiales: <b>${wEsp.toFixed(0)} VA</b><br>` +
      `<span style="color:#1A237E">► DEMANDA TOTAL: <b>${total.toFixed(0)} VA</b> &nbsp;→&nbsp; ` +
      `I = <b>${I.toFixed(1)} A</b></span><br>` +
      `Conductor seccional recomendado: <b>AWG ${awgRec?.awg ?? "—"}</b> ` +
      `(${awgRec?.capTHW75 ?? "—"} A THW)`
    );
  }

  return (
    <CalcCard title="🏠 Cálculo de demanda AEA">
      <p className="text-xs text-gray-600 mb-2">
        Calcula la demanda total de una vivienda con el método AEA (factores Pirelli-SICA TP1).
      </p>
      <Field label="Bocas de luz" value={bocas} setValue={setBocas} placeholder="ej: 12" />
      <Field label="Circuitos de tomacorrientes generales" value={tcg} setValue={setTcg} placeholder="ej: 2" />
      <Field label="Circuitos de tomacorrientes especiales" value={tce} setValue={setTce} placeholder="ej: 1" />
      <Field label="Cargas especiales declaradas (W)" value={esp} setValue={setEsp} placeholder="ej: 4500 (ducha+AC)" />
      <CalcButton onClick={calc} label="Calcular demanda" />
      <Result text={result} />
    </CalcCard>
  );
}
