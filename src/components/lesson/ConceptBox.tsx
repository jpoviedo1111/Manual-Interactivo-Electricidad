import { renderInline } from "@/utils/inlineFormat";

type Variant = "concept" | "critical" | "rule-aea";

const STYLES: Record<Variant, { bg: string; border: string; label: string; emoji: string }> = {
  concept:    { bg: "bg-marca-azul-cl",  border: "border-marca-azul",    label: "CONCEPTO CLAVE",      emoji: "💡" },
  critical:   { bg: "bg-marca-rojo-cl",  border: "border-marca-rojo",    label: "CONFUSIÓN CRÍTICA",   emoji: "⚠️" },
  "rule-aea": { bg: "bg-marca-verde-cl", border: "border-marca-verde",   label: "REGLA AEA",           emoji: "📐" },
};

interface Props {
  variant: Variant;
  title?: string;
  body?: string;
}

export function ConceptBox({ variant, title, body }: Props) {
  const s = STYLES[variant];
  return (
    <div className={`${s.bg} border-l-4 ${s.border} p-4 my-4 rounded-r`}>
      <div className="flex items-center gap-2 mb-2 text-sm font-bold text-marca-azul">
        <span>{s.emoji}</span>
        <span>{title ?? s.label}</span>
      </div>
      {body && <p className="text-sm leading-relaxed">{renderInline(body)}</p>}
    </div>
  );
}
