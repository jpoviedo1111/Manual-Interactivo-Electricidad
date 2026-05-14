import type { Question, OptionKey } from "@/types/content";

interface Props {
  num: number;
  question: Question;
  selected?: OptionKey;
  onSelect: (opt: OptionKey) => void;
  reveal: boolean;        // si true, marca correct/wrong
  locked: boolean;        // si true, deshabilita inputs
}

export function QuestionView({ num, question, selected, onSelect, reveal, locked }: Props) {
  return (
    <div className="mb-5">
      <p className="font-bold mb-2 text-sm">
        {num}. {question.prompt}
      </p>
      <div className="space-y-1">
        {question.options.map((opt) => {
          const isSelected = selected === opt.id;
          const isCorrect = opt.id === question.correct;
          let cls = "block px-3 py-2 rounded cursor-pointer text-sm transition";
          if (reveal && isCorrect) cls += " bg-marca-verde-cl text-marca-verde font-bold";
          else if (reveal && isSelected && !isCorrect) cls += " bg-marca-rojo-cl text-marca-rojo font-bold";
          else if (isSelected) cls += " bg-marca-azul-cl text-marca-azul font-bold";
          else cls += " bg-marca-gris-f hover:bg-marca-azul-cl";

          return (
            <label key={opt.id} className={cls}>
              <input
                type="radio"
                name={question.id}
                value={opt.id}
                checked={isSelected}
                onChange={() => onSelect(opt.id)}
                disabled={locked}
                className="mr-2 align-middle"
              />
              <span className="font-bold mr-1">{opt.id})</span>
              {opt.text}
            </label>
          );
        })}
      </div>
      {reveal && (
        <div className="mt-2 text-xs italic text-gray-700 px-3 py-2 bg-marca-azul-cl rounded">
          <strong>Explicación:</strong> {question.explanation}
        </div>
      )}
    </div>
  );
}
