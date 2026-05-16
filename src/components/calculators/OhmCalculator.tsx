import { useState } from "react";

export function OhmCalculator() {
  const [v, setV] = useState("");
  const [i, setI] = useState("");
  const [r, setR] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function calc() {
    const V = parseFloat(v);
    const I = parseFloat(i);
    const R = parseFloat(r);
    const filled = [!isNaN(V), !isNaN(I), !isNaN(R)].filter(Boolean).length;
    if (filled !== 2) {
      setResult("⚠️ Ingresa exactamente 2 de los 3 valores.");
      return;
    }
    if (!isNaN(V) && !isNaN(I)) {
      setResult(`R = V/I = ${V}/${I} = ${(V / I).toFixed(3)} Ω · P = V×I = ${(V * I).toFixed(2)} W`);
    } else if (!isNaN(V) && !isNaN(R)) {
      setResult(`I = V/R = ${V}/${R} = ${(V / R).toFixed(3)} A · P = V²/R = ${((V * V) / R).toFixed(2)} W`);
    } else if (!isNaN(I) && !isNaN(R)) {
      setResult(`V = I×R = ${I}×${R} = ${(I * R).toFixed(3)} V · P = I²×R = ${(I * I * R).toFixed(2)} W`);
    }
  }

  return (
    <CalcCard title="⚡ Ley de Ohm">
      <Field label="Voltaje V (Voltios)" value={v} setValue={setV} placeholder="ej: 220" />
      <Field label="Corriente I (Amperios)" value={i} setValue={setI} placeholder="ej: 5" />
      <Field label="Resistencia R (Ohmios)" value={r} setValue={setR} placeholder="ej: 44" />
      <CalcButton onClick={calc} />
      <Result text={result} />
    </CalcCard>
  );
}

// ─── Componentes auxiliares compartidos ───

export function CalcCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-marca-gris-f border border-marca-gris-l rounded-lg p-5">
      <h3 className="text-base font-bold text-marca-azul mb-3">{title}</h3>
      {children}
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string;
  setValue: (v: string) => void;
  placeholder?: string;
  type?: string;
}

export function Field({ label, value, setValue, placeholder, type = "number" }: FieldProps) {
  return (
    <div className="mb-2">
      <label className="block text-xs font-bold text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        inputMode={type === "number" ? "decimal" : undefined}
        step="any"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-marca-gris-l rounded px-3 py-2.5 text-sm focus:outline-none focus:border-marca-azul bg-white min-h-[44px]"
      />
    </div>
  );
}

export function SelectField({
  label, value, setValue, options,
}: {
  label: string;
  value: string;
  setValue: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="mb-2">
      <label className="block text-xs font-bold text-gray-700 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full border border-marca-gris-l rounded px-2 py-1.5 text-sm focus:outline-none focus:border-marca-azul bg-white"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

export function CalcButton({ onClick, label = "Calcular" }: { onClick: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      className="bg-marca-azul hover:bg-marca-azul-med active:bg-marca-azul text-white px-4 py-3 rounded text-sm font-bold mt-2 transition w-full min-h-[48px]"
    >
      {label}
    </button>
  );
}

export function Result({ text }: { text: string | null }) {
  if (!text) return null;
  return (
    <div
      className="mt-3 px-3 py-2 bg-marca-azul-cl text-marca-azul rounded text-sm font-bold"
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}
