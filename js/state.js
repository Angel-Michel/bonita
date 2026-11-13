/* ==========================================================================
   Global Game State & Inventory / Battle Variables
   ========================================================================== */

// Datos del jugador y personalización
let playerName = "Protagonista";
let playerOutfit = "Neutral";
let playerItem = "Chocolates de Menta 🍫";

// Personaje activo / acompañante multiversal
let selectedCompanion = null;

// Lista de personajes desbloqueados (persiste en localStorage)
let unlockedCharacters = ["Protagonista"];

// Lista de artefactos recolectados para la batalla (persiste en localStorage)
let collectedArtifacts = [];

// Cargar estado guardado desde localStorage
try {
    const savedUnlocks = localStorage.getItem('nexusUnlockedChars');
    if (savedUnlocks) {
        const parsed = JSON.parse(savedUnlocks);
        if (Array.isArray(parsed)) unlockedCharacters = parsed;
    }
    const savedArtifacts = localStorage.getItem('nexusArtifacts');
    if (savedArtifacts) {
        const parsed = JSON.parse(savedArtifacts);
        if (Array.isArray(parsed)) collectedArtifacts = parsed;
    }
} catch (e) {
    console.warn("No se pudieron cargar los datos de guardado:", e);
}

// Estado de la novela visual
let currentScene = 0;
let isTyping = false;
let isPaused = false;
let typeTimer = null;

// Estado de la fase de exploración multiescenario
let explorationActive = false;
let explorationNextIndex = 1;
let currentExplorationRoom = 'nexus'; // 'nexus', 'lab', 'gravity', 'wasteland'

// Estado de combate (Boss Battle contra Vegeta)
let battleActive = false;
let playerHp = 120;
let playerMaxHp = 120;
let playerEnergy = 100;
let playerMaxEnergy = 100;

let vegetaHp = 300;
let vegetaMaxHp = 300;
let vegetaKi = 50;
let vegetaMaxKi = 100;

let radarDodgeActive = false;
let crystalStunActive = false;
let senzuUsed = false;

// Estado del prólogo cinemático
let prologueActive = false;
let prologueBusy = false;
let prologueIndex = 0;

// Estado de modales y temporizadores
let charsBuilt = false;
let lockTimer = null;
let toastTimer = null;
