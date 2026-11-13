/* ==========================================================================
   Global Game State
   ========================================================================== */

// Datos del jugador y personalización
let playerName = "Protagonista";
let playerOutfit = "Neutral";
let playerItem = "Chocolates de Menta 🍫";

// Personaje activo / acompañante multiversal
let selectedCompanion = null;

// Lista de personajes desbloqueados (persiste en localStorage)
let unlockedCharacters = ["Protagonista"];

// Cargar personajes desbloqueados desde localStorage
try {
    const savedUnlocks = localStorage.getItem('nexusUnlockedChars');
    if (savedUnlocks) {
        const parsed = JSON.parse(savedUnlocks);
        if (Array.isArray(parsed)) {
            unlockedCharacters = parsed;
        }
    }
} catch (e) {
    console.warn("No se pudieron cargar los desbloqueos:", e);
}

// Estado de la novela visual
let currentScene = 0;
let isTyping = false;
let isPaused = false;
let typeTimer = null;

// Estado de la fase de exploración
let explorationActive = false;
let explorationNextIndex = 1;

// Estado del prólogo cinemático
let prologueActive = false;
let prologueBusy = false;
let prologueIndex = 0;

// Estado de modales y temporizadores
let charsBuilt = false;
let lockTimer = null;
let toastTimer = null;
