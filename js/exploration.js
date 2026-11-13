/* ==========================================================================
   Point & Click Exploration Phase (Lab & Nexus Rooms)
   ========================================================================== */

function startExploration(nextIndex) {
    explorationActive = true;
    explorationNextIndex = nextIndex != null ? nextIndex : 1;
    isPaused = false;
    uiChoices.innerHTML = '';
    uiDialogueBox.style.opacity = '0';
    uiDialogueBox.style.pointerEvents = 'none';
    uiLetterModal.classList.remove('active');
    uiLetterModal.style.display = 'none';
    uiExplorationStage.classList.remove('lab', 'nexus');
    uiExplorationStage.classList.add('active', 'nexus');
    uiSecretChest.style.display = 'none';
    uiBg.style.backgroundImage = '';
    uiBg.className = 'bg-room';
}

function showLabRoom() {
    if (!explorationActive) return;
    uiBg.className = 'bg-lab';
    uiExplorationStage.classList.remove('nexus');
    uiExplorationStage.classList.add('lab');
    uiSecretChest.style.display = 'block';
}

function showNexusRoom() {
    if (!explorationActive) return;
    uiBg.className = 'bg-room';
    uiExplorationStage.classList.remove('lab');
    uiExplorationStage.classList.add('nexus');
    uiSecretChest.style.display = 'none';
}

function endExploration() {
    if (!explorationActive) return;
    explorationActive = false;
    uiExplorationStage.classList.remove('active', 'lab', 'nexus');
    uiSecretChest.style.display = 'none';
    uiLetterModal.classList.remove('active');
    uiLetterModal.style.display = 'none';
    uiDialogueBox.style.pointerEvents = '';
    loadScene(explorationNextIndex);
}

function closeSecretLetter() {
    uiLetterModal.classList.remove('active');
    uiLetterModal.style.display = 'none';
}

// Event Listeners de exploración
uiSecretChest.addEventListener('click', function() {
    uiLetterMessage.textContent = '"Marely, realmente te quiero. Eres la única chica a la que le daría todo y haría cualquier cosa por verte feliz."';
    uiLetterModal.style.display = 'flex';
    uiLetterModal.classList.add('active');
});

uiNavLeft.addEventListener('click', showLabRoom);
uiNavBack.addEventListener('click', showNexusRoom);
uiNavForward.addEventListener('click', endExploration);
uiLetterCloseBtn.addEventListener('click', closeSecretLetter);
uiLetterModal.addEventListener('click', (e) => {
    if (e.target === uiLetterModal) closeSecretLetter();
});
