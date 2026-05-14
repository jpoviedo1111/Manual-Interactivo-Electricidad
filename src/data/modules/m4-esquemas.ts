import type { Module, Lesson } from "@/types/content";
import { p, h2, concept, formula, alert, note, list, table, cite, q } from "./_helpers";

// Helper para crear las lecciones de los 10 esquemas con estructura uniforme
function esquemaLesson(
  num: number,
  titulo: string,
  accesorios: string[],
  pasos: string[],
  funcional: string,
  estimatedMin = 6
): Lesson {
  return {
    id: `m4-l${num}`,
    title: `Esquema ${num}: ${titulo}`,
    estimatedMin,
    blocks: [
      h2("Accesorios requeridos"),
      list(accesorios),
      h2("Procedimiento de instalación"),
      list(pasos.map((paso, i) => `**Paso ${i + 1}:** ${paso}`)),
      h2("Esquema funcional"),
      formula(funcional, "Lógica de conexión"),
      cite("Fuente: Guía Básica de Electricidad, Parte 4 (pp. 64-73)."),
    ],
  };
}

export const m4Esquemas: Module = {
  id: "m4",
  number: 4,
  title: "Esquemas Prácticos de Instalación",
  description: "Los 10 esquemas fundamentales de la Guía Básica + ducha eléctrica + timbre.",
  icon: "💡",
  requires: ["m3"],
  lessons: [
    esquemaLesson(1,
      "Un punto de luz con interruptor simple",
      [
        "Conductor TW AWG 14",
        "1 interruptor simple",
        "1 foco / luminaria",
        "2 cajas octogonales (derivación y foco)",
        "1 socket",
        "1 caja rectangular",
      ],
      [
        "L1 llega a la caja de derivación.",
        "De la caja: fase al borne 1 del interruptor.",
        "Del borne 2 del interruptor: regresa a la caja de derivación.",
        "De la caja: conductor al borne 1 del foco.",
        "Del borne 2 del foco: directo al neutro N.",
      ],
      "L1 → Caja → Interruptor (bornes 1-2) → Caja → Foco → N"
    ),
    esquemaLesson(2,
      "Un punto de luz + interruptor + tomacorriente",
      [
        "Conductor TW AWG 14",
        "1 interruptor simple", "1 foco", "1 tomacorriente",
        "2 cajas octogonales", "2 cajas rectangulares",
      ],
      [
        "Pasos del Esquema 1 para el circuito de luz.",
        "Del empalme de L1 en la caja: conductor al borne 1 del tomacorriente.",
        "Del neutro N: conductor al borne 2 del tomacorriente.",
      ],
      "Luz: L1 → Interruptor → Foco → N   |   Tomac.: L1 → Borne 1, N → Borne 2"
    ),
    esquemaLesson(3,
      "Dos puntos de luz con un solo interruptor",
      [
        "Conductor TW AWG 14",
        "1 interruptor simple", "2 focos",
        "3 cajas octogonales", "1 caja rectangular",
      ],
      [
        "L1 llega a la caja de derivación principal.",
        "De la caja: fase al interruptor; salida del interruptor regresa a la caja.",
        "De la caja: conductores a borne 1 de cada foco (en paralelo).",
        "N directo al borne 2 de ambos focos.",
      ],
      "L1 → Interruptor → Caja → Foco 1 → N   (y)   → Foco 2 → N"
    ),
    esquemaLesson(4,
      "Dos puntos de luz con interruptor doble (independientes)",
      [
        "Conductor TW AWG 14",
        "1 interruptor doble", "2 focos",
        "3 cajas octogonales", "1 caja rectangular",
      ],
      [
        "L1 llega a la caja y se puentea a ambos bornes de entrada del interruptor doble.",
        "Borne de salida A → borne 1 del Foco 1.",
        "Borne de salida B → borne 1 del Foco 2.",
        "N común para ambos focos (borne 2 de cada uno).",
      ],
      "L1 → IntDoble A → Foco 1 → N   |   L1 → IntDoble B → Foco 2 → N"
    ),
    esquemaLesson(5,
      "Tres puntos de luz con interruptor triple",
      [
        "Conductor TW AWG 14",
        "1 interruptor triple", "3 focos",
        "4 cajas octogonales", "1 caja rectangular",
      ],
      [
        "L1 puenteada a los tres bornes de entrada del interruptor triple.",
        "Cada borne de salida va al borne 1 de su foco correspondiente.",
        "N conectado a borne 2 de los tres focos.",
      ],
      "L1 → Interruptor triple (3 salidas independientes) → Foco 1, 2, 3 → N"
    ),
    esquemaLesson(6,
      "Tres puntos de luz + interruptor triple + tomacorriente",
      [
        "Conductor TW AWG 14",
        "1 interruptor triple", "3 focos", "1 tomacorriente",
        "4 cajas octogonales", "2 cajas rectangulares",
      ],
      [
        "Igual al Esquema 5 para los tres focos.",
        "De la derivación de L1: conductor al borne 1 del tomacorriente.",
        "Del neutro N: conductor al borne 2 del tomacorriente.",
      ],
      "Esquema 5 + Tomac.: L1 → Borne 1, N → Borne 2"
    ),
    {
      id: "m4-l7",
      title: "Esquema 7: Conmutación desde 2 puntos (escalera)",
      estimatedMin: 9,
      blocks: [
        p("Este esquema permite controlar un mismo punto de luz desde dos lugares distintos: típicamente las dos puntas de un pasillo, los dos extremos de una escalera, o las dos puertas de un dormitorio."),

        concept(
          "**Interruptor conmutador:** tiene 3 bornes (1 central + 2 extremos). NO es el mismo que un interruptor simple. El borne central es de entrada/salida; los dos extremos se conectan a los del otro conmutador.",
          "Componente especial"
        ),

        h2("Accesorios requeridos"),
        list([
          "Conductor TW AWG 14",
          "**2 interruptores conmutadores** (3 bornes cada uno)",
          "1 foco",
          "2 cajas octogonales, 2 cajas rectangulares",
        ]),

        h2("Procedimiento"),
        list([
          "**Paso 1:** L1 al borne central (1) del Conmutador A.",
          "**Paso 2:** Los bornes extremos (2 y 3) del Conm.A se cruzan con los bornes extremos (2 y 3) del Conm.B.",
          "**Paso 3:** El borne central (1) del Conm.B → borne 1 del foco.",
          "**Paso 4:** El borne 2 del foco → neutro N.",
        ]),
        note("Cuando ambos conmutadores están en la misma posición, el circuito está cerrado y el foco enciende. Cuando están en posiciones distintas, el circuito está abierto. Por eso cualquiera de los dos puntos puede encender o apagar."),

        h2("Esquema funcional"),
        formula(
          "L1 → Conm.A (b1) → bornes 2,3 cruzados → Conm.B (b1) → Foco → N"
        ),
        cite("Fuente: Guía Básica de Electricidad, p. 70."),
      ],
    },
    esquemaLesson(8,
      "Conmutación desde 3 puntos (cruceta + 2 conmutadores)",
      [
        "2 conmutadores simples (extremos)",
        "1 **interruptor de cruceta** (punto intermedio)",
        "1 foco",
        "3 cajas octogonales, 3 cajas rectangulares",
      ],
      [
        "L1 al borne central del Conm.A (extremo 1).",
        "Bornes extremos Conm.A cruzados a los bornes del interruptor de cruceta.",
        "El interruptor de cruceta cruza esos bornes hacia el Conm.B (extremo 2).",
        "Borne central Conm.B → Foco → N.",
      ],
      "L1 → Conm.A → [Cruceta] → Conm.B → Foco → N",
      8
    ),
    esquemaLesson(9,
      "Conmutación desde 4 puntos (2 cruceta + 2 conmutadores)",
      [
        "2 conmutadores simples (extremos)",
        "2 interruptores de cruceta (puntos intermedios)",
        "1 o 2 focos",
        "Múltiples cajas",
      ],
      [
        "L1 → Conmutador 1 (extremo).",
        "Bornes extremos Conm.1 cruzados con bornes del Conm.2 (cruceta).",
        "Bornes extremos Conm.2 cruzados con bornes del Conm.3 (cruceta).",
        "Bornes extremos Conm.3 cruzados con bornes del Conm.4 (extremo).",
        "Borne central Conm.4 → Foco → N.",
      ],
      "L1 → Conm1 → Conm2 → Conm3 → Conm4 → Foco → N",
      7
    ),
    esquemaLesson(10,
      "Conmutación desde 4 puntos + tomacorriente",
      [
        "Componentes del Esquema 9 + 1 tomacorriente + 1 caja rectangular",
      ],
      [
        "Ídem Esquema 9 para los focos.",
        "De la derivación de L1: conductor al borne 1 del tomacorriente.",
        "Del neutro N: conductor al borne 2 del tomacorriente.",
      ],
      "Esquema 9 completo + Tomac.: L1 → Borne 1, N → Borne 2",
      6
    ),
    {
      id: "m4-l11",
      title: "Instalación de ducha eléctrica",
      estimatedMin: 8,
      blocks: [
        p("La **ducha eléctrica** es una **carga especial** que requiere un circuito exclusivo por su alta demanda (3.000 a 6.000 W). Es uno de los aparatos que más accidentes provoca por mala instalación."),

        alert("**NUNCA compartir el circuito de ducha con otras cargas.** Una ducha de 4.500W consume 20A — ya saturaría un circuito de tomacorrientes común."),

        h2("Dimensionamiento"),
        table(
          ["Potencia ducha", "Corriente (220V)", "Conductor", "Térmica", "Diferencial"],
          [
            ["3.000 W", "13,6 A", "AWG 12 (THW)", "16 A", "30 mA obligatorio"],
            ["4.000 W", "18,2 A", "AWG 12 (THW)", "20 A", "30 mA obligatorio"],
            ["4.500 W", "20,5 A", "AWG 10 (THW)", "25 A", "30 mA obligatorio"],
            ["5.500 W", "25,0 A", "AWG 10 (THW)", "32 A", "30 mA obligatorio"],
            ["6.000 W", "27,3 A", "AWG 10 (THW)", "32 A", "10 mA obligatorio (zona húmeda)"],
          ]
        ),

        h2("Componentes obligatorios"),
        list([
          "**Llave termomagnética exclusiva** (no compartida).",
          "**Conductor THW** (no TW) por la temperatura del ambiente y proximidad de cargas.",
          "**Diferencial de 30 mA** mínimo (10 mA en duchas modernas con suelo metálico).",
          "**Conductor de tierra (PE)** directo a la jabalina o a la barra de tierra del tablero.",
        ]),

        h2("Esquema"),
        formula(
          "L1 → Térmica exclusiva → Diferencial → Ducha (borne L)\n N → Ducha (borne N)\n PE → Punto de tierra de la ducha → Jabalina"
        ),

        alert("**Si la ducha no tiene puesta a tierra:** ante cualquier falla interna (resistencia que se rompe y toca la carcasa), la persona bajo la ducha será el camino a tierra de la corriente. Riesgo de electrocución mortal."),

        cite("Fuente: Guía Básica de Electricidad, p. 72; AEA — Reglamento para instalaciones eléctricas."),
      ],
    },
    {
      id: "m4-l12",
      title: "Instalación de timbre (MBT)",
      estimatedMin: 5,
      blocks: [
        p("El **timbre** es un dispositivo de **muy baja tensión (MBT)**. Generalmente opera a 12 V o 24 V CA, lo que lo hace seguro al tacto y permite usar conductores más delgados."),

        h2("Componentes"),
        list([
          "**Transformador reductor:** 220 V → 12 V o 24 V (típicamente 5-10 VA).",
          "**Pulsador:** interruptor momentáneo, normalmente abierto (cierra solo mientras se aprieta).",
          "**Timbre o campanilla:** elemento sonoro (electromecánico o electrónico).",
          "**Conductor:** AWG 18 o 20 (suficiente para corrientes bajas).",
        ]),

        h2("Esquema"),
        formula(
          "220V → Transformador → 12V → Pulsador (serie) → Timbre → Retorno"
        ),

        note("Los circuitos MBT pueden ir por cañerías SEPARADAS del 220V, pero algunos códigos permiten que vayan en la misma cañería si los conductores tienen aislamiento adecuado. Verificar la norma local."),

        cite("Fuente: Manual Pirelli-SICA, sección Instalaciones MBT."),
      ],
    },
  ],

  quiz: [
    q("m4-q1",
      "En el Esquema 1 (un punto de luz con interruptor simple), ¿cuántos conductores entran a la caja del interruptor?",
      ["1", "2", "3", "4"], "b",
      "Entran 2 conductores: la fase desde la caja de derivación (al borne 1) y la salida del interruptor (del borne 2) que regresa a la caja."
    ),
    q("m4-q2",
      "¿Para qué se usa un interruptor conmutador (3 bornes)?",
      ["Para controlar 3 focos a la vez", "Para conmutación desde 2 puntos (escalera)", "Para tomacorrientes especiales", "No existe"], "b",
      "El conmutador permite controlar un mismo punto de luz desde 2 lugares (Esquema 7)."
    ),
    q("m4-q3",
      "En el Esquema 7 (conmutación 2 puntos), ¿cómo se conectan los bornes extremos de los dos conmutadores?",
      ["Directo (mismo lado con mismo lado)", "Cruzados (b2 con b3 y b3 con b2)", "En paralelo", "Solo se usa un borne extremo"], "b",
      "Los bornes 2 y 3 del Conm.A se conectan cruzados (intercambiados) con los bornes 2 y 3 del Conm.B."
    ),
    q("m4-q4",
      "Para conmutación desde 3 puntos, ¿qué componente especial se usa en el punto intermedio?",
      ["Otro conmutador simple", "Un interruptor de cruceta", "Un teleruptor", "Un diferencial"], "b",
      "El interruptor de cruceta cruza dos pares de conductores. Va en los puntos intermedios. Los extremos siguen siendo conmutadores simples."
    ),
    q("m4-q5",
      "¿Cuál es la corriente que consume una ducha de 4.500W a 220V?",
      ["10 A", "15 A", "20,5 A", "25 A"], "c",
      "I = P/V = 4.500/220 ≈ 20,5 A."
    ),
    q("m4-q6",
      "¿Qué conductor mínimo se usa para una ducha de 4.500W?",
      ["AWG 14", "AWG 12 (THW)", "AWG 10 (THW)", "AWG 8"], "c",
      "AWG 10 THW (35A) tiene buen margen sobre los 20,5A de la ducha. AWG 12 quedaría justo en el límite."
    ),
    q("m4-q7",
      "¿La ducha eléctrica puede compartir circuito con otras cargas?",
      ["Sí, si la térmica es grande", "Sí, si va con diferencial", "No, debe tener circuito exclusivo", "Solo si la potencia es < 3.000W"], "c",
      "La ducha SIEMPRE debe tener circuito exclusivo. Sobrecargaría cualquier circuito común y la térmica dispararía constantemente."
    ),
    q("m4-q8",
      "¿Qué tipo de conductor se recomienda para ducha eléctrica?",
      ["TW", "THW", "Cualquiera", "Cable de aluminio"], "b",
      "THW soporta hasta 75°C, importante por la temperatura del ambiente del baño y la cercanía de la resistencia caliente."
    ),
    q("m4-q9",
      "¿Cuál es la sensibilidad mínima del diferencial para una ducha en baño?",
      ["100 mA", "300 mA", "30 mA", "500 mA"], "c",
      "30 mA es el mínimo para zonas húmedas. 10 mA es recomendado para mayor seguridad."
    ),
    q("m4-q10",
      "El circuito de un timbre típico opera a:",
      ["220 V", "380 V", "12 o 24 V (MBT)", "Solo CC"], "c",
      "El timbre usa MBT (Muy Baja Tensión) de 12 o 24 V CA generada por un transformador reductor."
    ),
    q("m4-q11",
      "¿Cuál es la función del transformador en el circuito de timbre?",
      [
        "Aumentar la corriente",
        "Reducir 220V a 12 o 24V para tener una tensión segura al tacto",
        "Convertir CA a CC",
        "Filtrar ruido",
      ], "b",
      "El transformador reduce la tensión de la red (220V) a un valor seguro para que el pulsador y el cableado puedan ser manipulados sin riesgo."
    ),
    q("m4-q12",
      "En el Esquema 5 (interruptor triple + 3 focos), ¿cómo se distribuye el neutro?",
      [
        "Un neutro distinto para cada foco",
        "Cada foco tiene su propio neutro del tablero",
        "El neutro N es común para los 3 focos",
        "No se usa neutro",
      ], "c",
      "El N es el mismo para los 3 focos. Solo las fases (a través del interruptor triple) van independientes."
    ),
    q("m4-q13",
      "¿Qué pasa si dos conmutadores del Esquema 7 quedan en posiciones distintas?",
      [
        "El foco se enciende a media intensidad",
        "El foco se apaga",
        "Se enciende el doble de intenso",
        "Hace cortocircuito",
      ], "b",
      "Cuando los conmutadores están en posiciones distintas, el circuito está abierto y el foco está apagado. Es la lógica básica de la escalera."
    ),
    q("m4-q14",
      "Si en el Esquema 4 (interruptor doble, 2 focos independientes) acciono solo el primer interruptor:",
      [
        "Se encienden ambos focos",
        "Se enciende solo el Foco 1",
        "Se enciende solo el Foco 2",
        "No pasa nada",
      ], "b",
      "Cada mitad del interruptor doble controla su propio foco de manera independiente."
    ),
    q("m4-q15",
      "¿Cuántos cables de fase deben entrar a un interruptor triple desde la red?",
      ["3 (uno por cada salida)", "1 (puenteado a las tres entradas)", "2", "Ninguno"], "b",
      "Solo entra 1 cable de fase. Se puentea internamente (o se hace un puente externo) a las tres entradas del interruptor triple."
    ),
  ],
};
