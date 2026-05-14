import type { Lesson, ContentBlock } from "@/types/content";
import { renderInline } from "@/utils/inlineFormat";
import { ConceptBox } from "./ConceptBox";
import { DataTable } from "./DataTable";
import { FormulaBlock } from "./FormulaBlock";
import { ExampleBlock } from "./ExampleBlock";
import { AlertBox } from "./AlertBox";

interface Props {
  lesson: Lesson;
}

export function LessonView({ lesson }: Props) {
  return (
    <article className="prose-sm max-w-none fade-in">
      <h2 className="text-2xl font-bold text-marca-azul mb-2">{lesson.title}</h2>
      <p className="text-xs text-gray-500 mb-4">
        ⏱ Tiempo estimado de lectura: {lesson.estimatedMin} min
      </p>
      <div className="space-y-2">
        {lesson.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
    </article>
  );
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.kind) {
    case "paragraph":
      return (
        <p className="text-base leading-relaxed text-gray-800">
          {renderInline(block.body ?? "")}
        </p>
      );
    case "h2":
      return (
        <h3 className="text-xl font-bold text-marca-azul mt-6 mb-2">
          {block.body}
        </h3>
      );
    case "h3":
      return (
        <h4 className="text-base font-bold text-marca-azul-med mt-4 mb-1">
          {block.body}
        </h4>
      );
    case "concept":
      return <ConceptBox variant="concept" title={block.title} body={block.body} />;
    case "critical":
      return <ConceptBox variant="critical" title={block.title} body={block.body} />;
    case "rule-aea":
      return <ConceptBox variant="rule-aea" title={block.title} body={block.body} />;
    case "formula":
      return <FormulaBlock title={block.title} body={block.body ?? ""} />;
    case "example":
      return <ExampleBlock title={block.title} body={block.body ?? ""} />;
    case "alert":
      return <AlertBox variant="alert" body={block.body ?? ""} />;
    case "note":
      return <AlertBox variant="note" body={block.body ?? ""} />;
    case "table":
      return (
        <DataTable
          headers={block.headers ?? []}
          rows={block.rows ?? []}
          caption={block.title}
        />
      );
    case "list":
      return (
        <ul className="list-disc pl-6 space-y-1 text-base text-gray-800">
          {(block.items ?? []).map((it, i) => (
            <li key={i}>{renderInline(it)}</li>
          ))}
        </ul>
      );
    case "cite":
      return (
        <p className="text-xs italic text-gray-500 mt-2">
          {renderInline(block.body ?? "")}
        </p>
      );
    default:
      return null;
  }
}
