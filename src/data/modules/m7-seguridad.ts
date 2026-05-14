import type { Module } from "@/types/content";
import { p, h2, concept, critical, alert, note, list, table, cite, q } from "./_helpers";

export const m7Seguridad: Module = {
  id: "m7",
  number: 7,
  title: "Seguridad, Diagnóstico y Mantenimiento",
  description: "Riesgos, primeros auxilios, EPP, diagnóstico de fallas, mantenimiento preventivo.",
  icon: "🚨",
  requires: ["m6"],
  lessons: [
    {
      id: "m7-l1",
      title: "Los dos grandes peligros de la electricidad",
      estimatedMin: 9,
      blocks: [
        p("Toda instalación eléctrica mal diseñada, mal ejecutada o mal mantenida presenta dos riesgos principales: **electrocución** e **incendio eléctrico**. Ambos son **completamente prevenibles** con conocimiento, materiales adecuados y buenas prácticas."),

        h2("Electrocución"),
        list([
          "Paso de corriente eléctrica a través del cuerpo humano.",
          "El corazón y el sistema nervioso central son los órganos más vulnerables.",
          "Los efectos dependen de: **intensidad** de corriente, **ruta** por el cuerpo, y **tiempo** de exposición.",
        ]),

        h2("Incendio eléctrico"),
        list([
          "Calentamiento excesivo de conductores o componentes defectuosos que ignita el aislamiento o materiales cercanos.",
          "Se inicia dentro de paredes sin ser detectado.",
          "Causas: subdimensionamiento, empalmes defectuosos, aislamientos deteriorados.",
        ]),

        h2("Tabla de efectos por corriente corporal"),
        table(
          ["Corriente por el cuerpo", "Efecto fisiológico", "Peligro"],
          [
            ["< 1 mA",       "Sin sensación perceptible",                  "Ninguno"],
            ["1 – 5 mA",     "Hormigueo leve",                              "Bajo"],
            ["5 – 10 mA",    "Contracción muscular leve",                   "Moderado"],
            ["10 – 20 mA",   "Contracción severa, dificultad para soltar",  "**ALTO**"],
            ["20 – 50 mA",   "Dolor intenso, dificultad respiratoria",      "**MUY ALTO**"],
            ["50 – 100 mA",  "Fibrilación ventricular (paro cardíaco)",     "**MORTAL**"],
            ["> 100 mA",     "Quemaduras internas, paro cardíaco seguro",   "**MORTAL**"],
            ["> 10.000 mA",  "Quemaduras graves externas por arco",         "**MORTAL**"],
          ]
        ),

        concept(
          "**El diferencial de 30 mA está diseñado para disparar ANTES de alcanzar el umbral mortal de 50 mA.** El de 10 mA protege incluso ante contracciones musculares severas (10-20 mA).",
          "Por qué la sensibilidad importa"
        ),

        cite("Fuente: Guía Básica de Electricidad, p. 36; Manual Pirelli-SICA, sección Seguridad."),
      ],
    },
    {
      id: "m7-l2",
      title: "Factores que determinan la gravedad de la electrocución",
      estimatedMin: 7,
      blocks: [
        p("La gravedad de una descarga eléctrica **no depende solo del voltaje**. Los factores determinantes son varios y se combinan:"),

        table(
          ["Factor", "Descripción", "Implicación práctica"],
          [
            ["**Intensidad (I)**",          "Amperios que atraviesan el cuerpo",                         "Factor más crítico. Depende de V y R_cuerpo."],
            ["**Resistencia del cuerpo**",  "1.000 Ω (piel seca) a 100 Ω (piel mojada)",                "Humedad multiplica la peligrosidad por 10."],
            ["**Ruta de la corriente**",    "Mano-mano es más peligrosa que pie-pie",                    "Mano-mano pasa por el corazón."],
            ["**Tiempo de exposición**",    "A mayor tiempo, mayor daño",                                "El diferencial actúa en < 30 ms para minimizarlo."],
            ["**Frecuencia**",              "50-60 Hz CA es más peligrosa que CC al mismo voltaje",     "CA causa tetanización (la víctima no puede soltar)."],
            ["**Voltaje**",                 "Mayor voltaje → mayor corriente potencial",                 "220 V puede ser mortal. 12 V CC raramente."],
          ]
        ),

        alert("Una piel ligeramente húmeda baja la resistencia corporal en un orden de magnitud. Por eso los baños y cocinas (zonas húmedas) requieren diferenciales más sensibles (10 mA en vez de 30 mA)."),

        h2("Por qué la CA es más peligrosa que la CC al mismo voltaje"),
        p("La corriente alterna a 50-60 Hz causa **tetanización**: los músculos se contraen al ritmo de la frecuencia y la víctima no puede soltar el conductor. Esto multiplica el tiempo de exposición y, por lo tanto, el daño."),
        p("La CC, en cambio, causa una contracción única y violenta — la víctima a menudo \"sale despedida\" del conductor (si no queda enganchada por otros motivos)."),

        cite("Fuente: Manual Pirelli-SICA, sección Seguridad."),
      ],
    },
    {
      id: "m7-l3",
      title: "Protocolo de emergencia ante electrocución",
      estimatedMin: 8,
      blocks: [
        p("Ante un accidente eléctrico, actuar correctamente en los **primeros 30 segundos** puede salvar una vida. Los errores en los primeros momentos son frecuentes y convierten al socorrista en segunda víctima."),

        concept(
          "Los 7 pasos siguientes deben realizarse en este ORDEN ESTRICTO. Saltar un paso o invertirlos puede ser fatal.",
          "Protocolo de emergencia"
        ),

        h2("7 pasos en orden estricto"),
        list([
          "**PASO 1 — NUNCA tocar a la víctima si aún está en contacto con la fuente.** La corriente que la electrocuta también atravesará a quien la toque.",
          "**PASO 2 — CORTAR la alimentación.** Bajar la térmica general o desenchufar el equipo causante. Es lo más rápido y seguro.",
          "**PASO 3 — Si no se puede cortar la corriente:** usar un elemento NO CONDUCTOR (madera seca, plástico, escoba de madera) para separar a la víctima.",
          "**PASO 4 — Llamar a emergencias médicas inmediatamente** (112 / 911 / 911 según país).",
          "**PASO 5 — Verificar respiración y pulso.** Iniciar RCP si está entrenado.",
          "**PASO 6 — Cubrir quemaduras con tela limpia.** NO aplicar cremas ni agua.",
          "**PASO 7 — Mantener a la víctima horizontal y abrigada** hasta la llegada del equipo médico.",
        ]),

        alert("**Toda víctima de electrocución debe ir al hospital aunque diga estar bien.** Las quemaduras eléctricas internas pueden no aparecer en horas y la arritmia cardíaca puede manifestarse retardada."),

        critical(
          "**Tocar a la víctima en contacto con la corriente convierte al socorrista en víctima.** El instinto natural es tomar a la persona del brazo — esto es lo PEOR que se puede hacer si aún está enganchada al conductor.",
          "El error más mortal"
        ),

        cite("Fuente: Cruz Roja Internacional + Manual Pirelli-SICA, sección Primeros Auxilios."),
      ],
    },
    {
      id: "m7-l4",
      title: "Equipos de Protección Personal (EPP)",
      estimatedMin: 6,
      blocks: [
        p("El **EPP** es la última barrera entre el electricista y la corriente. Una herramienta de calidad puede salvarte la vida; una sin certificación es solo decoración."),

        table(
          ["EPP", "Uso principal", "Especificación mínima"],
          [
            ["Guantes dieléctricos",  "Trabajos en tableros y conductores con tensión",  "**Clase 0:** hasta 1.000 V. Clase 1: hasta 7.500 V."],
            ["Calzado dieléctrico",   "Aislamiento del cuerpo respecto al suelo",          "Debe resistir **15 kV.** Verificar integridad antes de cada uso."],
            ["Gafas de seguridad",    "Protección ante arco eléctrico y partículas",       "Obligatorias en tableros energizados."],
            ["Casco dieléctrico",     "Trabajos en altura o bajo líneas energizadas",      "Sin partes metálicas. **Clase E: 20 kV.**"],
            ["Ropa ignífuga",         "Protección ante arco eléctrico en industria",        "Tejido resistente a la llama. NO sintético."],
            ["Alfombra dieléctrica",  "Aislamiento en el puesto de trabajo del tablero",   "Verificar ausencia de perforaciones."],
            ["Detector de tensión",   "Verificar ausencia de tensión antes de trabajar",   "**Categoría CAT III** mínimo para domiciliario."],
          ]
        ),

        note("Los guantes dieléctricos tienen fecha de vencimiento (~12 meses tras primer uso). Verificar visualmente antes de cada uso: cualquier corte, pinchadura o resequedad invalida el guante."),

        h2("Regla de oro: 5 pasos antes de tocar"),
        list([
          "**1. Cortar** la alimentación con la térmica general.",
          "**2. Verificar** ausencia de tensión con detector.",
          "**3. Aislar** el área de trabajo (señalización).",
          "**4. Poner a tierra** si es alta tensión.",
          "**5. EPP** completo antes de empezar.",
        ]),

        cite("Fuente: Manual Pirelli-SICA, sección Seguridad Operacional."),
      ],
    },
    {
      id: "m7-l5",
      title: "Prevención de incendios eléctricos",
      estimatedMin: 6,
      blocks: [
        p("Aproximadamente el **30% de los incendios urbanos tienen origen eléctrico**. La mayoría son completamente prevenibles."),

        h2("Causas frecuentes y prevención"),
        table(
          ["Causa", "Prevención"],
          [
            ["Sobrecargas (muchos aparatos en un circuito)",      "Planificar la distribución de circuitos según la carga prevista."],
            ["Empalmes mal ejecutados (alta R → calor)",           "Usar empalmes A, B, C dentro de caja de registro."],
            ["Conductores subdimensionados",                       "Respetar tabla AWG y regla AEA. Margen del 25%."],
            ["Instalaciones envejecidas (aislamiento deteriorado)","Revisión periódica. Reemplazo preventivo cada 20 años."],
            ["Protecciones incorrectas (térmica sobredimensionada)","Calibrar térmica por debajo de la capacidad del conductor."],
            ["Tomacorrientes flojos (alta R de contacto)",         "Verificar apriete cada año en el mantenimiento."],
            ["Múltiples regletas en cascada",                       "Educar al usuario: nunca conectar regleta en regleta."],
          ]
        ),

        alert(
          "Las **regletas de enchufes triples** son una de las causas más comunes de incendio doméstico. La gente las usa para alimentar cargas pesadas (planchas, calefactores) en circuitos que no fueron dimensionados para ello."
        ),

        h2("Señales de alerta tempranas"),
        p("Antes de que ocurra un incendio, hay señales visibles que deben tomarse en serio:"),
        list([
          "**Tomacorrientes que se calientan al tacto** durante uso normal.",
          "**Olor a plástico quemado** (aunque sea muy leve) cerca de cajas o enchufes.",
          "**Decoloración o tiznado** alrededor de un tomacorriente.",
          "**Chispas al enchufar o desenchufar** un aparato.",
          "**Térmica que dispara con frecuencia.**",
          "**Luces que parpadean** sin motivo aparente.",
        ]),
        alert("Cualquiera de estas señales requiere **revisión inmediata por electricista matriculado**. Ignorarlas es jugar a la ruleta rusa con la propia vivienda."),

        cite("Fuente: Estadísticas Bomberos de la Ciudad + Manual Pirelli-SICA, sección Causas de Incendio."),
      ],
    },
    {
      id: "m7-l6",
      title: "Diagnóstico de las 6 fallas más comunes",
      estimatedMin: 12,
      blocks: [
        p("La metodología de diagnóstico eléctrico siempre sigue el mismo proceso: **observar síntomas → formular hipótesis → medir → identificar causa raíz → resolver**. Saltar pasos lleva a reparaciones incorrectas o peligrosas."),

        h2("Falla 1: La térmica dispara INMEDIATAMENTE al rearmarse"),
        list([
          "**Causa probable:** cortocircuito activo en el circuito.",
          "**Procedimiento:**",
          "  · Desconectar TODAS las cargas del circuito.",
          "  · Rearmar la térmica. Si sigue disparando → cortocircuito en el cableado.",
          "  · Medir resistencia fase-neutro (sin tensión).",
          "  · Valor < 1 Ω confirma cortocircuito.",
          "  · Dividir el circuito por sectores para ubicar el tramo afectado.",
        ]),

        h2("Falla 2: La térmica dispara después de varios minutos"),
        list([
          "**Causa probable:** sobrecarga (suma de cargas supera la nominal).",
          "**Procedimiento:**",
          "  · Medir corriente con pinza amperimétrica.",
          "  · Si I > nominal de la térmica → sobrecarga confirmada.",
          "  · Reducir cargas o dividir el circuito en dos.",
          "  · Verificar que la térmica sea del valor correcto para el conductor.",
        ]),

        h2("Falla 3: El diferencial dispara SIN causa aparente"),
        list([
          "**Causa probable:** fuga de corriente real (pequeña, difícil de detectar).",
          "**Procedimiento:**",
          "  · Desconectar las cargas una a una hasta que el diferencial deje de disparar.",
          "  · La última carga desconectada tiene la fuga.",
          "  · Medir aislamiento del cable con megóhmetro.",
          "  · Valor < 1 MΩ indica aislamiento deteriorado.",
          "  · Revisar cables en zonas húmedas o sujetos a roces.",
        ]),

        h2("Falla 4: Tomacorrientes sin tensión pero la térmica NO disparó"),
        list([
          "**Causa probable:** conductor suelto o empalme defectuoso.",
          "**Procedimiento:**",
          "  · Medir voltaje en cada tomacorriente del circuito.",
          "  · El primero que marca 0 V indica que la falla está antes de él.",
          "  · Abrir la caja del tomacorriente sin tensión y revisar bornes.",
          "  · Verificar empalmes en la caja de derivación previa.",
        ]),

        h2("Falla 5: La iluminación parpadea"),
        list([
          "**Causa probable:** conexión floja, voltaje inestable o lámpara dañada.",
          "**Procedimiento:**",
          "  · Verificar voltaje en la boca de luz con multímetro.",
          "  · Si voltaje estable → falla en la lámpara o el socket.",
          "  · Si voltaje oscila → conexión floja en el circuito.",
          "  · Revisar todos los empalmes y bornes del circuito.",
        ]),

        h2("Falla 6: El diferencial dispara al tocar un aparato metálico"),
        list([
          "**Causa probable:** el aparato tiene fuga a su carcasa.",
          "**Procedimiento:**",
          "  · Desconectar el aparato de la red.",
          "  · Medir resistencia entre conductor y carcasa.",
          "  · Si < ∞ → hay fuga. Aparato debe repararse o descartarse.",
          "  · NO usar el aparato hasta resolver la falla.",
        ]),

        alert("Cuando hay fuga a una carcasa metálica, el diferencial está cumpliendo su función exacta. Aplaudirlo, no anularlo. Sin diferencial, esa misma fuga electrocutaría a la próxima persona que toque el aparato."),

        cite("Fuente: Manual Pirelli-SICA, sección Diagnóstico de Fallas."),
      ],
    },
    {
      id: "m7-l7",
      title: "Mantenimiento preventivo",
      estimatedMin: 5,
      blocks: [
        p("El **mantenimiento preventivo** es la diferencia entre una instalación que dura 30 años y una que falla a los 10. No requiere muchas horas pero sí frecuencia."),

        h2("Cronograma de mantenimiento"),
        table(
          ["Frecuencia", "Tarea", "Quién"],
          [
            ["Mensual",      "Presionar botón TEST de cada diferencial",                            "Propietario"],
            ["Anual",        "Medir voltajes F-N, F-T, N-T en el tablero",                          "Electricista"],
            ["Anual",        "Verificar apriete de todos los bornes del tablero (sin corriente)",  "Electricista"],
            ["Anual",        "Limpiar polvo del tablero",                                            "Propietario"],
            ["Cada 5 años",  "Revisión visual de empalmes y cajas de derivación",                    "Electricista"],
            ["Cada 10 años", "Medición de aislamiento de todos los circuitos (megóhmetro)",         "Electricista matriculado"],
            ["Cada 20 años", "Reemplazo preventivo de la instalación si hay signos de envejecimiento", "Electricista matriculado"],
          ]
        ),

        note("Mantener un **diario de mantenimiento** (anotar fechas, mediciones, intervenciones) es muy útil para detectar tendencias y problemas crecientes."),

        h2("Reemplazo preventivo: ¿cuándo justifica?"),
        list([
          "Aislamientos resecos o agrietados visibles.",
          "Cables con manchas oscuras (calentamiento previo).",
          "Resistencia de aislamiento medida < 5 MΩ.",
          "Cortocircuitos repetidos sin causa clara.",
          "Instalación de más de 30 años con uso intensivo.",
        ]),

        alert("Una instalación vieja puede pasar décadas sin fallar... hasta que falla catastróficamente. El mantenimiento preventivo es siempre más barato que reparar un incendio."),

        cite("Fuente: Manual Pirelli-SICA, sección Mantenimiento; AEA — Recomendaciones de Mantenimiento."),
      ],
    },
  ],

  quiz: [
    q("m7-q1",
      "¿A partir de qué corriente por el cuerpo humano hay riesgo MORTAL de fibrilación ventricular?",
      ["10 mA", "50 mA", "1 A", "100 A"], "b",
      "A partir de 50 mA hay fibrilación ventricular (paro cardíaco). El diferencial de 30 mA está diseñado para disparar antes de llegar a este umbral."
    ),
    q("m7-q2",
      "¿Por qué el diferencial de 10 mA es más seguro que el de 30 mA?",
      [
        "Es más rápido",
        "Dispara con corrientes menores (incluso 10 mA), protegiendo ante zonas húmedas",
        "Tiene mejor diseño",
        "Funciona con CC también",
      ], "b",
      "10 mA es la sensibilidad mejor para zonas críticas (baños, piscinas). Detecta fugas mucho menores que el de 30 mA."
    ),
    q("m7-q3",
      "Ante una persona electrocutada, ¿cuál es el PRIMER paso?",
      [
        "Tocarla para apartarla del conductor",
        "Aplicar agua para enfriar quemaduras",
        "Cortar la alimentación eléctrica",
        "Llamar al médico antes que nada",
      ], "c",
      "PASO 1 (después de \"no tocar\"): cortar la energía. Es lo más rápido y seguro. Llamar al médico es PASO 4."
    ),
    q("m7-q4",
      "¿Qué NO se debe hacer ante una víctima electrocutada todavía en contacto con la fuente?",
      [
        "Cortar la alimentación general",
        "Tocarla con las manos",
        "Llamar a emergencias",
        "Esperar refuerzos",
      ], "b",
      "Tocar a la víctima en contacto con la corriente convierte al socorrista en víctima. Es el error MÁS MORTAL."
    ),
    q("m7-q5",
      "¿Cuál es la categoría mínima de un detector de tensión para instalaciones domiciliarias?",
      ["CAT I", "CAT II", "CAT III", "CAT IV"], "c",
      "CAT III es el mínimo para tableros y circuitos domiciliarios. Menor categoría puede explotar ante una sobretensión transitoria."
    ),
    q("m7-q6",
      "¿Qué porcentaje aproximado de incendios urbanos tienen origen eléctrico?",
      ["5%", "10%", "30%", "70%"], "c",
      "Aproximadamente el 30% — y casi todos son prevenibles con buenas prácticas: dimensionamiento correcto, empalmes en caja, mantenimiento."
    ),
    q("m7-q7",
      "Si la térmica dispara inmediatamente al rearmarse, la causa más probable es:",
      ["Sobrecarga", "Cortocircuito activo en el circuito", "Diferencial dañado", "Voltaje bajo"], "b",
      "El disparo inmediato indica corriente muy alta → cortocircuito. La sobrecarga, en cambio, tarda minutos en disparar."
    ),
    q("m7-q8",
      "Si la térmica dispara después de 5-10 minutos de uso normal:",
      ["Cortocircuito", "Sobrecarga (suma de cargas excede la nominal)", "Diferencial dañado", "Falla del transformador"], "b",
      "El disparo retardado del bimetálico indica sobrecarga sostenida. Reducir cargas o aumentar la capacidad del circuito."
    ),
    q("m7-q9",
      "El diferencial dispara al tocar la heladera. ¿Qué hacer?",
      [
        "Anular el diferencial",
        "Cambiar el diferencial por uno menos sensible",
        "Diagnosticar: el aparato probablemente tiene fuga a la carcasa, debe repararse",
        "Ignorarlo, es normal",
      ], "c",
      "El diferencial está cumpliendo su función. Hay fuga real al cuerpo del aparato. NUNCA anular el diferencial."
    ),
    q("m7-q10",
      "¿Cada cuánto debe presionarse el botón TEST del diferencial?",
      ["Cada año", "Cada 6 meses", "Cada mes", "Solo cuando hay problemas"], "c",
      "Mensual. Es una prueba de 5 segundos que confirma que el diferencial funcionará en caso de emergencia."
    ),
    q("m7-q11",
      "¿Qué EPP es ESENCIAL al trabajar en un tablero domiciliario energizado?",
      [
        "Guantes dieléctricos (Clase 0 mínimo) + gafas + detector de tensión",
        "Solo guantes de algodón",
        "Solo calzado de goma",
        "Nada en particular",
      ], "a",
      "Mínimo guantes dieléctricos clase 0 (1.000V), gafas de seguridad, y verificación de tensión con detector antes de tocar."
    ),
    q("m7-q12",
      "Una persona con piel mojada tiene resistencia corporal de ~100 Ω. Si toca 220V, ¿qué pasa?",
      [
        "Siente solo un cosquilleo",
        "Recibe 2,2 A — descarga mortal en segundos",
        "El cuerpo no conduce con piel mojada",
        "Es seguro porque está mojado",
      ], "b",
      "I = 220/100 = 2,2 A = 2.200 mA. Esto es 44 veces el umbral mortal de 50 mA. Letal."
    ),
    q("m7-q13",
      "En el diagnóstico de fallas, ¿cuál es el orden correcto?",
      [
        "Reemplazar componentes hasta que funcione",
        "Observar síntomas → hipótesis → medir → identificar causa → resolver",
        "Llamar al servicio técnico siempre",
        "Cambiar la térmica primero",
      ], "b",
      "La metodología sistemática evita errores costosos y reparaciones incompletas. Reemplazar al azar es peligroso y caro."
    ),
    q("m7-q14",
      "Olor a plástico quemado cerca de un tomacorriente, ¿qué hacer?",
      [
        "Esperar que pase",
        "Cortar la corriente del circuito y llamar a un electricista urgente",
        "Aplicar agua",
        "Aumentar la corriente para que se 'queme y termine'",
      ], "b",
      "Es una señal de alerta seria. Indica calentamiento por mala conexión o sobrecarga. Cortar la corriente del circuito y revisar antes de volver a usar."
    ),
    q("m7-q15",
      "¿Qué frecuencia se recomienda para la medición de aislamiento (megóhmetro) en una instalación?",
      ["Mensual", "Anual", "Cada 5 años", "Cada 10 años"], "d",
      "El test de aislamiento con megóhmetro se hace cada 10 años. Es laborioso y específico, no se justifica más seguido salvo que haya sospecha de problema."
    ),
  ],
};
