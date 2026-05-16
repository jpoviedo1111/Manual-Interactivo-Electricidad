interface Props {
  body: string;
  title?: string;
}

export function FormulaBlock({ body, title }: Props) {
  return (
    <div className="my-4">
      {title && <p className="text-sm font-bold text-marca-azul mb-1">{title}</p>}
      <div className="bg-marca-azul-cl border-l-4 border-marca-azul px-5 py-3 rounded-r font-mono text-lg font-bold text-marca-azul overflow-x-auto">
        {body}
      </div>
    </div>
  );
}
