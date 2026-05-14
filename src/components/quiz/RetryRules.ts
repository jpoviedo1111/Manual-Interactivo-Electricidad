/**
 * Reglas de revelado de respuestas tras fallar un quiz:
 * - Intento 1: solo muestra puntaje (sin revelar)
 * - Intento 2: revela todas las correctas y erradas con explicación
 * - Intentos 3+: revelado inmediato
 */
export function shouldRevealAnswers(attemptNumber: number, passed: boolean): boolean {
  if (passed) return true;       // si pasó, siempre revela
  return attemptNumber >= 2;     // a partir del 2do intento fallido se revela
}

export function getAttemptMessage(attemptNumber: number, passed: boolean): string {
  if (passed) return "¡Felicitaciones! Has aprobado este quiz.";
  if (attemptNumber === 1) {
    return "Aún no llegas al 100%. Vuelve a las lecciones del módulo, repasa y vuelve a intentarlo.";
  }
  return "Las respuestas correctas se muestran en verde y las erradas en rojo. Estudia las explicaciones y vuelve a intentarlo.";
}
