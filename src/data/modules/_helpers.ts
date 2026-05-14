import type { ContentBlock, Question, OptionKey } from "@/types/content";

// Helpers para escribir contenido más conciso

export const p = (body: string): ContentBlock => ({ kind: "paragraph", body });
export const h2 = (body: string): ContentBlock => ({ kind: "h2", body });
export const h3 = (body: string): ContentBlock => ({ kind: "h3", body });
export const concept = (body: string, title?: string): ContentBlock => ({ kind: "concept", body, title });
export const critical = (body: string, title?: string): ContentBlock => ({ kind: "critical", body, title });
export const aea = (body: string, title?: string): ContentBlock => ({ kind: "rule-aea", body, title });
export const formula = (body: string, title?: string): ContentBlock => ({ kind: "formula", body, title });
export const example = (body: string, title?: string): ContentBlock => ({ kind: "example", body, title });
export const alert = (body: string): ContentBlock => ({ kind: "alert", body });
export const note = (body: string): ContentBlock => ({ kind: "note", body });
export const list = (items: string[]): ContentBlock => ({ kind: "list", items });
export const cite = (body: string): ContentBlock => ({ kind: "cite", body });
export const table = (headers: string[], rows: string[][], title?: string): ContentBlock => ({ kind: "table", headers, rows, title });

export function q(
  id: string,
  prompt: string,
  options: [string, string, string, string],
  correct: OptionKey,
  explanation: string,
  difficulty: "basico" | "intermedio" | "avanzado" = "basico"
): Question {
  return {
    id,
    prompt,
    options: [
      { id: "a", text: options[0] },
      { id: "b", text: options[1] },
      { id: "c", text: options[2] },
      { id: "d", text: options[3] },
    ],
    correct,
    explanation,
    difficulty,
  };
}
