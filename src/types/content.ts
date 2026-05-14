export type Difficulty = "basico" | "intermedio" | "avanzado";

export type BlockKind =
  | "paragraph"   // texto normal (puede tener **negritas**)
  | "h2"          // subtítulo dentro de una lección
  | "h3"          // sub-subtítulo
  | "concept"     // recuadro "CONCEPTO CLAVE"
  | "critical"    // recuadro "CONFUSIÓN CRÍTICA"
  | "rule-aea"    // recuadro "REGLA AEA"
  | "formula"     // bloque de fórmula destacado
  | "example"     // ejemplo resuelto paso a paso
  | "table"       // tabla con headers + rows
  | "alert"       // ⚠️ advertencia (rojo)
  | "note"        // 💡 nota (verde)
  | "list"        // lista de bullets
  | "cite";       // cita / fuente bibliográfica

export interface ContentBlock {
  kind: BlockKind;
  title?: string;
  body?: string;
  rows?: string[][];
  headers?: string[];
  items?: string[];
}

export interface Lesson {
  id: string;             // 'm1-l3'
  title: string;
  blocks: ContentBlock[];
  estimatedMin: number;
}

export type OptionKey = "a" | "b" | "c" | "d";

export interface QuestionOption {
  id: OptionKey;
  text: string;
}

export interface Question {
  id: string;
  prompt: string;
  options: QuestionOption[];
  correct: OptionKey;
  explanation: string;
  difficulty: Difficulty;
}

export interface Module {
  id: string;             // 'm1'
  number: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
  quiz: Question[];
  requires?: string[];
}
