import { renderInline } from "@/utils/inlineFormat";

type Variant = "alert" | "note";

const STYLES: Record<Variant, { bg: string; border: string; text: string; emoji: string }> = {
  alert: { bg: "bg-marca-rojo-cl",  border: "border-marca-rojo",  text: "text-marca-rojo",  emoji: "⚠️" },
  note:  { bg: "bg-marca-verde-cl", border: "border-marca-verde", text: "text-marca-verde", emoji: "💡" },
};

interface Props {
  variant: Variant;
  body: string;
}

export function AlertBox({ variant, body }: Props) {
  const s = STYLES[variant];
  return (
    <div className={`${s.bg} border-l-4 ${s.border} ${s.text} px-4 py-3 my-3 rounded-r text-sm`}>
      <span className="mr-2">{s.emoji}</span>
      {renderInline(body)}
    </div>
  );
}
