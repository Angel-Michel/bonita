/* ==========================================================================
   Pause Menu, Save System & State Reset
   ========================================================================== */

function openPauseMenu() {
    isPaused = true;
    uiPauseStatus.innerText = 'SISTEMA EN PAUSA';
    uiPauseToggleBtn.innerText = '❚❚ Pausar / Opciones';
    uiPauseMenu.classList.add('active');
}

function closePauseMenu() {
    uiPauseMenu.classList.remove('active');
}

function showSystemToast(message) {
    clearTimeout(toastTimer);
    uiLockText.innerText = message;
    uiLockOverlay.classList.add('show', 'save-mode');
    toastTimer = setTimeout(() => {
        uiLockOverlay.classList.remove('show', 'save-mode');
    }, 1800);
}

function saveGameState() {
    const saveData = {
        name: playerName,
        outfit: playerOutfit,
        item: playerItem,
        scene: currentScene,
        prologueIndex: prologueIndex,
        prologueActive: prologueActive,
        selectedCompanion: selectedCompanion,
        unlockedCharacters: unlockedCharacters,
        collectedArtifacts: collectedArtifacts,
        unlockedAchievements: unlockedAchievements,
        savedAt: new Date().toISOString()
    };
    try {
        localStorage.setItem('nexusSave', JSON.stringify(saveData));
        localStorage.setItem('nexusUnlockedChars', JSON.stringify(unlockedCharacters));
        localStorage.setItem('nexusArtifacts', JSON.stringify(collectedArtifacts));
        localStorage.setItem('nexusAchievements', JSON.stringify(unlockedAchievements));
        checkSaveState();
    } catch (e) {
        console.warn("Error al guardar partida:", e);
    }
    return saveData;
}

function saveAndExit() {
    saveGameState();
    closePauseMenu();
    isPaused = false;
    showSystemToast('💾 AVANCE, ARTEFACTOS Y DESBLOQUEOS GUARDADOS EN EL SISTEMA NEXUS');
    setTimeout(resetToTitle, 1600);
}

function loadSavedGame() {
    try {
        const raw = localStorage.getItem('nexusSave');
        if (!raw) return false;
        const saveData = JSON.parse(raw);

        playerName = saveData.name || 'Protagonista';
        playerOutfit = saveData.outfit || 'Neutral';
        playerItem = saveData.item || 'Chocolates de Menta 🍫';
        selectedCompanion = saveData.selectedCompanion || null;

        if (Array.isArray(saveData.unlockedCharacters)) {
            unlockedCharacters = saveData.unlockedCharacters;
        }

        if (Array.isArray(saveData.collectedArtifacts)) {
            collectedArtifacts = saveData.collectedArtifacts;
        }

        if (Array.isArray(saveData.unlockedAchievements)) {
            unlockedAchievements = saveData.unlockedAchievements;
        }

        uiTitleScreen.classList.add('fade-out');
        setTimeout(() => {
            uiTitleScreen.style.display = 'none';
            uiPauseBtn.classList.add('visible');

            if (saveData.prologueActive && saveData.prologueIndex < prologueLines.length) {
                prologueActive = true;
                prologueIndex = saveData.prologueIndex;
                showPrologueLine(prologueIndex);
            } else {
                loadScene(saveData.scene != null ? saveData.scene : 0);
            }
            showSystemToast(`▶ Partida cargada: ${playerName} (Escena ${saveData.scene != null ? saveData.scene : 0})`);
        }, 600);
        return true;
    } catch (e) {
        console.error("Error al cargar partida guardada:", e);
        return false;
    }
}

function checkSaveState() {
    const continueBtn = document.getElementById('continue-btn');
    if (!continueBtn) return;
    try {
        const raw = localStorage.getItem('nexusSave');
        if (raw) {
            const save = JSON.parse(raw);
            continueBtn.style.display = 'inline-block';
            continueBtn.innerText = `▶ CONTINUAR AVANCE: ${save.name || 'PROTAGONISTA'} (ESCENA ${save.scene != null ? save.scene : 0})`;
        } else {
            continueBtn.style.display = 'none';
        }
    } catch (e) {
        continueBtn.style.display = 'none';
    }
}

function resetToTitle() {
    clearTimeout(toastTimer);
    uiLockOverlay.classList.remove('show', 'save-mode');
    closePauseMenu();
    uiPauseBtn.classList.remove('visible');

    prologueActive = false;
    prologueBusy = false;
    prologueIndex = 0;
    currentScene = 0;
    isPaused = false;
    isTyping = false;
    explorationActive = false;
    clearInterval(typeTimer);

    // Cerrar combate si estaba activo
    const battleStage = document.getElementById('battle-stage');
    if (battleStage) battleStage.classList.remove('active');
    battleActive = false;

    uiVnContainer.classList.remove('glitch-mode');
    uiBg.classList.remove('bg-dark-flicker');
    uiBg.style.backgroundImage = '';
    uiBg.className = 'bg-system';
    uiFlashOverlay.style.display = 'none';
    uiFlashOverlay.style.opacity = '0';
    uiFlashOverlay.style.background = '#ffffff';
    uiDialogueBox.style.opacity = '1';
    uiDialogueBox.style.pointerEvents = '';
    uiExplorationStage.classList.remove('active', 'lab', 'nexus', 'gravity');
    uiLetterModal.classList.remove('active');
    uiLetterModal.style.display = 'none';
    uiChoices.innerHTML = '';
    uiText.innerHTML = '';
    uiSprite.classList.remove('show-sprite');
    uiSprite.src = '';
    uiName.innerText = 'Sistema';

    playerName = 'Protagonista';
    playerOutfit = 'Neutral';
    playerItem = 'Chocolates de Menta 🍫';

    uiPlayerNameInput.value = '';
    uiOutfitOptions.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    uiItemOptions.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    uiAvatarPreview.src = 'assets/images/neutral.png';
    uiPreviewLabel.innerText = 'ATUENDO ACTUAL: NEUTRAL';

    uiCharModal.classList.remove('active');
    uiCharModal.style.display = '';
    uiCharGrid.innerHTML = '';
    charsBuilt = false;
    uiCreatorModal.classList.remove('active', 'fade-out');
    uiCreatorModal.style.display = '';
    uiLinkBtn.disabled = false;
    uiLinkBtn.style.animation = '';

    uiTitleScreen.style.display = '';
    uiTitleScreen.classList.remove('fade-out');
    uiStartBtn.disabled = false;
    uiStartBtn.style.animation = '';

    checkSaveState();
}

// Event Listeners del menú de pausa
uiPauseBtn.addEventListener('click', openPauseMenu);
uiResumeBtn.addEventListener('click', () => {
    isPaused = false;
    closePauseMenu();
});
uiPauseToggleBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    uiPauseStatus.innerText = isPaused ? 'SISTEMA EN PAUSA' : 'ENLACE ACTIVO';
    uiPauseToggleBtn.innerText = isPaused ? '❚❚ Pausar / Opciones' : '▶ Reanudar / Opciones';
});
uiSaveExitBtn.addEventListener('click', saveAndExit);
uiPauseMenu.addEventListener('click', (e) => {
    if (e.target === uiPauseMenu) {
        isPaused = false;
        closePauseMenu();
    }
});
