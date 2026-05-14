import { renderInline } from "@/utils/inlineFormat";

interface Props {
  title?: string;
  body: string;
}

export function ExampleBlock({ title, body }: Props) {
  // El body usa \n para separar líneas
  const lines = body.split("\n").filter((l) => l.trim() !== "");
  return (
    <div className="my-4 bg-marca-gris-f border border-marca-gris-l rounded-lg p-4">
      <p className="text-sm font-bold text-marca-azul-med mb-2">
        📘 {title ?? "Ejemplo resuelto"}
      </p>
      <div className="space-y-1 font-mono text-sm text-marca-negro">
        {lines.map((line, i) => (
          <div key={i} className={line.startsWith("→") ? "text-marca-verde font-bold" : ""}>
            {renderInline(line)}
          </div>
        ))}
      </div>
    </div>
  );
}
