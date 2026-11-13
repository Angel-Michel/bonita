/* ==========================================================================
   DOM Element Cache & Core UI Helpers
   ========================================================================== */

// Elementos de la escena y fondo
const uiBg = document.getElementById('scene-bg');
const uiSprite = document.getElementById('character-sprite');
const uiName = document.getElementById('name-tag');
const uiText = document.getElementById('dialogue-text');
const uiChoices = document.getElementById('choices-container');
const uiDialogueBox = document.getElementById('dialogue-box');
const uiVnContainer = document.getElementById('vn-container');
const uiFlashOverlay = document.getElementById('flash-overlay');

// Pantalla de inicio
const uiTitleScreen = document.getElementById('title-screen');
const uiStartBtn = document.getElementById('start-btn');

// Modal de selección de personaje
const uiCharModal = document.getElementById('char-modal');
const uiCharGrid = document.getElementById('char-grid');
const uiCreateBtn = document.getElementById('create-btn');
const uiBackBtn = document.getElementById('back-btn');

// Modal creador de avatar
const uiCreatorModal = document.getElementById('creator-modal');
const uiOutfitOptions = document.getElementById('outfit-options');
const uiItemOptions = document.getElementById('item-options');
const uiLinkBtn = document.getElementById('link-btn');
const uiCreatorBackBtn = document.getElementById('creator-back-btn');
const uiAvatarPreview = document.getElementById('avatar-preview');
const uiPreviewLabel = document.getElementById('preview-label');
const uiPlayerNameInput = document.getElementById('playerNameInput');

// Overlay de acceso denegado / notificaciones
const uiLockOverlay = document.getElementById('lock-overlay');
const uiLockText = document.getElementById('lock-overlay-text');

// Menú de pausa
const uiPauseBtn = document.getElementById('pause-btn');
const uiPauseMenu = document.getElementById('pause-menu');
const uiPauseStatus = document.getElementById('pause-status');
const uiResumeBtn = document.getElementById('resume-btn');
const uiPauseToggleBtn = document.getElementById('pause-toggle-btn');
const uiSaveExitBtn = document.getElementById('save-exit-btn');

// Fase de exploración
const uiExplorationStage = document.getElementById('exploration-stage');
const uiSecretChest = document.getElementById('secret-chest');
const uiNavLeft = document.getElementById('nav-arrow-left');
const uiNavBack = document.getElementById('nav-arrow-back');
const uiNavForward = document.getElementById('nav-arrow-forward');

// Modal de carta secreta
const uiLetterModal = document.getElementById('letter-modal');
const uiLetterMessage = document.getElementById('letter-message');
const uiLetterCloseBtn = document.getElementById('close-letter-btn');

// Carga el sprite del personaje: siempre <img> con PNG transparente
function setCharacterSprite(source) {
    uiSprite.src = source;
}

// Muestra el sprite con su transición de aparición
function showSprite() {
    requestAnimationFrame(() => requestAnimationFrame(() => uiSprite.classList.add('show-sprite')));
}

// Función para escribir el texto (fade-in progresivo)
function typeWriter(htmlText, callback) {
    isTyping = true;
    uiText.innerHTML = htmlText;
    uiText.style.opacity = 0;
    
    let op = 0;
    typeTimer = setInterval(() => {
        if (op >= 1) {
            clearInterval(typeTimer);
            isTyping = false;
            if (callback) callback();
        }
        uiText.style.opacity = op;
        op += 0.05;
    }, 30);
}

// Resuelve el nombre del hablante: los placeholders de la protagonista usan playerName
function resolvePlayerName(name) {
    return (name === 'Marely' || name === '[PROTAGONISTA]') ? playerName : name;
}

// Reemplaza las menciones a la protagonista dentro del texto por el nombre elegido
function resolvePlayerText(text) {
    return text
        .replace(/MARELY|Marely/g, () => playerName)
        .replace(/\{\{ITEM\}\}/g, () => playerItem);
}
