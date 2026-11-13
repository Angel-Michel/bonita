/* ==========================================================================
   Story Scenes & Script Data (Capítulo 1 y 2: El Enigma de Vegeta)
   ========================================================================== */

const story = [
    {
        name: "Sistema",
        image: null, // Sprite de la protagonista con el atuendo elegido
        bg: "bg-room",
        text: "<span class='system-text'>Sincronización multiversal completada. Despiertas desorientada en una cámara de sincronización de alta tecnología. La energía del Nexo vibra a tu alrededor. Objeto inicial detectado: {{ITEM}}. Materialización exitosa a tu lado.</span>",
        choices: [{ text: "[ Incorporarme y mirar a mi alrededor ]", action: "explore", next: 5 }]
    },
    {
        name: "[ ALERTA DEL SISTEMA ]",
        image: "https://cdn-icons-png.flaticon.com/512/8682/8682914.png", // Imagen de sistema/holograma
        bg: "bg-system",
        text: "<span class='system-text'>Buscando en el multiverso... Escaneando Ciudad Gótica y Ciudad Central... Escaneando Asociación de Héroes...</span>",
        choices: [{ text: "[ Ver resultados ]", next: 2 }]
    },
    {
        name: "[ ALERTA DEL SISTEMA ]",
        image: "https://cdn-icons-png.flaticon.com/512/8682/8682914.png",
        bg: "bg-system",
        text: "<span class='system-text'>ERROR. Ningún héroe registrado cumple con los requisitos. Se requiere a la protagonista principal. Identidad confirmada: MARELY.</span>",
        choices: [{ text: "¿Qué está pasando?", next: 3 }]
    },
    {
        name: "Ángel (Admin)",
        image: "assets/images/angel.png", // Sprite del admin Ángel
        bg: "bg-hero",
        text: "Tranquila. He hackeado la interfaz. Sé que te encantan las buenas historias de ficción, los manhwas y los misterios...",
        choices: [{ text: "Así es...", next: 4 }, { text: "¿Quién eres?", next: 4 }]
    },
    {
        name: "Ángel (Admin)",
        image: "assets/images/angel.png",
        bg: "bg-hero",
        text: "Barry Allen puede romper la barrera del tiempo, Dick Grayson tiene la agilidad perfecta y Saitama acaba con todo de un golpe...",
        choices: [{ text: "Sigue...", next: 5 }]
    },
    {
        name: "Guardián del Nexo",
        image: "assets/images/angel.png",
        bg: "bg-room",
        text: "Así que por fin despiertas, viajera. Estás en una cámara de tránsito del Nexo. El objeto que llevas contigo es la primera pieza de tu nueva historia.",
        choices: [{ text: "¿Quién eres?", next: 6 }, { text: "¿Dónde estoy?", next: 6 }]
    },
    {
        name: "Guardián del Nexo",
        image: "assets/images/angel.png",
        bg: "bg-room",
        text: "Soy el primero de los guardianes que custodiarán tu camino. Bienvenida al Nexo, MARELY... Pero espera... ¿sientes esa oscilación gravitacional en el aire? Algo descomunal está rasgando el tejido exterior del Nexo.",
        choices: [
            { text: "[ Acercarme a la consola de monitoreo ]", next: 7 },
            { text: "¿Qué clase de peligro se aproxima?", next: 7 }
        ]
    },
    {
        name: "[ ALERTA ROJA DEL SISTEMA ]",
        image: "https://cdn-icons-png.flaticon.com/512/8682/8682914.png",
        bg: "bg-system",
        text: "<span class='system-text'>¡ALERTA MÁXIMA! Ruptura de coordenadas dimensionales en el Sector 7-Z (Universo 7). Una entidad de Ki arrollador ha quedado atrapada en un vórtice de entropía oscura. Los sensores indican un bucle temporal inestable.</span>",
        choices: [
            { text: "[ Interceptar la transmisión del Sector 7-Z ]", next: 8 }
        ]
    },
    {
        name: "Ángel (Admin)",
        image: "assets/images/angel.png",
        bg: "bg-hero",
        text: "¡MARELY, logré penetrar la interferencia del Sector 7-Z! Mis lecturas revelan una armadura saiyajin de combate... ¡Es el mismísimo Príncipe Vegeta! Pero hay un gran misterio: una fuerza corrupta del Nexo lo mantiene encerrado absorbiendo su energía vital.",
        choices: [
            { text: "¡Tenemos que rescatarlo de inmediato!", next: 9 },
            { text: "¿Vegeta aquí? ¿Cómo terminó en esta dimensión?", next: 9 }
        ]
    },
    {
        name: "Guardián del Nexo",
        image: "assets/images/angel.png",
        bg: "bg-room",
        text: "La fisura que te trajo al Nexo abrió grietas en otras realidades. Si esa anomalía devora el poder de Vegeta, el Nexo colapsará. Pero cuidado: su Ki corrompido es devastador. Debes explorar las salas del Nexo y reunir los 3 Artefactos de Batalla (Radar de Ki, Cristal de Gravedad y Semilla Senzu) para poder desafiarlo y liberarlo en combate.",
        choices: [
            { text: "[ Explorar los Escenarios del Nexo y reunir los Artefactos ]", action: "explore", next: 10 },
            { text: "⚔ [ Entrar a la Arena de Batalla contra Vegeta ] ⚔", action: "startBattle" }
        ]
    },
    {
        name: "Sistema",
        image: null,
        bg: "bg-hero",
        text: "<span class='system-text'>Los sensores dimensionales han fijado las coordenadas de la Arena del Universo 7. Puedes explorar las salas para recoger los artefactos necesarios o iniciar el combate cuando estés lista.</span>",
        choices: [
            { text: "⚔ [ Desafiar a Vegeta en Combate ] ⚔", action: "startBattle" },
            { text: "[ Seguir buscando artefactos en los escenarios ]", action: "explore", next: 10 }
        ]
    },
    {
        name: "Vegeta",
        image: "assets/images/vegueta.gif",
        bg: "bg-system",
        text: "¡¿Quién... quién se atreve a irrumpir aquí?! ¡Maldición! Esta extraña dimensión cree que unas cadenas sombrías pueden doblegar al Príncipe de los Saiyajin... ¡Aléjate de mí si no quieres ser pulverizada, terrícola!",
        choices: [
            { text: "¡No soy tu enemiga! Vine a ayudarte a romper esta prisión.", next: 12 },
            { text: "Cálmate, Príncipe. Este es el Nexo y podemos destruir el sello juntos.", next: 12 }
        ]
    },
    {
        name: "Vegeta",
        image: "assets/images/vegueta.gif",
        bg: "bg-system",
        text: "¿Ayudarme tú? ¡No me hagas reír! He lanzado mi Big Bang Attack contra estas cadenas, pero este código oscuro absorbe los impactos físicos. Espera un segundo... esa extraña energía que portas... ¿qué es ese {{ITEM}} que tienes?",
        choices: [
            { text: "[ Canalizar la frecuencia de tu {{ITEM}} hacia las cadenas ]", next: 13 },
            { text: "Es una reliquia del Nexo. Ángel me dijo que guarda la clave de resonancia.", next: 13 }
        ]
    },
    {
        name: "[ ENIGMA DEL NEXO: SELLO DE VOLUNTAD ]",
        image: "https://cdn-icons-png.flaticon.com/512/8682/8682914.png",
        bg: "bg-system",
        text: "<span class='system-text'>MECANISMO ANCESTRAL ACTIVADO. El núcleo requiere resolver el Enigma de Resonancia para abrir el sello:</span><br><br><i>'En medio de la oscuridad absoluta y la derrota inminente, ¿cuál es la chispa invencible que eleva a un guerrero por encima del destino?'</i>",
        choices: [
            { text: "A) El orgullo inquebrantable y negarse a arrodillarse jamás.", next: 14 },
            { text: "B) La suerte y esperar a que alguien más lo salve.", next: 15 },
            { text: "C) La fuerza ciega sin ninguna convicción.", next: 15 }
        ]
    },
    {
        name: "Vegeta",
        image: "assets/images/vegueta.gif",
        bg: "bg-system",
        text: "¡JA! ¡Exacto! ¡Esa es la esencia de un verdadero guerrero! ¡El orgullo Saiyajin jamás se inclinará ante ningún dios, demonio ni anomalía cósmica! ¡Siente el verdadero poder!",
        choices: [
            { text: "[ ¡Sincronizar el golpe final con Vegeta! ]", next: 16 }
        ]
    },
    {
        name: "Vegeta",
        image: "assets/images/vegueta.gif",
        bg: "bg-system",
        text: "¡Qué estupidez acabas de decir! ¡Un verdadero guerrero solo se sostiene sobre su orgullo y su propia determinación de jamás rendirse! ¡Mírame bien y no vuelvas a dudar!",
        choices: [
            { text: "[ Corregir la postura y canalizar el orgullo de Vegeta ]", next: 16 }
        ]
    },
    {
        name: "Sistema",
        image: "assets/images/vegueta.gif",
        bg: "bg-hero",
        text: "<span class='highlight'>¡CRACK! Las cadenas oscuras estallan en un resplandor dorado y azul deslumbrante. El Ki de Vegeta se desborda disipando la bruma por completo. El vórtice corrupto se estabiliza y una luz estelar llena la sala.</span>",
        choices: [
            { text: "[ Acercarme a Vegeta tras la disipación ]", next: 17 }
        ]
    },
    {
        name: "Vegeta",
        image: "assets/images/vegueta.gif",
        bg: "bg-room",
        text: "Hmph. Admito que sin tu ayuda este laberinto dimensional me habría tomado más tiempo. Tienes agallas, MARELY. No cualquiera se atreve a mirar de frente al Príncipe de los Saiyajin sin temblar.",
        choices: [
            { text: "Gracias, Vegeta. ¿Te unirías a nosotros para proteger el Nexo?", next: 18 }
        ]
    },
    {
        name: "Vegeta",
        image: "assets/images/vegueta.gif",
        bg: "bg-room",
        text: "No recibo órdenes de nadie, pero un Saiyajin siempre paga sus deudas. Si hay enemigos poderosos y misterios que resolver en este multiverso, cuenta con mi poder. ¡Demuéstrame de qué eres capaz!",
        choices: [
            { text: "[ SINCRONIZAR A VEGETA EN EL SISTEMA NEXUS ]", action: "unlockVegeta", next: 19 }
        ]
    },
    {
        name: "[ SISTEMA NEXUS: ACTUALIZACIÓN ]",
        image: "assets/images/vegueta.gif",
        bg: "bg-system",
        text: "<span class='highlight' style='font-size:1.4rem; color:#ffd700; text-shadow:0 0 15px rgba(255,215,0,0.8);'>★ ¡PERSONAJE DESBLOQUEADO: VEGETA (PRÍNCIPE SAIYAJIN)! ★</span><br><br><span class='system-text'>Registro completado. Vegeta ha sido desbloqueado en la Selección de Personajes. Sus técnicas de combate y presencia multiversal están activadas. Tu partida ha sido guardada automáticamente.</span>",
        choices: [
            { text: "✦ Ver informe de Ángel y continuar la aventura ✦", next: 20 },
            { text: "💾 Guardar y regresar a la pantalla de personajes", action: "saveAndTitle" }
        ]
    },
    {
        name: "Ángel (Admin)",
        image: "assets/images/angel.png",
        bg: "bg-hero",
        text: "¡Lo lograste, MARELY! ¡Has liberado a Vegeta del abismo dimensional! Con su poder de combate de nuestro lado, el Nexo es mucho más seguro. Sin embargo, el radar multiversal sigue captando otras señales en peligro... Saitama, Jason Todd, Dick Grayson... El misterio apenas comienza.",
        choices: [
            { text: "¿Quién será el siguiente en necesitar ayuda?", next: 21 },
            { text: "Estamos listos para lo que venga.", next: 21 }
        ]
    },
    {
        name: "Guardián del Nexo",
        image: "assets/images/angel.png",
        bg: "bg-room",
        text: "La aventura del Nexo continuará desentrañando sus mayores secretos. Puedes volver al menú para seleccionar a Vegeta o guardar tu avance y retomar la misión en cualquier momento. ¡Bien hecho, MARELY!",
        choices: [
            { text: "💾 Guardar partida y volver al Menú Principal", action: "saveAndTitle" },
            { text: "[ Explorar los escenarios del Nexo libremente ]", action: "explore", next: 21 }
        ]
    }
];
