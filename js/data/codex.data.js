/* ==========================================================================
   Codex, Missions & Achievements Data
   ========================================================================== */

const missionsData = [
    {
        id: "alpha",
        code: "ANOMALÍA 01 // UNIVERSO 7",
        title: "La Fisura del Páramo Saiyajin",
        status: "completed", // Se actualiza dinámicamente según unlockedCharacters
        desc: "Una distorsión espacio-temporal de origen desconocido atrapó al Príncipe Vegeta en un páramo rocoso. Utilizando los artefactos del Nexo (Radar de Ki, Cristal de Gravedad y Semilla Senzu), Marely logró purificar la corrupción dimensional y forjar una alianza.",
        location: "Cámara Nexus ➜ Páramo Rocoso",
        target: "Vegeta (Príncipe Saiyajin)",
        reward: "Compañero Vegeta (SSJ Blue) + Resonancia Saiyajin"
    },
    {
        id: "beta",
        code: "ANOMALÍA 02 // SECTOR GOTHAM",
        title: "Sombras y Balas en el Callejón",
        status: "active",
        desc: "Los radares multiversales detectan un combate caótico en un laberinto urbano envuelto en niebla química. Dos combatientes con destrezas acrobáticas y armamento letal se enfrentan a un enjambre de sombras dimensionales.",
        location: "Falla Urbana ➜ Distrito Callejón",
        target: "Jason Todd (Red Hood) & Dick Grayson (Nightwing)",
        reward: "Desbloqueo de Técnicas Tácticas y Armamento Sigiloso"
    },
    {
        id: "gamma",
        code: "ANOMALÍA 03 // CIUDAD Z",
        title: "El Vacío del Golpe Absoluto",
        status: "locked",
        desc: "Ondas de choque sísmicas masivas registradas en la órbita de un mundo en ruinas. Una entidad de fuerza inconmensurable parece indiferente ante las fallas del espacio-tiempo, pero la fractura amenaza con colapsar su dimensión.",
        location: "Ruinas Cuánticas ➜ Ciudad Z",
        target: "Saitama (El Héroe por Diversión)",
        reward: "Fuerza Absoluta y Desbloqueo de la Capa del Héroe"
    },
    {
        id: "delta",
        code: "ANOMALÍA 04 // PABELLÓN IMPERIAL",
        title: "El Misterio de la Boticaria",
        status: "locked",
        desc: "Lecturas biológicas inusuales. Una serie de venenos y remedios antiguos han comenzado a interactuar con las partículas del Nexo, abriendo un sendero hacia los jardines interiores de una dinastía lejana.",
        location: "Sector Botánico ➜ Palacio Interior",
        target: "Mao Mao (Boticaria Prodigio)",
        reward: "Elixir de Purificación y Detección de Toxinas"
    }
];

const codexData = [
    {
        id: "marely",
        name: "Marely",
        role: "Viajera del Nexo // Elegida Cuántica",
        image: "assets/images/neutral.png",
        status: "ACTIVA // ANCLA DIMENSIONAL",
        desc: "Protagonista indiscutible de la travesía. Su determinación inquebrantable y su conexión con los artefactos de resonancia le permiten estabilizar las fallas dimensionales que amenazan la existencia del multiverso."
    },
    {
        id: "angel",
        name: "Ángel",
        role: "Administrador & Guardián del Nexo",
        image: "assets/images/angel.png",
        status: "SISTEMA PRINCIPAL // EN LÍNEA",
        desc: "Creador y supervisor de las instalaciones Nexus. Desde su laboratorio central, calibra los motores de salto, analiza las firmas energéticas y vela incondicionalmente por la seguridad y bienestar de Marely."
    },
    {
        id: "vegeta",
        name: "Vegeta",
        role: "Príncipe de los Saiyajin // Universo 7",
        image: "assets/images/vegueta.gif",
        status: "ALIADO RECLUTADO // CÁMARA A 300G",
        desc: "Guerrero supremo liberado del vórtice dimensional por Marely. Con su orgullo restaurado, vigila el Nexo, entrena en la Cámara de Gravedad y ofrece su inmenso poder de Ki para erradicar las fuerzas oscuras."
    },
    {
        id: "saitama",
        name: "Saitama",
        role: "Héroe por Pasatiempo // Clase B",
        image: "assets/images/saitama.gif",
        status: "SEÑAL DETECTADA // EN LETARGO",
        desc: "Poseedor de una fuerza física que desafía cualquier ley cuántica conocida. Su presencia en los radares genera lecturas gravitacionales tan altas que confunden a los sensores del Nexo."
    },
    {
        id: "jason_todd",
        name: "Jason Todd",
        role: "Vigilante Letal // Red Hood",
        image: "assets/images/tood.gif",
        status: "FASE DE RASTREO // ZONA DE COMBATE",
        desc: "Estratega implacable forjado en la adversidad. Su rastro de combate en los callejones dimensionales revela una voluntad de hierro y una lucha constante contra la corrupción de las sombras."
    },
    {
        id: "dick_grayson",
        name: "Dick Grayson",
        role: "Acróbata Nocturno // Nightwing",
        image: "assets/images/dick.gif",
        status: "FASE DE RASTREO // AZOTEAS",
        desc: "Líder natural y acróbata excepcional. Sus reflejos veloces y su carisma son un faro de luz capaz de mantener la esperanza incluso en las situaciones más oscuras del multiverso."
    },
    {
        id: "maomao",
        name: "Mao Mao",
        role: "Boticaria del Palacio Interior",
        image: "assets/images/maomao.gif",
        status: "SEÑAL BIOQUÍMICA // EN EVALUACIÓN",
        desc: "Mente analítica con un conocimiento enciclopédico de botánica, venenos y remedios medicinales. Su curiosidad científica podría desentrañar el origen de la corrupción del Nexo."
    }
];

const achievementsData = [
    {
        id: "awakening",
        title: "Primer Despertar",
        desc: "Personaliza el avatar de Marely e inicia el viaje a través del Sistema Nexus.",
        icon: "🌟"
    },
    {
        id: "explorer",
        title: "Exploradora del Nexo",
        desc: "Visita todas las salas de la estación: Cámara Nexus, Laboratorio y Cámara de Gravedad.",
        icon: "🌌"
    },
    {
        id: "secret_letter",
        title: "Mensaje del Corazón",
        desc: "Encuentra y abre el cofre secreto de Ángel en el Laboratorio.",
        icon: "💌"
    },
    {
        id: "relic_hunter",
        title: "Cazadora de Reliquias",
        desc: "Reúne los 3 artefactos: Radar de Ki, Cristal de Gravedad y Semilla Senzu.",
        icon: "🧭"
    },
    {
        id: "daredevil",
        title: "Desafiante del Príncipe",
        desc: "Estabiliza el portal y cruza hacia el Páramo Rocoso del Universo 7.",
        icon: "⚡"
    },
    {
        id: "pride_restored",
        title: "Orgullo Restaurado",
        desc: "Vence y purifica a Vegeta en el combate táctico del Páramo.",
        icon: "👑"
    },
    {
        id: "saiyan_alliance",
        title: "Alianza Saiyajin",
        desc: "Selecciona a Vegeta como compañero o conversa con él en la Cámara de Gravedad.",
        icon: "🤝"
    },
    {
        id: "terminal_operator",
        title: "Operadora de la Terminal",
        desc: "Accede a la Terminal Multiversal y consulta los registros y el códice.",
        icon: "💻"
    }
];
