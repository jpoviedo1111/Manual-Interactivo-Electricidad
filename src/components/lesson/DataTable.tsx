interface Props {
  headers: string[];
  rows: string[][];
  caption?: string;
}

export function DataTable({ headers, rows, caption }: Props) {
  return (
    <div className="my-4 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className="bg-marca-azul text-white px-3 py-2 font-bold text-center"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className={ri % 2 === 0 ? "bg-marca-gris-f" : "bg-white"}
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="border border-marca-gris-l px-3 py-2 text-center align-middle"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {caption && (
        <p className="text-xs text-gray-500 mt-1 italic">{caption}</p>
      )}
    </div>
  );
}
