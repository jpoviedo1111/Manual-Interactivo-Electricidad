import type { Module } from "@/types/content";
import { p, h2, concept, formula, example, alert, note, list, table, cite, q } from "./_helpers";

export const m6Instalacion: Module = {
  id: "m6",
  number: 6,
  title: "Instalación Domiciliaria y Cálculo de Demanda",
  description: "Método AEA, TP1 (casa 100 m²), TP2 (edificio), proyecto final.",
  icon: "🏠",
  requires: ["m5"],
  lessons: [
    {
      id: "m6-l1",
      title: "Componentes de una instalación domiciliaria",
      estimatedMin: 6,
      blocks: [
        p("Toda instalación domiciliaria, sin importar el tamaño, sigue el mismo orden físico desde la red pública hasta el último tomacorriente:"),

        table(
          ["Componente", "Función", "Observaciones"],
          [
            ["Red pública", "Suministro de energía de la empresa distribuidora", "Monofásica 220V o trifásica 380/220V"],
            ["Acometida", "Conductores red → medidor", "Responsabilidad de la empresa eléctrica"],
            ["Medidor (kWh)", "Mide consumo para facturación", "Propiedad de la empresa eléctrica"],
            ["Llave general", "Primer interruptor de protección del usuario", "Termomagnética calibrada al seccional"],
            ["Línea seccional", "Conductor medidor → tablero", "Calibrado para demanda total"],
            ["Tablero de distribución", "Aloja termomagnéticas y diferenciales", "Accesible, protegido, con espacio de reserva"],
            ["Circuitos derivados", "Tablero → cada grupo de cargas", "Separados por tipo: luz, tomac., especiales"],
            ["Cargas", "Luminarias, tomacorrientes, equipos", "Conectados siempre en paralelo"],
          ]
        ),

        concept(
          "El **límite entre la responsabilidad de la empresa distribuidora y la del usuario** es el medidor. Desde la red hasta el medidor: responsabilidad de la empresa. Desde el medidor hacia adentro: responsabilidad del propietario.",
          "Punto de responsabilidad"
        ),

        cite("Fuente: Manual Pirelli-SICA, sección Instalaciones Domiciliarias."),
      ],
    },
    {
      id: "m6-l2",
      title: "Distribución de circuitos derivados",
      estimatedMin: 7,
      blocks: [
        p("Los circuitos derivados se separan **por tipo de carga**. Nunca mezclar iluminación con tomacorrientes en el mismo circuito — son cargas con perfiles muy distintos."),

        h2("Clasificación AEA según grado de electrificación"),
        table(
          ["Circuito", "Grado medio", "Grado elevado", "Conductor", "Térmica"],
          [
            ["Iluminación",              "1 circuito",  "2 circuitos",  "AWG 14",     "16 A"],
            ["Tomacorrientes generales", "1 circuito",  "2 circuitos",  "AWG 12",     "20 A"],
            ["Tomacorrientes especiales","1 circuito",  "2 circuitos",  "AWG 12",     "20 A"],
            ["Ducha eléctrica",          "1 exclusivo", "1 exclusivo",  "AWG 10",     "25-32 A"],
            ["Aire acondicionado",       "—",           "1 por equipo", "AWG 10-12",  "20-32 A"],
            ["Cocina/Horno eléctrico",   "—",           "1 exclusivo",  "AWG 8-10",   "32-40 A"],
            ["Lavarropas",               "1 exclusivo", "1 exclusivo",  "AWG 12",     "20 A"],
          ]
        ),

        h2("¿Grado medio o elevado?"),
        list([
          "**Grado medio:** vivienda básica sin equipos eléctricos de alta potencia (sin AC, sin cocina eléctrica).",
          "**Grado elevado:** vivienda con AC, cocina eléctrica, electrodomésticos modernos.",
          "En la práctica, **casi todas las viviendas modernas son grado elevado**.",
        ]),

        note("Las normas pueden parecer rigurosas, pero **están diseñadas para evitar incendios y electrocuciones**. Cumplirlas no es opcional."),

        cite("Fuente: Manual Pirelli-SICA, sección TP1; AEA — Reglamento."),
      ],
    },
    {
      id: "m6-l3",
      title: "Método AEA de cálculo de demanda",
      estimatedMin: 10,
      blocks: [
        p("El **Método AEA** permite calcular la demanda eléctrica de una vivienda usando **factores de simultaneidad**. La premisa es: nunca todas las cargas funcionan al máximo al mismo tiempo."),

        concept(
          "**Factor de simultaneidad** = fracción de las cargas que funcionan al máximo en simultáneo. Para iluminación, la AEA estima que solo el 66% está encendido a la vez.",
          "Concepto clave"
        ),

        h2("Factores AEA"),
        table(
          ["Tipo de circuito", "Valor AEA", "Factor"],
          [
            ["Iluminación",              "125 VA por boca", "× 0,66"],
            ["Tomacorrientes generales", "2.200 VA por circuito (valor fijo)", "100%"],
            ["Tomacorrientes especiales","2.750 VA por circuito (valor fijo)", "100%"],
            ["Cargas especiales (ducha, AC)", "Su potencia nominal", "100%"],
          ]
        ),

        h2("Proceso de cálculo — 5 pasos"),
        list([
          "**Paso 1:** Ubicar en plano: medidor, tablero, bocas de luz y tomacorrientes.",
          "**Paso 2:** Clasificar la vivienda como grado medio o elevado.",
          "**Paso 3:** Contar bocas y circuitos. Calcular demanda por tipo:",
          "  · Iluminación: bocas × 125 VA × 0,66",
          "  · Tomac. gral.: circuitos × 2.200 VA",
          "  · Tomac. esp.: circuitos × 2.750 VA",
          "  · Cargas especiales: P (W) = VA",
          "**Paso 4:** Sumar todas las demandas → **Demanda total (VA)**.",
          "**Paso 5:** Calcular corriente seccional: I = demanda / 220.",
          "  · Elegir conductor con I_admisible ≥ I × 1,25 (margen 25%).",
          "  · Elegir térmica con I_térmica ≤ I_admisible (regla AEA).",
        ]),

        formula("I_seccional = Demanda total (VA) / 220 V"),

        example(
          "Vivienda con 12 bocas, 2 circuitos de tomac. gral., 1 de tomac. esp.\n\n· Iluminación: 12 × 125 × 0,66 = 990 VA\n· Tomac. gral.: 2 × 2.200 = 4.400 VA\n· Tomac. esp.: 1 × 2.750 = 2.750 VA\n· TOTAL: 8.140 VA\n\nI_seccional = 8.140 / 220 = 37 A\nMargen 25%: 46 A\n→ Conductor: AWG 8 (40A TW o 50A THW) ✓\n→ Térmica: 40 A",
          "Cálculo paso a paso"
        ),

        cite("Fuente: Manual Pirelli-SICA, Trabajo Práctico N°1."),
      ],
    },
    {
      id: "m6-l4",
      title: "TP1 — Casa unifamiliar 100 m²",
      estimatedMin: 9,
      blocks: [
        p("El **Trabajo Práctico N°1** del Manual Pirelli-SICA es el caso paradigmático: una vivienda unifamiliar de electrificación media de ~100 m². Es el ejercicio del que toda persona que estudia electricidad domiciliaria parte."),

        h2("Datos del proyecto"),
        list([
          "Casa unifamiliar de **100 m²**, electrificación **media**.",
          "Suministro: monofásico 220 V.",
          "8 bocas de luz por circuito × 2 circuitos.",
          "2 circuitos de tomacorrientes generales.",
          "1 circuito de tomacorrientes especiales.",
        ]),

        h2("Cálculo de demanda"),
        table(
          ["Circuito", "Carga", "Factor", "Demanda (VA)", "I (A)", "Conductor", "Térmica"],
          [
            ["C1 — Ilum.", "8 bocas × 125 VA", "× 0,66", "660 VA",  "3,0 A", "AWG 14", "16 A"],
            ["C2 — Ilum.", "8 bocas × 125 VA", "× 0,66", "660 VA",  "3,0 A", "AWG 14", "16 A"],
            ["C3 — Tomac. gral.", "2.200 VA (AEA)", "—", "2.200 VA", "10,0 A", "AWG 12", "20 A"],
            ["C4 — Tomac. gral.", "2.200 VA (AEA)", "—", "2.200 VA", "10,0 A", "AWG 12", "20 A"],
            ["C5 — Tomac. esp.", "2.750 VA (AEA)", "—", "2.750 VA", "12,5 A", "AWG 12", "20 A"],
            ["**TOTAL**", "—", "—", "**8.470 VA**", "**38,5 A**", "**AWG 8**", "**40 A**"],
          ]
        ),

        h2("Verificación seccional"),
        formula("I = 8.470 / 220 = 38,5 A\nMargen 25%: 38,5 × 1,25 = 48 A"),
        p("Conductor seccional: **AWG 8** admite 40 A (TW) o 50 A (THW). Con THW queda con margen suficiente. Térmica general: 40 A."),

        note("Si la línea seccional pasa por ducto compartido con otros cables, o el ambiente es muy caluroso, conviene usar **AWG 6** (55 A) como margen adicional, manteniendo térmica de 40 A."),

        cite("Fuente: Manual Pirelli-SICA, TP1 — pp. variable según edición."),
      ],
    },
    {
      id: "m6-l5",
      title: "TP2 — Edificio multifamiliar de 10 pisos",
      estimatedMin: 7,
      blocks: [
        p("El **Trabajo Práctico N°2** del Manual Pirelli-SICA proyecta un edificio con subsuelo (sala medidores, cisterna), planta baja (local comercial 40 m²) y 10 pisos tipo con 2 unidades de 81 m² cada una. Total: 20 viviendas + 1 local."),

        concept(
          "**La demanda total del edificio NO es la suma directa de las demandas individuales.** Se aplica un factor de simultaneidad global: no todas las unidades consumen al máximo a la vez.",
          "Concepto crítico del TP2"
        ),

        h2("Por qué importa el factor de simultaneidad global"),
        p("Si se sumaran 20 viviendas × 8.470 VA cada una = 169.400 VA → I = 770 A → conductor enorme y carísimo."),
        p("Con el factor de simultaneidad global AEA (típicamente 0,4 a 0,5 para 20 unidades), la demanda real es aproximadamente la mitad. El conductor del alimentador puede ser mucho más delgado."),
        p("**A mayor cantidad de unidades → menor el factor de simultaneidad → más eficiente la instalación.**"),

        h2("Componentes adicionales del TP2"),
        list([
          "**Sala de medidores:** uno por unidad + uno para servicios comunes.",
          "**Servicios comunes:** iluminación de pasillos, bomba de agua, ascensores.",
          "**Local comercial PB:** se calcula como una unidad adicional.",
          "**Línea principal del edificio:** trifásica (380/220 V) para equilibrar las fases.",
        ]),

        note("Aunque cada vivienda recibe suministro monofásico (220 V), el alimentador del edificio es trifásico. Las viviendas se reparten entre las 3 fases para equilibrar la carga."),

        cite("Fuente: Manual Pirelli-SICA, TP2."),
      ],
    },
    {
      id: "m6-l6",
      title: "Proyecto Final — Vivienda con todas las cargas",
      estimatedMin: 12,
      blocks: [
        p("El proyecto final integra todo lo aprendido. Se diseña la instalación completa de una vivienda real con cargas especiales modernas."),

        h2("Enunciado"),
        p("**Vivienda de 100 m²** con: 3 dormitorios, sala-comedor, cocina, 2 baños, lavadero, garage."),
        p("**Equipos:** 2 aires acondicionados de 2.200 W c/u · lavarropas 1.500 W · microondas 1.200 W · heladera 350 W · 18 bocas de luz · 12 tomacorrientes generales · 4 tomacorrientes especiales."),

        h2("Lista de entregables"),
        list([
          "1. Lista de circuitos con tipo, calibre AWG y valor de térmica.",
          "2. Identificación de circuitos que llevan diferencial obligatorio.",
          "3. Cálculo de demanda total con método AEA.",
          "4. Calibre del seccional y valor de la térmica general.",
          "5. Esquema funcional de una instalación conmutada (Esquema 7).",
          "6. Tipo de empalme para unir el seccional al tablero.",
        ]),

        h2("Solución de referencia — Cálculo de demanda"),
        example(
          "Iluminación:    2 circ × 9 bocas × 125 VA × 0,66 = 1.485 VA\nTomac. gral.:   2 circ × 2.200 VA               = 4.400 VA\nTomac. esp.:    2 circ × 2.750 VA               = 5.500 VA\nAC 1 (2.200W):                                    2.200 VA\nAC 2 (2.200W):                                    2.200 VA\nLavarropas:                                       1.500 VA\nMicroondas:                                       1.200 VA\nHeladera (350W):                                    350 VA\n─────────────────────────────────────────────────────\nTOTAL:                                          ~18.835 VA\nI = 18.835 / 220                                = 85,6 A\n\n→ Conductor seccional: AWG 2 (95 A a 75°C)\n→ Térmica general: 80 A",
          "Cálculo paso a paso"
        ),

        h2("Solución de referencia — Circuitos"),
        table(
          ["Circuito", "Tipo", "Conductor", "Térmica", "Diferencial"],
          [
            ["C1-C2", "Iluminación (×2)", "AWG 14", "16 A", "30 mA general"],
            ["C3-C4", "Tomac. gral. (×2)", "AWG 12", "20 A", "30 mA general"],
            ["C5-C6", "Tomac. esp. (×2)", "AWG 12", "20 A", "30 mA / 10 mA cocina"],
            ["C7", "AC 1 (2.200W)", "AWG 12", "20 A", "30 mA"],
            ["C8", "AC 2 (2.200W)", "AWG 12", "20 A", "30 mA"],
            ["C9", "Lavarropas", "AWG 12", "20 A", "30 mA"],
            ["C10", "Heladera (exclusivo)", "AWG 14", "16 A", "30 mA"],
          ]
        ),

        h2("Circuitos con diferencial obligatorio"),
        list([
          "Cocina (zona fregadero): **diferencial 30 mA** (10 mA si hay niños o uso intensivo).",
          "Baño 1 y Baño 2: **diferencial 30 mA** (10 mA recomendado).",
          "Lavadero: **diferencial 30 mA**.",
          "Garage / exteriores: **diferencial 30 mA**.",
        ]),

        h2("Esquema conmutado (Esquema 7) para pasillo"),
        formula(
          "L1 → Conm.A (b1) → bornes 2,3 cruzados → Conm.B (b1) → Foco → N"
        ),

        h2("Empalme del seccional al tablero"),
        p("**Empalme tipo A** (prolongación) en la entrada del tablero, dentro de la caja del tablero. Las puntas del conductor del seccional se prolongan a los bornes del interruptor general con tornillos firmes — no es empalme tradicional sino conexión directa por borne."),

        alert("Una vivienda con esta demanda (85 A) podría requerir suministro trifásico según la empresa eléctrica local. Verificar antes de comprar materiales."),

        cite("Fuente: Manual Pirelli-SICA, TP1 y TP2; Guía Básica de Electricidad, Partes 2-4."),
      ],
    },
  ],

  quiz: [
    q("m6-q1",
      "Según el método AEA, ¿cuántos VA se asignan a un circuito de tomacorrientes generales?",
      ["125 VA", "1.500 VA", "2.200 VA", "2.750 VA"], "c",
      "AEA asigna 2.200 VA fijos por cada circuito de tomac. generales, independiente de cuántos enchufes haya."
    ),
    q("m6-q2",
      "¿Cuál es el factor de simultaneidad AEA para iluminación?",
      ["0,80", "1,00", "0,66", "0,50"], "c",
      "La AEA estima que en promedio solo el 66% de las luces están encendidas a la vez."
    ),
    q("m6-q3",
      "Una vivienda tiene 12 bocas de luz, 2 circuitos de tomac. gral. y 1 especial. ¿Cuál es la demanda?",
      ["1.485 VA", "5.440 VA", "8.140 VA", "12.200 VA"], "c",
      "Iluminación: 12×125×0,66 = 990. Tomac. gral.: 2×2200 = 4.400. Tomac. esp.: 2.750. Total: 8.140 VA."
    ),
    q("m6-q4",
      "Una vivienda tiene demanda total de 8.140 VA. ¿Qué corriente seccional necesita?",
      ["3,7 A", "37 A", "370 A", "37 mA"], "b",
      "I = 8.140 / 220 = 37 A."
    ),
    q("m6-q5",
      "Para 37 A de corriente seccional, ¿qué conductor seccional usar (con margen 25%)?",
      ["AWG 14", "AWG 12", "AWG 8", "AWG 4"], "c",
      "37 × 1,25 = 46 A. AWG 8 admite 40A (TW) o 50A (THW). AWG 12 (25A) no alcanza. AWG 4 es excesivo."
    ),
    q("m6-q6",
      "¿Qué circuito requiere diferencial OBLIGATORIO?",
      ["Iluminación del living", "Tomacorrientes del dormitorio", "Tomacorrientes del baño", "Iluminación de pasillo"], "c",
      "Baño es zona húmeda con contacto directo — diferencial 30 mA mínimo (10 mA recomendado)."
    ),
    q("m6-q7",
      "Un edificio con 20 viviendas, ¿se suma la demanda directamente o se aplica simultaneidad?",
      [
        "Se suma directamente",
        "Se aplica un factor de simultaneidad global (típicamente 0,4-0,5)",
        "Se divide por 2 siempre",
        "Se multiplica por 2 por seguridad",
      ], "b",
      "El factor de simultaneidad global reconoce que no todos consumen al máximo en simultáneo. Cuantas más unidades, menor el factor."
    ),
    q("m6-q8",
      "Una ducha de 4.500W, ¿cómo se calcula su contribución a la demanda?",
      ["Como tomacorriente especial (2.750 VA)", "Al 100% de su potencia (4.500 VA)", "Multiplicada por 0,66", "No cuenta"], "b",
      "Las cargas especiales declaradas (ducha, AC, cocina) cuentan al 100% de su potencia nominal."
    ),
    q("m6-q9",
      "¿Cuál es el primer paso del método AEA?",
      [
        "Comprar el conductor",
        "Ubicar en plano medidor, tablero, bocas y tomacorrientes",
        "Calcular el costo total",
        "Pedir el medidor a la empresa",
      ], "b",
      "Sin saber dónde van los componentes y cuántos son, no se puede calcular nada. Es el paso 1."
    ),
    q("m6-q10",
      "El cálculo de demanda da 85 A. ¿Qué conductor seccional con margen 25% recomendar?",
      ["AWG 6 (55A)", "AWG 4 (70A)", "AWG 2 (95A) o AWG 1/0 (125A)", "AWG 8"], "c",
      "85 × 1,25 = 106 A. AWG 2 admite 95A (límite), AWG 1/0 admite 125A (con margen). AWG 4 y 6 no alcanzan."
    ),
    q("m6-q11",
      "¿De quién es responsabilidad la acometida (red → medidor)?",
      ["Del propietario", "De la empresa distribuidora", "Del municipio", "Del electricista"], "b",
      "Todo lo que está antes del medidor es responsabilidad de la empresa eléctrica. Desde el medidor hacia adentro, es del propietario."
    ),
    q("m6-q12",
      "¿Por qué nunca se mezcla iluminación con tomacorrientes en el mismo circuito?",
      [
        "Por costo",
        "Porque las cargas tienen perfiles distintos y porque al disparar la térmica se pierde la luz en una zona donde hay enchufes",
        "Porque lo prohíbe la AEA estéticamente",
        "Por motivos estéticos",
      ], "b",
      "Si la térmica del circuito mixto disparara por sobrecarga de un enchufe, también quedaría sin luz la zona — peligroso para reparar. La separación es por seguridad y diagnóstico."
    ),
    q("m6-q13",
      "¿Cuál es el formato típico de una línea seccional para una vivienda de 100m² mediana?",
      ["AWG 14", "AWG 10", "AWG 8 (40A) con térmica 40A", "AWG 22"], "c",
      "Para una vivienda media con demanda ~38 A, el seccional AWG 8 con térmica 40A es el dimensionamiento estándar (TP1 Pirelli)."
    ),
    q("m6-q14",
      "Una cocina con: heladera 350W, microondas 1.200W, lavavajillas 2.400W. ¿Cómo se calcula la demanda mínima?",
      [
        "Suma directa: 350+1200+2400 = 3.950 VA",
        "Como 1 circuito tomac. especial: 2.750 VA",
        "Cocina: 1 circuito (2.750 VA) + cargas declaradas (heladera + microondas + lavavajillas al 100%)",
        "Multiplicar por 0,66",
      ], "c",
      "Lo correcto: tomar el circuito de tomac. especial AEA y agregar las cargas grandes individuales al 100%. Las cargas con potencia conocida >1500W se declaran."
    ),
    q("m6-q15",
      "El tablero de una vivienda con 8 circuitos derivados, ¿qué tamaño debe tener?",
      [
        "8 módulos exactos",
        "10-12 módulos (8 circuitos + general + diferencial)",
        "Con 30% reserva: 14-18 módulos",
        "Cualquier tamaño",
      ], "c",
      "Reserva del 30% para ampliaciones futuras: 11 × 1,3 ≈ 14-18 módulos. Comprar grande inicialmente sale más barato que reemplazar después."
    ),
  ],
};
