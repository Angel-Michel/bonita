/* ==========================================================================
   Application Bootstrap & Main Entry Point
   ========================================================================== */

// Botón regresar: volver a la pantalla de inicio (title screen)
uiBackBtn.addEventListener('click', () => {
    uiCharModal.classList.remove('active');
    // Reactivar el botón de inicio del title screen
    uiStartBtn.disabled = false;
    uiStartBtn.style.animation = 'start-pulse 2.4s ease-in-out infinite';
    // Reconstruir las tarjetas para que reanimen la entrada la próxima vez
    setTimeout(() => {
        uiCharGrid.innerHTML = '';
        charsBuilt = false;
    }, 800);
});

// Al hacer clic en iniciar: abrir el modal de selección de personaje
uiStartBtn.addEventListener('click', () => {
    uiStartBtn.disabled = true;
    uiStartBtn.style.animation = 'none';
    if (!charsBuilt) buildCharGrid();
    uiCharModal.classList.add('active');
});

// Botón para continuar avance guardado
const continueBtn = document.getElementById('continue-btn');
if (continueBtn) {
    continueBtn.addEventListener('click', () => {
        loadSavedGame();
    });
}

// Botones del modal de detalles de personaje desbloqueado
const detailCloseBtn = document.getElementById('detail-close-btn');
if (detailCloseBtn) {
    detailCloseBtn.addEventListener('click', closeUnlockedCharacterDetails);
}

const detailSelectBtn = document.getElementById('detail-select-btn');
if (detailSelectBtn) {
    detailSelectBtn.addEventListener('click', () => {
        const name = document.getElementById('detail-char-name').innerText;
        selectUnlockedCompanion(name);
    });
}

const detailModal = document.getElementById('char-detail-modal');
if (detailModal) {
    detailModal.addEventListener('click', (e) => {
        if (e.target === detailModal) closeUnlockedCharacterDetails();
    });
}

// Botones de acción del sistema de combate contra Vegeta
const btnAttack = document.getElementById('battle-btn-attack');
if (btnAttack) {
    btnAttack.addEventListener('click', playerAttack);
}

const btnRadar = document.getElementById('battle-btn-radar');
if (btnRadar) {
    btnRadar.addEventListener('click', playerUseRadar);
}

const btnCrystal = document.getElementById('battle-btn-crystal');
if (btnCrystal) {
    btnCrystal.addEventListener('click', playerUseCrystal);
}

const btnSenzu = document.getElementById('battle-btn-senzu');
if (btnSenzu) {
    btnSenzu.addEventListener('click', playerUseSenzu);
}

const btnPride = document.getElementById('battle-btn-pride');
if (btnPride) {
    btnPride.addEventListener('click', playerAppealPride);
}

// Botón de Terminal en el Menú de Pausa
const pauseTerminalBtn = document.getElementById('pause-terminal-btn');
if (pauseTerminalBtn) {
    pauseTerminalBtn.addEventListener('click', () => {
        if (typeof closePauseMenu === 'function') closePauseMenu();
        if (typeof openTerminalModal === 'function') openTerminalModal();
    });
}

// Inicializar la Terminal Multiversal, Misiones y Códice
if (typeof initTerminal === 'function') {
    initTerminal();
}

// Comprobar estado de guardado al iniciar la página
checkSaveState();
