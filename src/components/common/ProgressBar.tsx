interface Props {
  percent: number;
  height?: number;
  color?: string;
}

export function ProgressBar({ percent, height = 10, color = "#1B5E20" }: Props) {
  const p = Math.max(0, Math.min(100, percent));
  return (
    <div
      className="w-full rounded-full bg-marca-gris-l overflow-hidden"
      style={{ height }}
    >
      <div
        className="h-full rounded-full transition-all duration-300"
        style={{ width: `${p}%`, background: color }}
      />
    </div>
  );
}
