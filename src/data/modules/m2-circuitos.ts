import type { Module } from "@/types/content";
import { p, h2, critical, formula, example, alert, note, list, table, cite, q } from "./_helpers";

export const m2Circuitos: Module = {
  id: "m2",
  number: 2,
  title: "Circuitos y Corriente Alterna",
  description: "Serie vs paralelo, sistemas mono y trifásico, fase, neutro y tierra.",
  icon: "🔌",
  requires: ["m1"],
  lessons: [
    {
      id: "m2-l1",
      title: "Circuitos en serie",
      estimatedMin: 8,
      blocks: [
        p("Un **circuito en serie** es aquel en que los componentes se conectan uno a continuación del otro, formando un único camino para la corriente. Es la configuración más simple pero la menos usada en instalaciones domiciliarias."),

        h2("Leyes del circuito serie"),
        formula("I_total = I₁ = I₂ = I₃    (corriente igual en todos)"),
        formula("V_total = V₁ + V₂ + V₃    (voltajes se suman)"),
        formula("R_total = R₁ + R₂ + R₃    (resistencias se suman)"),

        h2("Característica crítica"),
        critical(
          "**Si un componente falla (se quema, se afloja, se rompe), TODOS los demás dejan de funcionar.** El circuito queda interrumpido porque solo hay un camino para la corriente.",
          "Punto débil del circuito serie"
        ),
        p("Por eso las guirnaldas navideñas antiguas, conectadas en serie, dejaban de funcionar enteras cuando se quemaba un solo foquito."),

        h2("Ejemplo resuelto"),
        example(
          "Tres resistencias en serie a 120 V: R₁ = 20 Ω, R₂ = 40 Ω, R₃ = 60 Ω.\n\n→ R_total = 20 + 40 + 60 = 120 Ω\n→ I_total = V/R = 120/120 = 1 A\n→ V₁ = I × R₁ = 1 × 20 = 20 V\n→ V₂ = I × R₂ = 1 × 40 = 40 V\n→ V₃ = I × R₃ = 1 × 60 = 60 V\n→ Verificación: V₁+V₂+V₃ = 20+40+60 = 120 V ✓",
          "EJ — Tres resistencias en serie"
        ),

        h2("¿Dónde se usa serie en la práctica?"),
        list([
          "**Interruptores y protecciones:** la térmica va en serie con la carga (corta el circuito al disparar).",
          "**Lámparas LED:** internamente los LEDs van en serie para repartir el voltaje.",
          "**Pilas en linterna:** dos pilas AA en serie dan 3 V.",
          "**Fusibles:** siempre en serie con la carga que protegen.",
        ]),
        note("Una instalación domiciliaria NUNCA conecta los tomacorrientes en serie. Si así fuera, encender la heladera bajaría el voltaje de la TV."),

        cite("Fuente: Guía Básica de Electricidad, pp. 22-24."),
      ],
    },
    {
      id: "m2-l2",
      title: "Circuitos en paralelo",
      estimatedMin: 9,
      blocks: [
        p("Un **circuito en paralelo** es aquel en que los componentes se conectan entre los **mismos dos puntos**, formando múltiples caminos para la corriente. Esta es la configuración usada en todas las instalaciones domiciliarias e industriales."),

        h2("Leyes del circuito paralelo"),
        formula("V_total = V₁ = V₂ = V₃    (voltaje igual en todas las ramas)"),
        formula("I_total = I₁ + I₂ + I₃    (corrientes se suman)"),
        formula("1/R_eq = 1/R₁ + 1/R₂ + 1/R₃"),
        p("Para solo **dos resistencias** en paralelo, se puede usar la fórmula simplificada:"),
        formula("R_eq = (R₁ × R₂) / (R₁ + R₂)"),

        h2("Por qué la red domiciliaria es siempre en paralelo"),
        list([
          "Cada tomacorriente recibe exactamente 220 V, sin importar qué haya conectado en los otros.",
          "Si un equipo se daña, los demás siguen funcionando.",
          "Cada equipo se enciende y apaga independientemente.",
        ]),

        critical(
          "**Agregar más cargas en paralelo NO reduce el voltaje de las cargas existentes.** Pero SÍ aumenta la corriente total del circuito. Es por eso que sobrecargar un circuito con muchos enchufes triples puede causar un incendio en el CABLE (no en los electrodomésticos).",
          "Mito común"
        ),

        h2("Ejemplo resuelto"),
        example(
          "Tres lámparas en paralelo a 220 V:\nL₁ = 100 W → R₁ = 220²/100 = 484 Ω\nL₂ = 60 W  → R₂ = 220²/60  = 807 Ω\nL₃ = 40 W  → R₃ = 220²/40  = 1.210 Ω\n\nCorrientes en cada rama:\n→ I₁ = 220/484  = 0,45 A\n→ I₂ = 220/807  = 0,27 A\n→ I₃ = 220/1210 = 0,18 A\n\nCorriente total: 0,45 + 0,27 + 0,18 = **0,90 A**",
          "EJ — Tres lámparas en paralelo"
        ),

        h2("Aplicaciones prácticas"),
        list([
          "Toda la instalación domiciliaria es en paralelo (tomacorrientes, luminarias).",
          "Pilas conectadas para duplicar capacidad (pero mismo voltaje).",
          "Paneles solares conectados en paralelo para sumar corriente sin cambiar voltaje.",
        ]),

        cite("Fuente: Guía Básica de Electricidad, pp. 24-27."),
      ],
    },
    {
      id: "m2-l3",
      title: "Aplicaciones domiciliarias del paralelo",
      estimatedMin: 7,
      blocks: [
        p("Como vimos, toda la instalación de una vivienda usa conexiones en paralelo. Esto tiene **consecuencias prácticas** importantes que el técnico debe entender."),

        h2("Ventajas del paralelo en una vivienda"),
        list([
          "**Independencia:** la heladera no afecta a la TV, ni a los focos.",
          "**Voltaje uniforme:** cada enchufe entrega 220 V exactos.",
          "**Tolerancia a fallas:** si un foco se quema, los demás siguen funcionando.",
          "**Modularidad:** se pueden agregar circuitos sin rehacer la instalación.",
        ]),

        h2("Consecuencias importantes"),
        p("Como las cargas se suman, **cada equipo nuevo conectado AUMENTA la corriente total** del circuito. Si el circuito está dimensionado para 20 A y conectamos demasiados aparatos, la térmica disparará — o peor, si la térmica está mal calibrada, el cable se calentará silenciosamente hasta provocar un incendio."),

        example(
          "Un circuito de tomacorrientes (AWG 12, térmica de 20 A) tiene conectados:\n· TV: 80 W → 0,36 A\n· PC: 300 W → 1,36 A\n· Lámpara: 60 W → 0,27 A\n· Cargadores varios: 50 W → 0,23 A\n\nCorriente total: 2,22 A → muy lejos del límite.\n\nSi sumamos una plancha de 1.500 W → 6,8 A.\nTotal nuevo: **9 A**. Aún seguro.\n\nSi además sumamos otra plancha de 2.000 W:\nTotal: 18 A. **Cerca del límite de la térmica.**\nUna sola plancha más → DISPARA.",
          "Ejemplo de impacto progresivo"
        ),

        alert(
          "Las regletas y enchufes triples NO aumentan la capacidad del circuito. Solo redistribuyen el espacio físico de los enchufes. La corriente total sigue limitada por la térmica."
        ),

        h2("Regla práctica para el usuario"),
        list([
          "No usar **enchufes múltiples** para cargas pesadas (planchas, calefactores).",
          "Cada **carga >1.500 W** debería tener tomacorriente con su propio circuito o, si es muy grande, su circuito exclusivo.",
          "**Nunca** conectar dos regletas en cascada (\"daisy chain\") — multiplica el riesgo.",
        ]),

        cite("Fuente: Guía Básica de Electricidad, p. 27."),
      ],
    },
    {
      id: "m2-l4",
      title: "Corriente continua vs corriente alterna",
      estimatedMin: 9,
      blocks: [
        p("La energía eléctrica se distribuye en dos formas: **corriente continua (CC)** y **corriente alterna (CA)**. Entender la diferencia es fundamental para no cometer errores costosos."),

        h2("Corriente Continua (CC / DC)"),
        list([
          "Los electrones fluyen siempre en la **misma dirección**.",
          "El voltaje es constante en valor y polaridad.",
          "**Frecuencia: 0 Hz** (no cambia).",
          "Fuentes típicas: pilas, baterías, paneles solares, fuentes reguladas.",
          "Aplicaciones: electrónica, telecomunicaciones, autos, sistemas portátiles.",
        ]),

        h2("Corriente Alterna (CA / AC)"),
        list([
          "Los electrones **invierten su dirección periódicamente** (50 o 60 veces por segundo).",
          "El voltaje oscila entre valor positivo y negativo en forma sinusoidal.",
          "**Frecuencia: 50 Hz** (Argentina, Europa, Sudamérica) o **60 Hz** (México, EE.UU., parte de Japón).",
          "Fuentes típicas: generadores eléctricos, red pública.",
          "Aplicaciones: distribución eléctrica domiciliaria e industrial.",
        ]),

        table(
          ["Característica", "Corriente Continua (CC)", "Corriente Alterna (CA)"],
          [
            ["Dirección de flujo", "Constante", "Invierte 50 o 60 veces/seg"],
            ["Frecuencia", "0 Hz", "50 o 60 Hz"],
            ["Polaridad", "Tiene + y −", "No tiene polaridad fija"],
            ["Transformación de voltaje", "Difícil (requiere electrónica)", "Fácil (transformador)"],
            ["Transmisión a larga distancia", "Pérdidas altas", "Pérdidas mínimas a alta tensión"],
            ["Fuentes típicas", "Pilas, baterías, paneles solares", "Red eléctrica, generadores"],
            ["Aplicaciones", "Electrónica, autos", "Instalaciones domiciliarias e industriales"],
          ]
        ),

        h2("¿Por qué la red usa CA?"),
        p("La CA permite **transformar** fácilmente el voltaje. Para llevar electricidad desde una central a 500 km de distancia, conviene subirla a 132.000 V (poca corriente → poca pérdida) y bajarla en transformadores cerca del usuario. Esto se hace con transformadores, dispositivos pasivos que SOLO funcionan con CA."),

        alert(
          "**El peligro para las personas es similar en ambas:** A 220 V CA o 200 V CC ya hay riesgo mortal. La CA tiende a causar **tetanización muscular** (la víctima no puede soltar el conductor), mientras que la CC tiende a causar quemaduras profundas. Ambas son peligrosas desde 50 V."
        ),

        cite("Fuente: Guía Básica de Electricidad, pp. 28-30; Manual Pirelli-SICA, sección Distribución."),
      ],
    },
    {
      id: "m2-l5",
      title: "Sistemas monofásico y trifásico",
      estimatedMin: 8,
      blocks: [
        p("La red eléctrica pública se distribuye en dos esquemas principales: **monofásico** (1 fase) o **trifásico** (3 fases). Cada uno tiene aplicaciones distintas."),

        h2("Sistema monofásico (1N~)"),
        list([
          "Una fase (L) + neutro (N).",
          "**Voltaje fase-neutro: 220 V** en Argentina y la mayoría de Sudamérica.",
          "Suministro típico de **viviendas** y pequeños comercios.",
          "Cargas: iluminación, tomacorrientes, electrodomésticos comunes hasta ~10 kW.",
        ]),
        formula("Diagrama: L —— Carga —— N", "Sistema monofásico"),

        h2("Sistema trifásico (3N~)"),
        list([
          "Tres fases (L₁, L₂, L₃) + neutro (N).",
          "**Voltaje entre fases: 380 V** (también llamado \"tensión de línea\").",
          "**Voltaje fase-neutro: 220 V** (cada fase respecto al neutro).",
          "Suministro típico de **industrias, edificios grandes**, motores de alta potencia (>3 HP).",
          "Ventaja: distribución equilibrada de cargas en tres fases → conductores más delgados.",
        ]),

        h2("¿Cuándo se usa trifásico?"),
        table(
          ["Tipo de instalación", "Sistema típico"],
          [
            ["Casa unifamiliar (< 20 kW total)", "Monofásico 220 V"],
            ["Departamento", "Monofásico 220 V"],
            ["Local comercial pequeño", "Monofásico 220 V"],
            ["Local comercial > 15 kVA", "Trifásico 380/220 V"],
            ["Edificio con varios pisos", "Trifásico 380/220 V (alimentador) + monofásico por unidad"],
            ["Industria con motores grandes", "Trifásico 380 V o más"],
            ["Bombas y compresores > 3 HP", "Trifásico (motor más eficiente y barato)"],
          ]
        ),

        h2("Equilibrio en edificios"),
        p("En un edificio trifásico con varios pisos, las unidades se reparten entre las 3 fases para equilibrar la carga. Si todos los departamentos quedaran en la misma fase, esa fase iría sobrecargada mientras las otras dos estarían vacías."),

        cite("Fuente: Manual Pirelli-SICA, sección Sistemas Trifásicos."),
      ],
    },
    {
      id: "m2-l6",
      title: "Fase, neutro y tierra — diferencias críticas",
      estimatedMin: 10,
      blocks: [
        p("Una instalación domiciliaria tiene **tres conductores fundamentales**, cada uno con función distinta. Confundirlos es uno de los errores más peligrosos."),

        h2("Fase (L)"),
        list([
          "**Color (UE):** marrón. **Color (Latinoamérica):** negro o rojo.",
          "**Función:** conductor activo, transporta la energía.",
          "**Voltaje respecto a tierra:** 220 V.",
          "¿Conduce corriente normal? **SÍ.**",
        ]),

        h2("Neutro (N)"),
        list([
          "**Color (universal):** azul claro.",
          "**Función:** conductor de retorno. Cierra el circuito de vuelta al transformador.",
          "**Voltaje respecto a tierra:** 0 V nominalmente.",
          "¿Conduce corriente normal? **SÍ.** (la misma que la fase).",
        ]),

        h2("Tierra (PE — Protective Earth)"),
        list([
          "**Color (universal obligatorio):** verde-amarillo.",
          "**Función:** conductor de protección. Une las carcasas metálicas de equipos al suelo físico (jabalina).",
          "**Voltaje:** 0 V.",
          "¿Conduce corriente normal? **NO.** Solo conduce en caso de falla (cortocircuito a la carcasa).",
        ]),

        critical(
          "**El NEUTRO NO ES LA TIERRA.** El neutro conduce corriente en operación normal (varios amperios). La tierra NO debe conducir corriente normalmente. **Unir N y PE en el tablero del usuario es un error gravísimo** — puede generar diferencias de potencial en las carcasas y electrocutar a personas.",
          "Confusión gravísima"
        ),

        h2("Verificación con voltímetro"),
        p("Estos son los valores que debe leer un multímetro en una instalación bien hecha:"),
        table(
          ["Medición", "Valor normal", "Investigar si...", "Peligro inmediato si..."],
          [
            ["Fase-Neutro (F-N)", "210-230 V (±5%)", "< 200V o > 240V", "< 180V o > 250V"],
            ["Fase-Tierra (F-T)", "210-230 V (±5%)", "Diferencia > 5V vs F-N", "Muy distinto de F-N"],
            ["Neutro-Tierra (N-T)", "0 a 3 V", "3 a 10V con alta demanda", "> 10V (¡PELIGRO!)"],
            ["Neutro-Tierra (sin carga)", "≈ 0 V", "> 2V", "> 5V"],
          ]
        ),

        note("Si la tensión Neutro-Tierra es alta (>10 V), significa que el neutro está dañado o desconectado en algún punto. La instalación es peligrosa hasta que se repare."),

        h2("Función de la tierra"),
        p("La tierra (PE) une todas las **carcasas metálicas** de electrodomésticos (heladera, lavarropa, microondas, computadora) a una jabalina enterrada en el suelo. Si por una falla interna del aparato la fase toca la carcasa, la corriente fluye a tierra y dispara el diferencial — **antes de que toque a una persona**."),
        alert("Sin conductor de tierra, ese mismo aparato fallado tendría su carcasa a 220 V. Al tocarlo, la corriente atraviesa el cuerpo humano. La tierra es vital para la seguridad."),

        cite("Fuente: Guía Básica de Electricidad, pp. 30-35; Manual Pirelli-SICA, sección Conductores."),
      ],
    },
  ],

  quiz: [
    q("m2-q1",
      "En un circuito en serie, si un componente falla:",
      ["Los demás siguen funcionando normalmente", "Toda la corriente se interrumpe", "El voltaje aumenta en los demás", "La corriente se duplica"], "b",
      "En serie hay un solo camino para la corriente. Si un componente se quema o se afloja, el circuito queda abierto y nada funciona."
    ),
    q("m2-q2",
      "En un circuito en paralelo, ¿cómo se relacionan los voltajes?",
      ["V_total = V₁ + V₂ + V₃", "V_total = V₁ × V₂ × V₃", "V_total = V₁ = V₂ = V₃", "V_total = V₁ / V₂"], "c",
      "En paralelo todas las ramas están entre los mismos dos puntos, así que reciben el mismo voltaje."
    ),
    q("m2-q3",
      "Dos resistencias R₁=30Ω y R₂=60Ω en paralelo a 120V. ¿Cuál es la corriente total?",
      ["2 A", "4 A", "6 A", "120 A"], "c",
      "R_eq = 30×60/(30+60) = 20Ω. I_total = 120/20 = 6 A."
    ),
    q("m2-q4",
      "¿Por qué las instalaciones domiciliarias se conectan en paralelo?",
      ["Es más barato", "Cada tomacorriente recibe 220V independientemente", "Es más rápido de instalar", "Lo obliga la AEA por razones estéticas"], "b",
      "El paralelo garantiza voltaje uniforme en todos los puntos y permite que cada equipo funcione de manera independiente."
    ),
    q("m2-q5",
      "Agregar más cargas en paralelo a un circuito:",
      ["Reduce el voltaje de las cargas existentes", "Aumenta la corriente total del circuito", "No cambia nada", "Aumenta el voltaje"], "b",
      "El voltaje no cambia (es paralelo). Lo que aumenta es la corriente total. Si excede el límite del cable, dispara la térmica — o causa incendio si la térmica está mal calibrada."
    ),
    q("m2-q6",
      "¿Cuál es la frecuencia de la red eléctrica en Argentina?",
      ["50 Hz", "60 Hz", "100 Hz", "220 Hz"], "a",
      "En Argentina (y la mayoría de Sudamérica y Europa) la red opera a 50 Hz. En México y EE.UU. es 60 Hz."
    ),
    q("m2-q7",
      "¿Por qué la red eléctrica usa corriente alterna en lugar de continua?",
      ["Es más segura", "Es más fácil de generar", "Permite transformar fácilmente el voltaje para transporte", "Consume menos energía"], "c",
      "La CA puede subir a alta tensión para transportarse sin pérdidas y bajar cerca del usuario. Los transformadores solo funcionan con CA."
    ),
    q("m2-q8",
      "En un sistema trifásico 380/220 V, ¿qué voltaje hay entre dos fases?",
      ["220 V", "380 V", "0 V", "440 V"], "b",
      "380 V es la tensión entre fases (línea-línea). 220 V es entre fase y neutro."
    ),
    q("m2-q9",
      "¿De qué color es el conductor de tierra (PE) universalmente?",
      ["Azul claro", "Marrón", "Verde-amarillo", "Negro"], "c",
      "El verde-amarillo es OBLIGATORIO universalmente para el conductor de tierra. No se usa para nada más."
    ),
    q("m2-q10",
      "¿Qué color tiene el conductor de neutro universalmente?",
      ["Verde-amarillo", "Azul claro", "Rojo", "Marrón"], "b",
      "El azul claro es universal para el neutro."
    ),
    q("m2-q11",
      "En operación normal, ¿el conductor de tierra conduce corriente?",
      ["Sí, igual que el neutro", "Solo a veces", "No, solo en caso de falla", "Sí, pero menos que la fase"], "c",
      "La tierra es un conductor de PROTECCIÓN. Solo conduce cuando hay una falla (ej: una carcasa metálica energizada). Si conduce en operación normal, hay un problema."
    ),
    q("m2-q12",
      "Mido con el multímetro entre Neutro y Tierra: 15 V. ¿Qué indica?",
      ["Es completamente normal", "Aceptable con mucha carga", "Hay un problema: el neutro está dañado o desconectado en algún punto", "Indica una falla del multímetro"], "c",
      "Más de 10V entre N y T es señal de neutro deteriorado o desconectado. La instalación es PELIGROSA hasta resolverlo."
    ),
    q("m2-q13",
      "¿Cuál es la diferencia fundamental entre neutro y tierra?",
      [
        "Son lo mismo, solo diferente color",
        "El neutro conduce corriente normal de retorno; la tierra solo conduce en falla",
        "La tierra es para alta tensión; el neutro para baja",
        "El neutro es solo decorativo",
      ], "b",
      "El neutro lleva la corriente de retorno del circuito (varios amperios). La tierra solo conduce cuando hay un cortocircuito a la carcasa de un equipo."
    ),
    q("m2-q14",
      "Tres resistencias 60Ω en paralelo, ¿cuál es la resistencia equivalente?",
      ["180 Ω", "60 Ω", "20 Ω", "30 Ω"], "c",
      "Para resistencias iguales en paralelo: R_eq = R/n = 60/3 = 20Ω."
    ),
    q("m2-q15",
      "¿Cuándo se justifica instalar suministro trifásico en lugar de monofásico?",
      [
        "Siempre que la vivienda tenga más de 1 dormitorio",
        "Cuando hay cargas grandes (>15 kVA) o motores trifásicos",
        "Solo si el cliente lo paga",
        "Cuando se quieren ahorrar materiales",
      ], "b",
      "El trifásico se usa cuando hay cargas importantes (industria, edificios) o motores grandes. Para viviendas comunes, el monofásico 220V es suficiente."
    ),
  ],
};
