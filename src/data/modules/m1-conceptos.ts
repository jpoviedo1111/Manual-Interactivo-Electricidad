import type { Module } from "@/types/content";
import { p, h2, concept, critical, formula, example, alert, note, list, table, cite, q } from "./_helpers";

export const m1Conceptos: Module = {
  id: "m1",
  number: 1,
  title: "Conceptos Básicos de Electricidad",
  description: "Qué es la electricidad, historia, magnitudes fundamentales, Ley de Ohm, potencia y energía.",
  icon: "⚡",
  lessons: [
    // ────────────────────────────────────────────────────────────
    {
      id: "m1-l1",
      title: "¿Qué es la electricidad?",
      estimatedMin: 8,
      blocks: [
        p("La **electricidad** es el movimiento ordenado de electrones a través de un material conductor. Es una de las formas de energía más versátiles que la humanidad ha aprendido a utilizar: puede transformarse en luz, calor, movimiento, sonido, señales de información, e incluso provocar reacciones químicas."),

        h2("La estructura del átomo y la corriente eléctrica"),
        p("Para entender la electricidad hay que volver al átomo. Cada átomo tiene un **núcleo** (con protones de carga positiva y neutrones sin carga) y **electrones** que giran a su alrededor con carga negativa. En los materiales conductores —como el **cobre** y el **aluminio**— los electrones de la capa exterior están débilmente ligados, y un pequeño empujón externo basta para que migren de un átomo al siguiente."),
        p("Ese empujón externo es lo que llamamos **voltaje** o **tensión**: una diferencia de potencial entre dos puntos que pone a los electrones en movimiento."),

        concept(
          "La electricidad es el movimiento ordenado de electrones por un conductor, impulsados por una diferencia de potencial (voltaje).",
          "Definición clave"
        ),

        h2("Manifestaciones de la electricidad"),
        p("Cuando los electrones fluyen por un material, su movimiento se puede aprovechar para producir distintos efectos físicos según el dispositivo:"),
        list([
          "**Luz**: en lámparas incandescentes (filamento al rojo vivo), fluorescentes, LED.",
          "**Calor**: en resistencias calefactoras (planchas, ducha eléctrica, calefactores).",
          "**Movimiento**: en motores eléctricos (ventiladores, bombas, compresores, lavarropas).",
          "**Señales de información**: en computadoras, teléfonos, equipos electrónicos.",
          "**Reacciones químicas**: en electrólisis, baterías, galvanoplastia.",
        ]),

        h2("Ejemplos prácticos"),
        example(
          "Una lámpara común tiene un filamento que se calienta cuando los electrones lo atraviesan.\nEl filamento de tungsteno alcanza ~2.500 °C y emite luz visible.\nLa misma corriente, en una resistencia calefactora, calienta agua sin emitir luz porque el material tiene otras propiedades.",
          "Lámpara vs. resistencia"
        ),
        note("Los materiales conductores tienen electrones libres en su capa exterior. Los **aislantes** (plástico, goma, vidrio) tienen sus electrones fuertemente ligados — por eso no conducen y los usamos para proteger los cables."),

        cite("Fuente: Guía Básica de Electricidad (Salazar et al., 2011), pp. 6-10."),
      ],
    },

    // ────────────────────────────────────────────────────────────
    {
      id: "m1-l2",
      title: "Breve historia de la electricidad",
      estimatedMin: 7,
      blocks: [
        p("La electricidad como fenómeno conocido es muy antigua, pero su uso práctico es relativamente reciente — apenas unos 150 años. Conocer su historia ayuda a entender por qué hoy usamos corriente alterna a 220V/50Hz y no otra cosa."),

        h2("Los griegos y el ámbar (600 a.C.)"),
        p("El filósofo griego Tales de Mileto observó que al frotar una vara de **ámbar** (resina fósil) con un paño de lana, esta atraía pequeños pedazos de paja. En griego ámbar se dice **élektron** — de allí viene la palabra electricidad. Pero pasaron más de 2.000 años antes de que alguien entendiera qué pasaba realmente."),

        h2("Los pioneros del siglo XVIII–XIX"),
        list([
          "**Benjamin Franklin (1752):** demostró con su experimento del cometa que los rayos son fenómenos eléctricos, e inventó el pararrayos.",
          "**Alessandro Volta (1800):** construyó la **pila voltaica**, primer dispositivo capaz de producir corriente eléctrica continua y estable. Es el padre de las baterías modernas. Su unidad de tensión es el **voltio (V)**.",
          "**André-Marie Ampère (1820):** descubrió la relación entre electricidad y magnetismo, base de los motores eléctricos. Su unidad de corriente es el **amperio (A)**.",
          "**Georg Simon Ohm (1827):** formuló la ley fundamental que lleva su nombre, **V = I × R**, vinculando voltaje, corriente y resistencia. Su unidad de resistencia es el **ohmio (Ω)**.",
          "**Michael Faraday (1831):** descubrió la inducción electromagnética, principio de los generadores y transformadores.",
        ]),

        h2("La guerra de las corrientes (1880-1893)"),
        p("A fines del siglo XIX se libró una batalla técnica y comercial entre **Thomas Edison** (defensor de la corriente continua / CC) y **Nikola Tesla** junto con **George Westinghouse** (defensores de la corriente alterna / CA)."),
        p("Edison había construido la primera red eléctrica comercial en CC, pero tenía un problema grave: la CC se atenúa rápidamente con la distancia. Para llevarla a 2 km del generador hacía falta una central por barrio."),
        p("Tesla propuso usar **CA con transformadores**: subir el voltaje a niveles altísimos para transportar la energía con mínimas pérdidas a kilómetros, y luego bajarlo cerca del usuario. Esta solución terminó imponiéndose y es la que usa hoy toda la red eléctrica mundial."),

        concept(
          "Ganó la corriente alterna porque permite **transformación fácil de voltaje** mediante transformadores: subir a alta tensión para transporte largo (con pocas pérdidas) y bajarla cerca del usuario.",
          "Por qué CA ganó"
        ),

        h2("Estado actual"),
        p("Hoy toda la red eléctrica mundial opera en corriente alterna a 50 Hz (Europa, Sudamérica, África) o 60 Hz (México, EE.UU., Japón parcial). Las baterías, paneles solares y la mayoría de la electrónica siguen usando CC, pero la **distribución** es siempre CA."),

        cite("Fuente: Guía Básica de Electricidad (Salazar et al., 2011), pp. 11-12."),
      ],
    },

    // ────────────────────────────────────────────────────────────
    {
      id: "m1-l3",
      title: "Magnitudes eléctricas fundamentales",
      estimatedMin: 12,
      blocks: [
        p("Toda instalación eléctrica se describe con tres magnitudes fundamentales: voltaje, corriente y resistencia. Sin entenderlas no se puede calcular, dimensionar ni diagnosticar nada."),

        h2("Voltaje (Tensión)"),
        list([
          "**Símbolo:** V (o U)",
          "**Unidad:** voltio (V)",
          "**Definición:** diferencia de potencial entre dos puntos. Es la **presión** que empuja a los electrones.",
        ]),
        p("Una **analogía hidráulica** ayuda: si los electrones fueran agua, el voltaje sería la **presión** del agua en la cañería. Sin presión, el agua no fluye aunque la cañería esté abierta."),

        table(
          ["Fuente", "Voltaje típico"],
          [
            ["Pila AAA / AA", "1,5 V"],
            ["Batería de auto", "12 V"],
            ["Panel solar (1 módulo)", "12, 24 o 48 V"],
            ["Cargador de celular", "5 V"],
            ["Red domiciliaria (Latinoamérica)", "220 V (monofásico)"],
            ["Red domiciliaria (EE.UU./México)", "120 V (monofásico)"],
            ["Red trifásica industrial", "380 V entre fases"],
            ["Línea de transporte (alta tensión)", "13.200 a 500.000 V"],
            ["Rayo atmosférico", "> 100.000.000 V"],
          ],
          "Voltajes típicos en distintas fuentes"
        ),

        h2("Corriente (Intensidad)"),
        list([
          "**Símbolo:** I",
          "**Unidad:** amperio (A)",
          "**Definición:** cantidad de carga eléctrica que atraviesa una sección del conductor por unidad de tiempo.",
        ]),
        p("Volviendo a la analogía hidráulica: si el voltaje es la presión, la **corriente es el caudal** — cuántos litros por segundo pasan por la cañería."),
        formula("1 A = 6,24 × 10¹⁸ electrones por segundo", "Definición técnica"),

        critical(
          "**La corriente NO se consume — lo que se consume es la ENERGÍA.** La cantidad de electrones que entran al equipo es la misma que sale. Lo que el equipo aprovecha es la *energía* que transportan, no los electrones mismos.",
          "Error frecuente"
        ),

        h2("Resistencia"),
        list([
          "**Símbolo:** R",
          "**Unidad:** ohmio (Ω)",
          "**Definición:** oposición que ofrece un material al paso de la corriente eléctrica.",
        ]),
        p("En la analogía: el **diámetro de la cañería**. Una cañería estrecha (alta resistencia) deja pasar poco caudal aunque la presión sea alta. Una cañería ancha (baja resistencia) deja pasar mucho caudal con poca presión."),
        p("**Factores que determinan la resistencia de un conductor:**"),
        list([
          "**Material:** el cobre tiene baja resistencia (buen conductor), el hierro tiene más, los aislantes tienen resistencias enormes.",
          "**Longitud:** a más largo, más resistencia (más obstáculos al paso de electrones).",
          "**Sección transversal:** a más grueso, menos resistencia (más \"carril\" para los electrones).",
          "**Temperatura:** en metales, a mayor temperatura, mayor resistencia.",
        ]),

        h2("Las tres magnitudes están relacionadas"),
        p("La relación matemática exacta entre voltaje, corriente y resistencia se llama **Ley de Ohm**, y es el tema de la próxima lección. Pero ya podemos anticipar la intuición: si la presión (V) aumenta, fluye más caudal (I); si la cañería se estrecha (R aumenta), fluye menos caudal."),

        cite("Fuente: Guía Básica de Electricidad, pp. 13-16; Manual Pirelli-SICA, sección Magnitudes."),
      ],
    },

    // ────────────────────────────────────────────────────────────
    {
      id: "m1-l4",
      title: "La Ley de Ohm",
      estimatedMin: 10,
      blocks: [
        p("La **Ley de Ohm**, formulada por Georg Simon Ohm en 1827, es la relación fundamental entre las tres magnitudes eléctricas básicas. Toda la electricidad práctica se apoya en ella."),

        formula("V = I × R", "Fórmula fundamental"),
        p("De aquí se derivan las otras dos formas:"),
        formula("I = V / R     y     R = V / I"),

        h2("Triángulo de Ohm — técnica mnemotécnica"),
        p("Para recordar fácilmente cuál fórmula usar, dibuja un triángulo con V arriba e I, R abajo:"),
        formula("      V\n   ──────\n   I  ×  R", "Triángulo VIR"),
        p("Tapa con el dedo la magnitud que quieres calcular y la fórmula queda visible:"),
        list([
          "Tapas **V** → ves **I × R** → V = I × R",
          "Tapas **I** → ves **V / R** → I = V / R",
          "Tapas **R** → ves **V / I** → R = V / I",
        ]),

        h2("Ejemplos resueltos"),
        example(
          "Un calefactor está conectado a 220 V y tiene una resistencia de 44 Ω.\n¿Cuánta corriente consume?\n\n→ I = V / R = 220 / 44 = 5 A",
          "EJ 2.1 — Calcular corriente"
        ),
        example(
          "Por un motor circulan 8 A y mide 27,5 Ω de resistencia interna.\n¿A qué voltaje está conectado?\n\n→ V = I × R = 8 × 27,5 = 220 V",
          "EJ 2.2 — Calcular voltaje"
        ),
        example(
          "Un foco de incandescencia consume 0,5 A conectado a 220 V.\n¿Cuál es su resistencia?\n\n→ R = V / I = 220 / 0,5 = 440 Ω",
          "EJ 2.3 — Calcular resistencia"
        ),
        example(
          "Una persona con piel mojada tiene resistencia corporal de ~100 Ω.\nSi toca un cable de 220 V, ¿qué corriente atraviesa su cuerpo?\n\n→ I = V / R = 220 / 100 = 2,2 A = 2.200 mA\n→ Esto es 44 veces el umbral mortal (50 mA). **LETAL.**",
          "EJ 2.4 — La importancia práctica"
        ),
        example(
          "El cargador de un celular entrega 5 V y mide 250 Ω en su circuito de salida.\n¿Cuánta corriente entrega?\n\n→ I = V / R = 5 / 250 = 0,02 A = 20 mA",
          "EJ 2.5 — Corriente baja"
        ),

        alert(
          "Cuando una persona toca un conductor con tensión, la corriente que la atraviesa depende de la resistencia de su cuerpo (piel seca: 1.000Ω; piel mojada: 100Ω). La humedad multiplica la peligrosidad por 10."
        ),

        cite("Fuente: Guía Básica de Electricidad, pp. 16-18; ejercicios extraídos del Manual Pirelli-SICA."),
      ],
    },

    // ────────────────────────────────────────────────────────────
    {
      id: "m1-l5",
      title: "Potencia y Energía Eléctrica",
      estimatedMin: 13,
      blocks: [
        p("La **potencia** y la **energía** son las magnitudes que nos permiten dimensionar instalaciones y calcular facturas eléctricas. Son distintas pero relacionadas."),

        h2("Potencia eléctrica (P)"),
        p("**Potencia** es la velocidad a la que se entrega o consume energía. Cuanto mayor la potencia, más rápido se entrega energía."),
        list([
          "**Símbolo:** P",
          "**Unidad:** watt (W) o kilowatt (kW). 1 kW = 1.000 W",
        ]),
        formula("P = V × I", "Definición básica de potencia"),
        p("Combinando con la Ley de Ohm se obtienen dos formas alternativas:"),
        formula("P = V² / R     y     P = I² × R"),

        h2("Energía eléctrica (E)"),
        p("**Energía** es la cantidad total de potencia acumulada en el tiempo. Es lo que mide el medidor de la empresa eléctrica."),
        list([
          "**Símbolo:** E",
          "**Unidad:** vatio-hora (Wh) o kilovatio-hora (kWh). 1 kWh = 1.000 W durante 1 hora",
        ]),
        formula("E = P × t", "Donde t es el tiempo en horas"),

        h2("La factura de electricidad"),
        p("La empresa eléctrica cobra por **kWh consumidos**, no por watts. La factura se calcula así:"),
        formula("Costo = Σ (P_equipo × horas_uso × días_mes) × precio_kWh", "Cálculo de factura"),

        h2("Consumos típicos en una vivienda"),
        table(
          ["Equipo", "Potencia (W)", "Uso típico", "kWh/mes"],
          [
            ["Heladera con freezer", "400", "24 h (ciclo continuo)", "~96"],
            ["Lavarropas", "1.500", "1 h/día", "45"],
            ["Ducha eléctrica", "4.500", "15 min/día", "33,7"],
            ["PC de escritorio", "300", "8 h/día", "72"],
            ["Televisor LED 50\"", "80", "4 h/día", "9,6"],
            ["Aire acondicionado", "2.200", "8 h/día (verano)", "528"],
            ["Foco LED 10W", "10", "5 h/día", "1,5"],
            ["Foco incandescente 100W", "100", "5 h/día", "15"],
          ]
        ),

        critical(
          "**1 HP ≠ 1.000 W.** El caballo de fuerza (HP) equivale a **746 W**, no a 1.000 W. Confundir esto causa errores del 34% en el dimensionamiento de circuitos para motores. La regla correcta es: **1 HP = 746 W**.",
          "Confusión clásica"
        ),

        h2("Ejercicios resueltos"),
        example(
          "Un calefactor de 1.100 W funciona 3 horas al día durante todo el mes.\n¿Cuánta energía consume?\n\n→ E_día = 1.100 × 3 = 3.300 Wh = 3,3 kWh\n→ E_mes = 3,3 × 30 = 99 kWh/mes",
          "EJ 3.1"
        ),
        example(
          "Si el kWh cuesta $0,15, ¿cuánto pagas por el calefactor del EJ 3.1?\n\n→ Costo = 99 × $0,15 = **$14,85/mes**",
          "EJ 3.2 — Costo mensual"
        ),
        example(
          "Una bomba de agua tiene una placa que dice: 1 HP, 220 V.\n¿Cuánta corriente consume?\n\n→ P = 1 × 746 = 746 W\n→ I = P / V = 746 / 220 = 3,39 A",
          "EJ 3.3 — HP a corriente"
        ),
        example(
          "Una vivienda consume al día: 6 focos × 15W × 5h + heladera 400W × 24h + TV 80W × 4h.\n¿Cuál es el consumo mensual?\n\n→ Focos: 6×15×5 = 450 Wh/día\n→ Heladera: 400×24 = 9.600 Wh/día\n→ TV: 80×4 = 320 Wh/día\n→ Total/día: 10.370 Wh = 10,37 kWh\n→ Total/mes (30 días): 311,1 kWh",
          "EJ 3.4 — Vivienda completa"
        ),
        example(
          "Resistencia de 50 Ω conectada a 220 V durante 2 horas.\nCalcula corriente, potencia y energía.\n\n→ I = V/R = 220/50 = 4,4 A\n→ P = V×I = 220×4,4 = 968 W\n→ E = P×t = 968×2 = 1.936 Wh = 1,936 kWh",
          "EJ 3.5 — Integración Ohm + Potencia"
        ),

        note("La fórmula HP a W (1 HP = 746 W) es **clave** para dimensionar motores eléctricos, bombas y compresores. Si la placa del motor dice HP, multiplica por 746 para obtener watts."),

        cite("Fuente: Guía Básica de Electricidad, pp. 18-22; Manual Pirelli-SICA, sección Cálculo de Cargas."),
      ],
    },
  ],

  // ─────────────────────── QUIZ MÓDULO 1 ───────────────────────
  quiz: [
    q("m1-q1",
      "¿Qué es la electricidad?",
      [
        "El calor que sale de los cables",
        "El movimiento ordenado de electrones a través de un conductor",
        "La luz que emiten las lámparas",
        "Cualquier flujo de energía a través de un material",
      ], "b",
      "La electricidad es el movimiento ordenado de electrones (no protones ni neutrones) por un conductor, impulsado por una diferencia de potencial."
    ),
    q("m1-q2",
      "¿Qué unidad mide la intensidad de la corriente eléctrica?",
      ["Voltio (V)", "Watt (W)", "Amperio (A)", "Ohmio (Ω)"], "c",
      "El amperio (A) mide intensidad de corriente. 1 A = 6,24 × 10¹⁸ electrones por segundo."
    ),
    q("m1-q3",
      "Según la analogía hidráulica, ¿a qué corresponde el voltaje?",
      ["Al caudal del agua", "A la presión del agua", "Al diámetro de la cañería", "A la temperatura del agua"], "b",
      "El voltaje es la presión que empuja a los electrones. El caudal es la corriente y el diámetro de la cañería es la resistencia."
    ),
    q("m1-q4",
      "En la Ley de Ohm V = I × R, si V = 220 V y R = 44 Ω, ¿cuánto vale I?",
      ["10 A", "5 A", "0,2 A", "9.680 A"], "b",
      "I = V/R = 220/44 = 5 A."
    ),
    q("m1-q5",
      "Si una persona con piel mojada (R = 100 Ω) toca un cable de 220 V, ¿qué corriente la atraviesa?",
      ["22 mA", "220 mA", "2,2 A (= 2.200 mA)", "0,022 A"], "c",
      "I = V/R = 220/100 = 2,2 A. Esto es 44 veces el umbral mortal de 50 mA — letal en pocos segundos."
    ),
    q("m1-q6",
      "¿Cuál es la unidad de medida de la potencia eléctrica?",
      ["Voltio", "Amperio", "Watt", "Ohmio"], "c",
      "La potencia se mide en watts (W). 1 W = 1 V × 1 A."
    ),
    q("m1-q7",
      "Un calefactor de 1.100 W conectado a 220 V, ¿cuánta corriente consume?",
      ["0,2 A", "5 A", "242 A", "1.100 A"], "b",
      "I = P/V = 1.100/220 = 5 A."
    ),
    q("m1-q8",
      "¿Cuánto equivale 1 HP en watts?",
      ["1.000 W", "100 W", "746 W", "220 W"], "c",
      "1 HP = 746 W. Confundir con 1.000 W causa errores del 34% en el dimensionamiento."
    ),
    q("m1-q9",
      "Si un electrodoméstico de 2.000 W funciona 5 horas al día durante 30 días, ¿cuántos kWh consume?",
      ["10 kWh", "100 kWh", "300 kWh", "600 kWh"], "c",
      "E = 2.000 × 5 × 30 = 300.000 Wh = 300 kWh."
    ),
    q("m1-q10",
      "Una bomba de 0,5 HP conectada a 220 V, ¿qué corriente consume aproximadamente?",
      ["1,7 A", "5 A", "23 A", "165 A"], "a",
      "P = 0,5 × 746 = 373 W → I = 373/220 ≈ 1,7 A."
    ),
    q("m1-q11",
      "¿Qué factor NO afecta la resistencia de un conductor?",
      ["Material del conductor", "Longitud del conductor", "Color del aislante", "Sección transversal"], "c",
      "El color del aislante es solo identificación. La resistencia depende de material, longitud, sección y temperatura."
    ),
    q("m1-q12",
      "¿Por qué se impuso la corriente alterna sobre la continua en la distribución eléctrica?",
      [
        "Es más segura para las personas",
        "Permite transformar fácilmente el voltaje para transporte a larga distancia",
        "Consume menos electricidad",
        "Es más fácil de generar",
      ], "b",
      "La CA permite usar transformadores para subir el voltaje (mínimas pérdidas en transporte) y bajarlo cerca del usuario. Esto fue decisivo en la guerra de las corrientes."
    ),
    q("m1-q13",
      "Una resistencia de 50 Ω se conecta a 220 V. ¿Qué potencia disipa?",
      ["P = 4,4 W", "P = 11.000 W", "P = 968 W", "P = 270 W"], "c",
      "P = V²/R = 220²/50 = 48.400/50 = 968 W. También: I = 220/50 = 4,4 A; P = V·I = 220·4,4 = 968 W."
    ),
    q("m1-q14",
      "Si el kWh cuesta $0,12 y consumes 250 kWh al mes, ¿cuánto pagas?",
      ["$3", "$12", "$30", "$300"], "c",
      "Costo = 250 × $0,12 = $30."
    ),
    q("m1-q15",
      "La corriente eléctrica NO se consume — lo que se consume es:",
      [
        "El voltaje del circuito",
        "La energía que transporta la corriente",
        "Los electrones del cobre",
        "El amperaje del cable",
      ], "b",
      "Los electrones no se gastan: la misma cantidad entra y sale del equipo. Lo que se consume es la **energía** que esos electrones transportan, transformada en luz/calor/movimiento."
    ),
  ],
};
