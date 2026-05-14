import type { Module } from "@/types/content";
import { p, h2, concept, critical, formula, example, alert, note, list, table, cite, q } from "./_helpers";

export const m5Protecciones: Module = {
  id: "m5",
  number: 5,
  title: "Protecciones Eléctricas",
  description: "Termomagnéticas, diferenciales, curvas de disparo, regla AEA de coordinación.",
  icon: "🛡️",
  requires: ["m4"],
  lessons: [
    {
      id: "m5-l1",
      title: "Interruptor termomagnético (térmica)",
      estimatedMin: 9,
      blocks: [
        p("El **interruptor termomagnético** —también llamado térmica, breaker o llave termomagnética— es el dispositivo que protege los conductores contra dos fenómenos peligrosos: **sobrecarga** y **cortocircuito**."),

        concept(
          "**La térmica protege el CABLE, NO las personas ni los equipos.** Esta es la confusión más común entre usuarios. Para proteger personas se usa el DIFERENCIAL.",
          "Función real de la térmica"
        ),

        h2("Dos mecanismos de disparo"),
        p("Una térmica tiene dos formas distintas de disparar, cada una con su propio dispositivo interno:"),

        h2("1. Disparo por sobrecarga — bimetálico"),
        list([
          "Una **lámina bimetálica** (dos metales con distinta expansión térmica) se calienta cuando pasa corriente excesiva.",
          "Cuando la corriente supera el valor nominal durante tiempo prolongado, la lámina se dobla y acciona el disparo.",
          "**No es instantáneo:** a 125% de la nominal puede tardar varios minutos; a 200% tarda segundos.",
          "Esto permite tolerar las corrientes de **arranque de motores** sin disparar.",
        ]),

        h2("2. Disparo por cortocircuito — electromagnético"),
        list([
          "Ante un cortocircuito, la corriente sube a valores muy elevados (cientos o miles de amperes) en microsegundos.",
          "Un **electroimán** se acciona instantáneamente.",
          "El disparo ocurre en milisegundos, evitando la destrucción del conductor.",
        ]),

        h2("Valores nominales típicos"),
        table(
          ["Valor (A)", "Uso típico", "Conductor mínimo (Cu)"],
          [
            ["10 A",  "Circuitos pequeños de iluminación",        "AWG 14"],
            ["16 A",  "Iluminación general vivienda",              "AWG 14"],
            ["20 A",  "Tomacorrientes generales",                  "AWG 12"],
            ["25 A",  "Circuitos de mayor demanda",                "AWG 12 (THW)"],
            ["32 A",  "Ducha eléctrica / cargas especiales",       "AWG 10"],
            ["40 A",  "Línea seccional domicilio mediano",         "AWG 8"],
            ["63 A",  "Línea seccional domicilio grande",          "AWG 6"],
            ["80 A",  "Alimentador vivienda grande / local",       "AWG 4"],
            ["100 A", "Alimentador edificio pequeño",              "AWG 2"],
          ]
        ),

        cite("Fuente: Guía Básica de Electricidad, pp. 31-32; Manual Pirelli-SICA, sección Protecciones."),
      ],
    },
    {
      id: "m5-l2",
      title: "Curvas de disparo: B, C y D",
      estimatedMin: 6,
      blocks: [
        p("La **curva de disparo** define cuánto tiempo tarda la térmica en disparar según la magnitud de la corriente. Existen tres curvas principales:"),

        h2("Curva B"),
        list([
          "Dispara entre **3 y 5 veces** la corriente nominal.",
          "**Uso:** circuitos sin cargas inductivas (solo iluminación, electrónica, calefacción resistiva).",
          "No tolera bien picos de arranque de motores.",
        ]),

        h2("Curva C"),
        list([
          "Dispara entre **5 y 10 veces** la corriente nominal.",
          "**Uso:** la más común en instalaciones domiciliarias y comerciales.",
          "Tolera bien arranques de motores pequeños y medianos.",
        ]),

        h2("Curva D"),
        list([
          "Dispara entre **10 y 20 veces** la corriente nominal.",
          "**Uso:** instalaciones con motores grandes y arranques muy fuertes (industrias).",
          "Para uso doméstico es excesiva.",
        ]),

        table(
          ["Curva", "Disparo magnético", "Mejor uso"],
          [
            ["B", "3-5 × In",   "Iluminación, electrónica"],
            ["C", "5-10 × In",  "**Domiciliaria estándar**"],
            ["D", "10-20 × In", "Motores grandes, industria"],
          ]
        ),

        note("Si no sabes qué curva pedir en la ferretería: **curva C**. Es la opción universal para viviendas."),

        cite("Fuente: IEC 60898 — Circuit-breakers for overcurrent protection."),
      ],
    },
    {
      id: "m5-l3",
      title: "Interruptor diferencial (RCD)",
      estimatedMin: 10,
      blocks: [
        p("El **interruptor diferencial** —también llamado RCD (Residual Current Device), GFCI o disyuntor— detecta **diferencias entre la corriente de salida (fase) y la corriente de retorno (neutro)**. Si hay diferencia, la corriente está tomando un camino alternativo: a tierra, o peor, a través del cuerpo humano."),

        concept(
          "**El diferencial protege a las PERSONAS contra electrocución.** Actúa en milisegundos, antes de que la corriente cause fibrilación ventricular.",
          "Función del diferencial"
        ),

        h2("Sensibilidades estándar"),
        table(
          ["Sensibilidad", "Aplicación", "Disparo típico"],
          [
            ["30 mA",  "**General domiciliaria**. Protege contra electrocución grave.", "< 30 ms a 30 mA"],
            ["10 mA",  "**Alta sensibilidad.** Baños, cocinas, piscinas, zonas mojadas.", "< 30 ms a 10 mA"],
            ["300 mA", "Industrial. Protección contra incendio (NO personas).", "< 200 ms"],
            ["500 mA", "Solo protección contra incendio en instalaciones especiales.", "< 200 ms"],
          ]
        ),

        critical(
          "**TÉRMICA ≠ DIFERENCIAL.** La térmica protege CABLES (no personas). El diferencial protege PERSONAS (no cables). **Son complementarios**: una instalación segura necesita AMBOS.",
          "Confusión gravísima"
        ),

        h2("Cómo elegir la sensibilidad"),
        list([
          "**30 mA:** suficiente para uso general en zonas secas (dormitorios, living, comedor).",
          "**10 mA:** obligatorio o muy recomendado en zonas húmedas (baños, cocinas, lavadero).",
          "**Para piscinas y bañeras de hidromasaje:** 10 mA SIEMPRE.",
          "Un diferencial de 30 mA NO dispara si pasan 28 mA por el cuerpo — para zonas críticas usar 10 mA.",
        ]),

        h2("Cómo verificar el diferencial"),
        p("Cada diferencial tiene un **botón TEST** (a veces marcado con \"T\"). Apretarlo simula una fuga: el diferencial debe disparar inmediatamente. **Esta prueba se debe hacer una vez al mes.** Si no dispara → el diferencial está dañado y debe reemplazarse YA."),

        alert(
          "Una instalación SIN diferencial es **legal** en algunas normativas antiguas, pero es PELIGROSA para las personas. Cualquier instalación nueva debe llevar al menos un diferencial general de 30 mA."
        ),

        cite("Fuente: Guía Básica de Electricidad, p. 33; Manual Pirelli-SICA, sección Diferenciales."),
      ],
    },
    {
      id: "m5-l4",
      title: "Regla de coordinación AEA",
      estimatedMin: 8,
      blocks: [
        p("La **regla AEA** (Asociación Electrotécnica Argentina) es **la regla más importante de toda la instalación eléctrica**. Es la diferencia entre una instalación segura y una con riesgo de incendio."),

        formula("Térmica (A)  ≤  Capacidad admisible del conductor (A)", "Regla AEA"),

        h2("Aplicación práctica"),
        table(
          ["Conductor", "Capacidad admisible", "Térmica máxima permitida"],
          [
            ["AWG 14", "20 A", "16 A o 20 A"],
            ["AWG 12", "25 A", "20 A o 25 A"],
            ["AWG 10", "30 A", "25 A o 30 A"],
            ["AWG 8",  "40 A", "40 A"],
            ["AWG 6",  "55 A", "50 A o 55 A"],
            ["AWG 4",  "70 A", "63 A o 70 A"],
            ["AWG 2",  "95 A", "80 A o 95 A"],
          ]
        ),

        critical(
          "**Térmica > capacidad del cable → cable se calienta sin que la térmica dispare → INCENDIO.** Este es el escenario que la regla AEA evita. Es por eso que la regla es inviolable.",
          "Por qué importa"
        ),

        example(
          "Imagina una instalación mal hecha:\nConductor AWG 14 (20A admisible) con térmica de 32A.\n\nSi conectas cargas que suman 25A:\n· El cable AWG 14 está siendo sobrecargado un 25% sobre su límite.\n· El cable se calienta progresivamente hasta los 80-90°C.\n· El aislamiento de PVC empieza a degradarse.\n· La térmica de 32A NO dispara — está dentro de su rango.\n· Después de meses, el aislamiento falla → cortocircuito → incendio en la pared.\n\nCon térmica correcta de 20A: el disparo habría ocurrido antes de cualquier daño.",
          "Escenario de falla típica"
        ),

        h2("La regla complementaria"),
        p("Cuando se elige el conductor, también se aplica la regla inversa: el conductor debe poder soportar la corriente que demandará el circuito + un margen del 25%."),
        formula("Capacidad conductor ≥ I_demanda × 1,25"),

        cite("Fuente: Manual Pirelli-SICA, Sección Protecciones; AEA — Reglamento."),
      ],
    },
    {
      id: "m5-l5",
      title: "Distribución de protecciones en el tablero",
      estimatedMin: 8,
      blocks: [
        p("El **tablero de distribución** aloja todas las protecciones del domicilio. Su organización sigue una configuración estándar que facilita el mantenimiento y la operación."),

        h2("Orden vertical típico (de arriba hacia abajo)"),
        list([
          "**1. Llave general:** termomagnética principal (corta todo el suministro).",
          "**2. Interruptor diferencial general:** 30 mA, valor ≥ a la térmica general.",
          "**3. Termomagnéticas individuales:** una por cada circuito derivado.",
          "**4. Diferenciales adicionales:** para circuitos en zonas húmedas (10 mA).",
        ]),

        h2("Zonas que requieren diferencial obligatorio"),
        table(
          ["Zona", "Diferencial obligatorio", "Sensibilidad mínima"],
          [
            ["Baño completo",          "SÍ", "30 mA (10 mA recomendado)"],
            ["Baño en dormitorio",     "SÍ", "30 mA (10 mA recomendado)"],
            ["Cocina (zona fregadero)","SÍ", "30 mA"],
            ["Lavadero",               "SÍ", "30 mA"],
            ["Garage / jardín",        "SÍ", "30 mA"],
            ["Pileta / piscina",       "SÍ", "**10 mA**"],
            ["Dormitorios / living",   "Recomendado", "30 mA"],
            ["Tomacorrientes generales","Recomendado", "30 mA"],
          ]
        ),

        h2("Dimensionamiento del tablero"),
        p("El tamaño del tablero (cantidad de módulos disponibles) debe ser igual a la suma de protecciones necesarias + **30% de reserva** para ampliaciones futuras."),
        example(
          "Vivienda con:\n· 2 circuitos de iluminación (2 térmicas)\n· 2 circuitos de tomac. gral. (2 térmicas)\n· 1 circuito de tomac. especiales (1 térmica)\n· 1 ducha (1 térmica + 1 diferencial 10mA)\n· 1 térmica general + 1 diferencial general\n\nTotal: 8 protecciones (~10 módulos contando dobles).\nCon 30% de reserva: 10 × 1,3 ≈ 13 módulos.\n→ Comprar tablero de 14 o 18 módulos.",
          "EJ — Cálculo del tablero"
        ),

        note("Es siempre más barato comprar un tablero más grande inicialmente que tener que reemplazarlo después por falta de espacio."),

        cite("Fuente: Manual Pirelli-SICA, sección Distribución."),
      ],
    },
  ],

  quiz: [
    q("m5-q1",
      "¿Qué protege un interruptor termomagnético?",
      ["A las personas", "Al cable conductor", "A los electrodomésticos", "A todo lo anterior"], "b",
      "La térmica protege el CABLE contra sobrecarga y cortocircuito. Para proteger personas se usa el diferencial."
    ),
    q("m5-q2",
      "¿Qué protege un interruptor diferencial?",
      ["Al cable contra sobrecarga", "A las personas contra electrocución", "A los aparatos electrónicos", "Al transformador"], "b",
      "El diferencial detecta fugas de corriente (a tierra o al cuerpo humano) y desconecta antes de causar fibrilación."
    ),
    q("m5-q3",
      "Según la regla AEA, si el conductor es AWG 12 (25A admisible), ¿cuál es la térmica máxima?",
      ["32 A", "40 A", "25 A", "No importa el valor"], "c",
      "Térmica ≤ capacidad del conductor. AWG 12 admite 25A → térmica máxima 25A. Una térmica de 32A NO dispararía cuando el cable ya estaría sobrecargado."
    ),
    q("m5-q4",
      "¿Qué sensibilidad de diferencial es OBLIGATORIA en piscinas?",
      ["30 mA", "300 mA", "10 mA", "500 mA"], "c",
      "10 mA por ser zona de máxima exposición (cuerpo mojado, contacto directo, conductividad alta). 30 mA no es suficientemente sensible para piscinas."
    ),
    q("m5-q5",
      "Una térmica de curva C dispara entre cuántas veces la corriente nominal?",
      ["3-5 × In", "5-10 × In", "10-20 × In", "100 × In"], "b",
      "Curva C: 5-10 × In. Es la curva universal para domiciliaria."
    ),
    q("m5-q6",
      "Si una térmica está mal calibrada (mayor que la capacidad del cable):",
      [
        "Dispara cuando no debe",
        "No dispara cuando el cable se sobrecarga → riesgo de incendio",
        "Aumenta el voltaje del circuito",
        "No afecta a la instalación",
      ], "b",
      "Es el escenario que la regla AEA busca evitar. La térmica está dentro de su rango mientras el cable se calienta hasta dañar el aislamiento."
    ),
    q("m5-q7",
      "Una instalación tiene térmica pero NO diferencial. ¿Qué falta?",
      [
        "Protección al cable",
        "Protección a las personas contra electrocución",
        "Protección contra cortocircuito",
        "Nada, la térmica protege todo",
      ], "b",
      "Sin diferencial, una persona que toque un aparato con fuga a la carcasa puede ser electrocutada porque la térmica no detecta corrientes pequeñas a través del cuerpo."
    ),
    q("m5-q8",
      "¿Cada cuánto debe verificarse el funcionamiento del diferencial con el botón TEST?",
      ["Cada año", "Cada 6 meses", "Mensual", "Nunca"], "c",
      "El botón TEST debe presionarse al menos una vez al mes para verificar que el diferencial dispara. Si no dispara, debe reemplazarse."
    ),
    q("m5-q9",
      "Mecanismo de disparo de la térmica ante sobrecarga:",
      ["Electroimán", "Lámina bimetálica que se dobla al calentarse", "Fusible interno", "Capacitor"], "b",
      "El bimetálico se dobla por el calor de la sobrecarga. El electroimán es para cortocircuito."
    ),
    q("m5-q10",
      "Mecanismo de disparo de la térmica ante cortocircuito:",
      ["Bimetálico", "Electroimán que actúa en milisegundos", "Termocupla", "Resorte mecánico"], "b",
      "El electroimán se acciona instantáneamente con la corriente muy alta del cortocircuito (cientos o miles de A)."
    ),
    q("m5-q11",
      "¿Por qué la térmica tarda en disparar ante sobrecarga leve (125% de In)?",
      [
        "Está defectuosa",
        "Para tolerar arranques de motores sin disparar innecesariamente",
        "Por error de fabricación",
        "Para proteger al diferencial",
      ], "b",
      "El bimetálico tarda porque la corriente solo es ligeramente excesiva. Esto permite tolerar picos de arranque de 5-7× In durante segundos sin disparar."
    ),
    q("m5-q12",
      "En el tablero, ¿cuál es el orden vertical típico de las protecciones (de arriba hacia abajo)?",
      [
        "Térmicas individuales → diferencial → llave general",
        "Llave general → diferencial general → térmicas individuales → diferenciales adicionales",
        "Solo diferenciales",
        "El orden no importa",
      ], "b",
      "El orden permite cortar de manera escalonada: primero todo, luego protección personal, luego cada circuito."
    ),
    q("m5-q13",
      "¿Qué pasa si un diferencial dispara con frecuencia sin causa aparente?",
      [
        "Está dañado y debe reemplazarse",
        "Hay una fuga de corriente real en algún circuito (probablemente humedad o aislamiento dañado)",
        "Es normal, ignorarlo",
        "Anular el diferencial",
      ], "b",
      "El diferencial casi nunca dispara \"por error\". Si dispara, hay una fuga real. NUNCA anular el diferencial — es la única protección contra electrocución."
    ),
    q("m5-q14",
      "Una vivienda tiene 5 térmicas + 1 diferencial + 1 llave general. ¿Qué tablero conviene comprar?",
      ["De 6 módulos", "De 8 módulos", "De 12-14 módulos (con 30% reserva)", "Cualquiera"], "c",
      "Con 30% de reserva para ampliaciones: ~9 × 1,3 ≈ 12 módulos. Mejor 14 o 18 para tener margen."
    ),
    q("m5-q15",
      "Un diferencial de 30 mA, ¿dispara si por el cuerpo de una persona pasan 25 mA?",
      [
        "Sí, siempre",
        "No, está debajo del umbral",
        "Depende del clima",
        "Solo si hay humedad",
      ], "b",
      "El diferencial de 30 mA dispara a partir de 30 mA. Por eso para zonas críticas (baños, piscinas) se usa el de 10 mA — para cubrir corrientes peligrosas menores."
    ),
  ],
};
