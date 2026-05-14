import type { Module } from "@/types/content";
import { p, h2, concept, critical, example, alert, note, list, table, cite, q } from "./_helpers";

export const m3Conductores: Module = {
  id: "m3",
  number: 3,
  title: "Conductores, Empalmes y Simbología",
  description: "Tipos de cables, tabla AWG, colores normalizados, empalmes A/B/C, herramientas, simbología y esquemas.",
  icon: "🔧",
  requires: ["m2"],
  lessons: [
    {
      id: "m3-l1",
      title: "Tipos de conductores eléctricos",
      estimatedMin: 8,
      blocks: [
        p("Los conductores son el \"sistema vascular\" de toda instalación. Elegir el tipo y calibre correcto es **la base de la seguridad eléctrica**. Un conductor mal elegido se calienta y puede provocar incendios."),

        h2("Cable TW (Thermoplastic Wire)"),
        list([
          "Cobre **sólido** (un solo hilo grueso).",
          "Aislamiento de **PVC**.",
          "Temperatura máxima del conductor: **60 °C**.",
          "Uso: **instalaciones fijas empotradas** (dentro de caños).",
          "Aplicación típica: circuitos de iluminación y tomacorrientes en viviendas.",
          "Más económico que el THW.",
        ]),

        h2("Cable THW (Thermoplastic Heat and Water resistant)"),
        list([
          "Cobre sólido o multifilar.",
          "Aislamiento de PVC especial resistente al calor y humedad.",
          "Temperatura máxima: **75 °C**.",
          "Uso: circuitos de **alta demanda**, exposición al sol, múltiples cables en mismo ducto.",
          "Mayor capacidad de corriente que un TW del mismo calibre.",
        ]),

        h2("Cable flexible vulcanizado"),
        list([
          "Múltiples hilos de cobre **muy finos trenzados**.",
          "Cubierta de goma o PVC flexible.",
          "Uso: cables de extensión, equipos móviles, conexiones que requieren flexibilidad sin romperse.",
          "No se usa en instalaciones fijas empotradas.",
        ]),

        critical(
          "**Un conductor subdimensionado no dispara la protección. Simplemente se calienta silenciosamente hasta degradar el aislamiento → incendio dentro de la pared.** El calentamiento puede pasar años sin detectarse.",
          "El peligro silencioso"
        ),

        cite("Fuente: Guía Básica de Electricidad, pp. 38-40; Manual Pirelli-SICA, sección Conductores."),
      ],
    },
    {
      id: "m3-l2",
      title: "Tabla AWG completa",
      estimatedMin: 10,
      blocks: [
        p("**AWG** (American Wire Gauge) es el sistema de calibración de conductores más usado en Latinoamérica."),

        concept(
          "**Escala inversa:** un número AWG mayor indica un conductor más DELGADO. AWG 14 es más delgado que AWG 12, que es más delgado que AWG 10.",
          "Cómo leer la tabla AWG"
        ),

        table(
          ["AWG", "Sección (mm²)", "Diámetro (mm)", "Cap. TW (A)", "Cap. THW (A)", "Uso típico"],
          [
            ["22",   "0,32",  "0,64",  "3",   "3",   "Señalización, MBT, timbres"],
            ["18",   "0,82",  "1,02",  "7",   "10",  "Circuitos de control, electrónica"],
            ["16",   "1,31",  "1,29",  "13",  "15",  "Iluminación pequeña"],
            ["14",   "2,08",  "1,63",  "20",  "20",  "**Iluminación domiciliaria (estándar)**"],
            ["12",   "3,31",  "2,05",  "25",  "25",  "**Tomacorrientes generales (estándar)**"],
            ["10",   "5,26",  "2,59",  "30",  "35",  "**Ducha eléctrica, cargas especiales**"],
            ["8",    "8,37",  "3,26",  "40",  "50",  "Línea seccional mediana"],
            ["6",    "13,30", "4,11",  "55",  "65",  "Seccional domicilio grande"],
            ["4",    "21,15", "5,19",  "70",  "85",  "Alimentador local / oficina"],
            ["2",    "33,62", "6,54",  "95",  "115", "Alimentador edificio mediano"],
            ["1/0",  "53,49", "8,25",  "125", "150", "Acometidas principales"],
            ["2/0",  "67,43", "9,27",  "145", "175", "Acometidas industriales"],
            ["4/0",  "107,2", "11,68", "195", "230", "Transformadores, grandes feeder"],
          ]
        ),

        h2("Regla práctica de selección"),
        list([
          "**Paso 1:** Calcular la corriente máxima del circuito: I = P_total / V",
          "**Paso 2:** Elegir el AWG con capacidad inmediatamente superior a la corriente calculada.",
          "**Paso 3:** Agregar 25% de margen de seguridad.",
          "**Paso 4:** La térmica debe ser ≤ capacidad del conductor (regla AEA).",
          "**Paso 5:** No usar TW donde se requiere THW (zonas calurosas, exposición al sol, múltiples cables en ducto).",
        ]),

        example(
          "Un circuito alimentará: TV (80W) + heladera (400W) + lavarropas (1.500W).\nP_total = 80 + 400 + 1.500 = 1.980 W\nI = 1.980 / 220 = 9 A\nMargen 25%: 9 × 1,25 = 11,25 A\n\nAWG 14 admite 20 A → más que suficiente.\nPero al ser circuito de TOMACORRIENTES, la norma exige AWG 12 mínimo.\n\n→ Conductor: AWG 12 · Térmica: 20 A.",
          "EJ — Selección de conductor"
        ),

        cite("Fuente: Guía Básica de Electricidad, p. 40 (tabla AWG)."),
      ],
    },
    {
      id: "m3-l3",
      title: "Colores normalizados de conductores",
      estimatedMin: 6,
      blocks: [
        alert("Los colores de los conductores **NO son decorativos** — son un código de seguridad internacional. Cambiar el color sin razón técnica es PELIGROSO."),

        h2("Estándares de colores"),
        table(
          ["Conductor", "Color principal (UE / IEC)", "Color (alternativa Latinoamérica)"],
          [
            ["Fase L₁",       "Marrón",        "Negro o Rojo"],
            ["Fase L₂ (trif.)","Negro",        "Marrón"],
            ["Fase L₃ (trif.)","Gris",         "—"],
            ["Neutro N",      "Azul claro",    "Azul claro (universal)"],
            ["Tierra PE",     "Verde-Amarillo","Verde-Amarillo (universal)"],
            ["CC Positivo (+)","Rojo",         "Rojo"],
            ["CC Negativo (−)","Negro",        "Negro o Blanco"],
          ]
        ),

        concept(
          "**Reglas inviolables:** El verde-amarillo SIEMPRE es tierra de protección. El azul claro SIEMPRE es neutro. Estos dos colores nunca se usan para otra cosa.",
          "Lo inviolable"
        ),

        h2("Por qué importa"),
        p("Si un electricista llega a una caja vieja y encuentra cables de colores no estándar (todos negros, por ejemplo), tiene que **verificar con multímetro** antes de tocar — porque no puede confiar en el color."),
        note("Buena práctica: cuando trabajes con cable de un solo color, marca cada extremo con cinta del color correcto al conectarlo."),

        cite("Fuente: IEC 60446 / Manual Pirelli-SICA, sección Identificación de Conductores."),
      ],
    },
    {
      id: "m3-l4",
      title: "Empalmes: tipos A, B y C",
      estimatedMin: 10,
      blocks: [
        p("Un **empalme** es la unión eléctrica y mecánica de dos o más conductores. Es la operación más frecuente en una instalación, y la más propensa a errores si no se hace bien."),

        h2("Requisitos de un buen empalme"),
        list([
          "**Resistencia eléctrica mínima:** un mal empalme aumenta la resistencia → calor localizado → incendio.",
          "**Resistencia mecánica adecuada:** el empalme no debe soltarse si alguien tira del cable.",
          "**Aislamiento equivalente al del conductor:** la cinta aisladora debe restaurar la cobertura original.",
        ]),

        concept(
          "**TODO empalme va DENTRO de una caja de registro.** NUNCA dentro de una pared sin caja. NUNCA colgando en el aire. La caja permite inspección y mantenimiento futuro.",
          "Regla universal"
        ),

        h2("Empalme tipo A — prolongación"),
        list([
          "**Uso:** prolongar un conductor en la misma dirección.",
          "**Procedimiento:**",
          "  · Pelar 6 cm de aislamiento de cada conductor.",
          "  · Cruzar los conductores dejando 1,5 cm entre los aislantes.",
          "  · Enrollar cada extremo alrededor del otro (4-5 vueltas apretadas).",
          "  · Aislar con cinta autoextinguible en forma oblicua.",
        ]),

        h2("Empalme tipo B — derivación (en T)"),
        list([
          "**Uso:** derivar un ramal desde un conductor principal sin cortarlo.",
          "**Procedimiento:**",
          "  · Pelar 3 cm del principal sin cortar.",
          "  · Pelar 8 cm del conductor de derivación.",
          "  · Enrollar el de derivación alrededor del principal (6-8 vueltas firmes).",
          "  · Aislar.",
          "**Ventaja:** permite llevar energía a un punto adicional sin cortar el principal.",
        ]),

        h2("Empalme tipo C — trenzado"),
        list([
          "**Uso:** espacios reducidos como cajas de paso muy pobladas.",
          "**Procedimiento:**",
          "  · Pelar 5 cm de cada conductor.",
          "  · Disponer los conductores pelados paralelos.",
          "  · Trenzar conjuntamente las puntas (al menos 6 vueltas).",
          "  · Doblar la trenza sobre sí misma y aislar.",
          "**Ventaja:** es el más compacto de los tres.",
        ]),

        alert(
          "Después de aislar el empalme, el espesor de la cinta debe ser equivalente al aislamiento original del conductor. Aislar de menos = riesgo de cortocircuito o electrocución."
        ),

        h2("Alternativa moderna: bornera o regleta"),
        p("Las regletas de bornes con tornillo son una alternativa más rápida y segura para empalmes dentro de cajas, especialmente para principiantes. Sin embargo, ocupan más espacio y deben dimensionarse según la corriente."),

        cite("Fuente: Guía Básica de Electricidad, pp. 42-50."),
      ],
    },
    {
      id: "m3-l5",
      title: "Herramientas del electricista",
      estimatedMin: 6,
      blocks: [
        p("Un buen técnico domina sus herramientas antes de tocar un conductor. Estas son las herramientas básicas que todo electricista debe tener:"),

        h2("Herramientas manuales"),
        table(
          ["Herramienta", "Uso principal"],
          [
            ["Destornillador plano dieléctrico (1.000V)",  "Apretar/aflojar tornillos de bornes"],
            ["Destornillador Phillips dieléctrico",         "Tornillos cruciformes"],
            ["Alicate universal",                            "Cortar, sujetar, doblar conductores"],
            ["Alicate de punta larga",                       "Trabajos en espacios reducidos"],
            ["Alicate de corte (diagonal)",                  "Corte limpio de conductores"],
            ["Cuchilla de electricista",                     "Pelar conductores"],
            ["Pelacables (auto-ajustable)",                  "Pelado rápido sin dañar el cobre"],
            ["Pasacables (wincha de fibra)",                 "Pasar conductores por cañerías"],
            ["Cinta métrica 5 m",                            "Medición de tramos"],
            ["Nivel de burbuja",                             "Tableros y cajas alineadas"],
          ]
        ),

        h2("Instrumentos de medición"),
        table(
          ["Instrumento", "Qué mide / Para qué"],
          [
            ["Multímetro digital CAT III 600V",  "Voltaje, corriente, resistencia, continuidad"],
            ["Pinza amperimétrica",               "Corriente CA sin interrumpir el circuito"],
            ["Detector de tensión sin contacto",  "Verificación rápida de presencia de tensión"],
            ["Megóhmetro 500V/1.000V",            "Resistencia de aislamiento (>1 MΩ)"],
            ["Telurómetro",                       "Resistencia de la jabalina de tierra (<25Ω)"],
            ["Termómetro infrarrojo",             "Puntos calientes en tableros"],
          ]
        ),

        h2("EPP — Equipo de protección personal"),
        list([
          "Guantes dieléctricos Clase 0 (1.000 V).",
          "Calzado dieléctrico (15 kV).",
          "Gafas de seguridad (obligatorias en tableros energizados).",
          "Casco dieléctrico Clase E (20 kV).",
        ]),

        note("Una herramienta de baja calidad puede fallar en el peor momento — invierte en herramientas con marca y certificación dieléctrica."),

        cite("Fuente: Manual Pirelli-SICA, sección Herramientas e Instrumentos."),
      ],
    },
    {
      id: "m3-l6",
      title: "Simbología eléctrica normalizada",
      estimatedMin: 8,
      blocks: [
        p("Los **símbolos eléctricos** están normalizados por la norma **IEC 60617** (variantes locales en IRAM, NMX, etc.). Saber leerlos es indispensable para interpretar planos."),

        h2("Símbolos esenciales — IEC 60617"),
        table(
          ["Símbolo", "Componente", "Descripción"],
          [
            ["—/—",            "Interruptor simple",         "Una entrada, una salida (corta o conecta)."],
            ["—/⇗—",           "Interruptor conmutador",     "Tres bornes (central + 2 extremos). Para conmutación desde 2 puntos."],
            ["—//—",           "Interruptor doble",          "Dos interruptores independientes en una caja."],
            ["⌒",               "Tomacorriente simple",       "Conexión bipolar 220V."],
            ["⌒⌒",             "Tomacorriente doble",        "Dos tomas en una sola placa."],
            ["⌒+",              "Tomacorriente con tierra",   "Tomacorriente con conexión de PE."],
            ["⊗",               "Luminaria (foco)",           "Punto de luz."],
            ["□",                "Caja rectangular",           "Para interruptores y tomas."],
            ["⬢",                "Caja octogonal",             "Para derivaciones y luminarias."],
            ["▢",                "Tablero de distribución",    "Aloja protecciones."],
            ["•",                "Punto de conexión",          "Empalme o nodo eléctrico."],
            ["—╳—",            "Cruce sin conexión",         "Cables que se cruzan sin tocarse."],
            ["≈",                "Corriente alterna (CA)",     "Indica fuente o circuito CA."],
            ["−|",               "Pilas/baterías",             "Línea larga = (+), corta = (−)."],
          ]
        ),

        h2("Recomendación práctica"),
        p("Cada plano debe incluir un **cuadro de referencias** con todos los símbolos usados. Nunca asumas que un símbolo significa lo que parece — siempre verifícalo en el cuadro de referencias específico del plano."),

        cite("Fuente: IEC 60617 — Símbolos gráficos para diagramas eléctricos."),
      ],
    },
    {
      id: "m3-l7",
      title: "Esquemas eléctricos: real, funcional, instalación",
      estimatedMin: 9,
      blocks: [
        p("Todo electricista debe dominar **tres tipos de esquemas eléctricos**. Cada uno responde a una pregunta distinta y se usa en una etapa distinta del trabajo."),

        h2("Esquema real (de cableado)"),
        list([
          "Muestra **todos los accesorios tal como se instalan físicamente**.",
          "Indica posición de cajas, recorrido real de conductores, distancias aproximadas.",
          "**Útil:** para el operario en obra.",
          "**Limitación:** difícil de leer si la instalación es compleja (muchos cables superpuestos).",
        ]),

        h2("Esquema funcional"),
        list([
          "Muestra la **lógica de conexión en forma rectilínea**, sin respetar posición física.",
          "Convención: fase a la izquierda, neutro a la derecha, bornes en sucesión.",
          "**Útil:** para comprender el funcionamiento y detectar errores de diseño.",
          "**Limitación:** no muestra dónde quedan físicamente los cables.",
        ]),
        example(
          "Esquema funcional de un interruptor simple controlando un foco:\n\nL → Borne 1 del interruptor → Borne 2 del interruptor → Borne 1 del foco → Borne 2 del foco → N\n\nTodo lineal, izquierda a derecha, sin curvas ni posiciones físicas.",
          "Ejemplo de esquema funcional"
        ),

        h2("Esquema de instalación"),
        list([
          "Versión simplificada usando símbolos compactos.",
          "Cantidad de conductores indicada con líneas o números entre barras (ej: 3 indica 3 conductores).",
          "**Útil:** para proyectos profesionales, planos municipales, planos para la empresa distribuidora.",
        ]),

        critical(
          "**El esquema funcional NO muestra la posición física de los cables.** Saber leer un esquema funcional NO es lo mismo que saber cómo quedan físicamente los cables. Un profesional domina los TRES tipos.",
          "Confusión crítica"
        ),

        cite("Fuente: Guía Básica de Electricidad, pp. 56-60."),
      ],
    },
    {
      id: "m3-l8",
      title: "Multímetro: uso básico",
      estimatedMin: 7,
      blocks: [
        p("El **multímetro** es la herramienta de medición más importante. Permite medir voltaje, continuidad y resistencia, base de todo diagnóstico."),

        h2("Antes de usar el multímetro"),
        list([
          "**Verificar selector:** AC V para alterna, DC V para continua, Ω para resistencia, A para corriente.",
          "**Verificar puntas:** la roja en V/Ω/mA, la negra en COM. Nunca conectar en A en un circuito de alto amperaje sin pinza.",
          "**Verificar categoría:** CAT III 600V mínimo para instalaciones domiciliarias.",
          "**EPP:** guantes y gafas al medir con tensión.",
        ]),

        h2("Mediciones más comunes"),
        table(
          ["Medición", "Selector", "Conexión", "Lectura esperada"],
          [
            ["Voltaje fase-neutro",  "AC V, rango 250V", "Puntas en F y N",            "210-230 V"],
            ["Voltaje neutro-tierra","AC V, rango 25V",  "Puntas en N y PE",           "0 a 3 V"],
            ["Continuidad",          "Ω (modo beeper)",   "Circuito SIN tensión",       "< 1 Ω: continuidad. ∞: abierto"],
            ["Resistencia",          "Ω, rango adecuado", "Componente sin tensión",     "Valor de la resistencia"],
            ["Aislamiento (con megóhmetro)", "MΩ",         "Cable sin tensión",          "> 1 MΩ"],
          ]
        ),

        alert(
          "**Nunca medir corriente con el multímetro a través de sus puntas en un circuito de alto amperaje.** Los multímetros tienen un fusible interno (~10A). Para corrientes mayores, usar **pinza amperimétrica**."
        ),

        cite("Fuente: Manual Pirelli-SICA, sección Mediciones."),
      ],
    },
  ],

  quiz: [
    q("m3-q1",
      "En el sistema AWG, ¿cuál conductor es MÁS GRUESO?",
      ["AWG 22", "AWG 14", "AWG 10", "AWG 8"], "d",
      "AWG es escala inversa: a menor número, conductor más grueso. AWG 8 es más grueso que AWG 10, 14 y 22."
    ),
    q("m3-q2",
      "¿Cuál es la capacidad de corriente típica de un AWG 14 con aislamiento TW?",
      ["10 A", "20 A", "30 A", "50 A"], "b",
      "AWG 14 con TW (60°C) admite 20 A. Es el calibre estándar para circuitos de iluminación."
    ),
    q("m3-q3",
      "¿Para qué circuito se usa típicamente el AWG 12?",
      ["Iluminación", "Tomacorrientes generales", "Línea seccional", "Acometida"], "b",
      "AWG 12 (25 A) es el calibre estándar para tomacorrientes generales en instalaciones domiciliarias."
    ),
    q("m3-q4",
      "¿De qué color es UNIVERSALMENTE el conductor de tierra?",
      ["Azul claro", "Negro", "Verde-amarillo", "Marrón"], "c",
      "El verde-amarillo es OBLIGATORIO universalmente para el conductor de protección (PE)."
    ),
    q("m3-q5",
      "¿Cuál es la diferencia principal entre cable TW y THW?",
      [
        "TW es para CA y THW para CC",
        "TW soporta hasta 60°C; THW soporta hasta 75°C",
        "TW es más grueso",
        "TW es más caro",
      ], "b",
      "TW = 60°C (Thermoplastic Wire). THW = 75°C, además resistente a humedad. THW admite mayor corriente para el mismo calibre."
    ),
    q("m3-q6",
      "¿Cuál es el empalme adecuado para derivar un ramal sin cortar el conductor principal?",
      ["Empalme tipo A (prolongación)", "Empalme tipo B (derivación en T)", "Empalme tipo C (trenzado)", "Cualquiera"], "b",
      "El empalme B se usa para derivar: el conductor de derivación se enrolla alrededor del principal sin cortarlo."
    ),
    q("m3-q7",
      "¿Dónde debe ir SIEMPRE un empalme?",
      [
        "Dentro de la pared",
        "Dentro de una caja de registro",
        "Colgando en el aire si está aislado",
        "En cualquier lugar mientras esté con cinta",
      ], "b",
      "Regla universal: todo empalme va DENTRO de una caja de registro. Permite inspección y mantenimiento futuro."
    ),
    q("m3-q8",
      "¿Cuál es la categoría mínima de un multímetro para instalaciones domiciliarias?",
      ["CAT I 300V", "CAT II 600V", "CAT III 600V", "CAT IV 1000V"], "c",
      "CAT III 600V es el mínimo seguro para tableros y circuitos domiciliarios. CAT I y CAT II son solo para electrónica."
    ),
    q("m3-q9",
      "¿Qué tipo de esquema muestra la lógica de conexión sin respetar posiciones físicas?",
      ["Esquema real", "Esquema funcional", "Esquema de instalación", "Plano arquitectónico"], "b",
      "El esquema funcional dispone los componentes en orden lineal lógico, sin importar dónde quedan físicamente."
    ),
    q("m3-q10",
      "Si tienes un circuito con 11A de carga calculada, ¿qué AWG conviene usar (con margen de 25%)?",
      ["AWG 18", "AWG 14 (20A)", "AWG 22", "AWG 16"], "b",
      "11 × 1,25 = 13,75 A. AWG 14 admite 20 A, suficiente. AWG 18 y 22 no alcanzan. AWG 16 (13A TW) está justo en el límite."
    ),
    q("m3-q11",
      "¿Para qué se usa un megóhmetro?",
      [
        "Medir corriente alterna alta",
        "Medir resistencia de aislamiento de cables",
        "Medir voltaje a 1.000V",
        "Detectar campos magnéticos",
      ], "b",
      "El megóhmetro aplica un voltaje alto (500V o 1.000V) y mide la resistencia de aislamiento. Debe dar > 1 MΩ en cables sanos."
    ),
    q("m3-q12",
      "¿Cuál es la resistencia ideal de la jabalina de tierra?",
      ["< 1 Ω", "< 5 Ω", "< 25 Ω", "< 100 Ω"], "c",
      "La norma AEA exige < 25 Ω. Para hospitales y locales especiales, < 10 Ω."
    ),
    q("m3-q13",
      "Un electricista necesita pasar 4 conductores AWG 14 por una cañería. ¿Qué diámetro mínimo de cañería usar?",
      ["1/2\" (13mm)", "3/4\" (19mm)", "1\" (25mm)", "2\" (50mm)"], "b",
      "Una cañería de 3/4\" (19mm) admite 4-5 conductores AWG 14 sin superar el 40% de ocupación. 1/2\" solo permite 2-3."
    ),
    q("m3-q14",
      "¿Qué herramienta NO debe ser dieléctrica obligatoriamente?",
      ["Destornillador", "Alicate", "Cinta métrica", "Tijera para cables"], "c",
      "La cinta métrica no toca conductores energizados. Las herramientas dieléctricas se necesitan en las que pueden hacer contacto eléctrico (destornilladores, alicates, cuchillas)."
    ),
    q("m3-q15",
      "Mido continuidad con el multímetro entre dos puntos y obtengo lectura ∞ (infinito). ¿Qué significa?",
      [
        "Hay continuidad perfecta",
        "El circuito está abierto (interrumpido)",
        "Hay un cortocircuito",
        "El multímetro está dañado",
      ], "b",
      "∞ Ω = circuito abierto (no hay conexión). 0Ω = continuidad perfecta. Valores intermedios indican alta resistencia (posible falla)."
    ),
  ],
};
