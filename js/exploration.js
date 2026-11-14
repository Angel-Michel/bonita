/* ==========================================================================
   Multi-Scenario Exploration & Artifact Gathering System
   ========================================================================== */

function updateArtifactsHud() {
    const slotRadar = document.getElementById('slot-radar');
    const slotCrystal = document.getElementById('slot-crystal');
    const slotSenzu = document.getElementById('slot-senzu');
    const counter = document.getElementById('hud-counter');

    if (slotRadar) slotRadar.classList.toggle('collected', collectedArtifacts.includes('radar'));
    if (slotCrystal) slotCrystal.classList.toggle('collected', collectedArtifacts.includes('crystal'));
    if (slotSenzu) slotSenzu.classList.toggle('collected', collectedArtifacts.includes('senzu'));

    if (counter) counter.innerText = `(${collectedArtifacts.length}/3)`;

    // Ocultar del escenario los ítems que ya fueron recogidos
    const pickupRadar = document.getElementById('pickup-radar');
    const pickupCrystal = document.getElementById('pickup-crystal');
    const pickupSenzu = document.getElementById('pickup-senzu');

    if (pickupRadar) pickupRadar.style.display = collectedArtifacts.includes('radar') ? 'none' : '';
    if (pickupCrystal) pickupCrystal.style.display = collectedArtifacts.includes('crystal') ? 'none' : '';
    if (pickupSenzu) pickupSenzu.style.display = collectedArtifacts.includes('senzu') ? 'none' : '';

    // Actualizar texto del portal
    const portalBtn = document.getElementById('nav-to-portal');
    if (portalBtn) {
        if (collectedArtifacts.length >= 3) {
            portalBtn.innerHTML = '⚡ [ PORTAL ABIERTO: ENFRENTAR A VEGETA ] ⚡';
            portalBtn.style.borderColor = '#00e676';
            portalBtn.style.color = '#00e676';
        } else {
            portalBtn.innerHTML = `🔒 [ PORTAL BLOQUEADO (${collectedArtifacts.length}/3 Artefactos) ]`;
            portalBtn.style.borderColor = '#ffd700';
            portalBtn.style.color = '#ffd700';
        }
    }
}

function checkRoomExploration(room) {
    if (!visitedRooms.includes(room)) {
        visitedRooms.push(room);
    }
    if (visitedRooms.includes('nexus') && visitedRooms.includes('lab') && visitedRooms.includes('gravity')) {
        if (typeof unlockAchievement === 'function') {
            unlockAchievement('explorer');
        }
    }
}

function collectArtifact(id, name, desc) {
    if (!collectedArtifacts.includes(id)) {
        collectedArtifacts.push(id);
        try {
            localStorage.setItem('nexusArtifacts', JSON.stringify(collectedArtifacts));
        } catch (e) {}

        updateArtifactsHud();

        if (collectedArtifacts.length >= 3 && typeof unlockAchievement === 'function') {
            unlockAchievement('relic_hunter');
        }

        if (typeof showSystemToast === 'function') {
            showSystemToast(`★ ¡Artefacto Obtenido: ${name}! ★\n${desc}`);
        }
    }
}

function startExploration(nextIndex) {
    explorationActive = true;
    explorationNextIndex = nextIndex != null ? nextIndex : 1;
    isPaused = false;
    uiChoices.innerHTML = '';
    uiDialogueBox.style.opacity = '0';
    uiDialogueBox.style.pointerEvents = 'none';
    uiLetterModal.classList.remove('active');
    uiLetterModal.style.display = 'none';

    uiExplorationStage.classList.add('active');
    showNexusRoom();
    updateArtifactsHud();
}

function showNexusRoom() {
    if (!explorationActive) return;
    currentExplorationRoom = 'nexus';
    uiBg.className = 'bg-room';
    uiBg.style.backgroundImage = '';
    uiExplorationStage.classList.remove('lab', 'gravity');
    uiExplorationStage.classList.add('nexus');
    checkRoomExploration('nexus');
    updateArtifactsHud();
}

function showLabRoom() {
    if (!explorationActive) return;
    currentExplorationRoom = 'lab';
    uiBg.className = 'bg-lab';
    uiExplorationStage.classList.remove('nexus', 'gravity');
    uiExplorationStage.classList.add('lab');
    checkRoomExploration('lab');
    updateArtifactsHud();
}

function showGravityRoom() {
    if (!explorationActive) return;
    currentExplorationRoom = 'gravity';
    uiBg.className = 'bg-gravity';
    uiExplorationStage.classList.remove('nexus', 'lab');
    uiExplorationStage.classList.add('gravity');

    // Mostrar a Vegeta si está desbloqueado o es el compañero activo
    const isVegetaUnlocked = unlockedCharacters.includes('VEGETA') || unlockedCharacters.includes('vegueta') || selectedCompanion === 'VEGETA';
    uiExplorationStage.classList.toggle('has-vegeta', isVegetaUnlocked);

    checkRoomExploration('gravity');
    updateArtifactsHud();
}

function enterWastelandPortal() {
    if (collectedArtifacts.length < 3) {
        const missing = [];
        if (!collectedArtifacts.includes('radar')) missing.push('Radar de Ki (Laboratorio)');
        if (!collectedArtifacts.includes('crystal')) missing.push('Cristal de Gravedad (Cám. Gravedad)');
        if (!collectedArtifacts.includes('senzu')) missing.push('Semilla Senzu (Cám. Gravedad)');

        if (typeof showSystemToast === 'function') {
            showSystemToast(`🔒 Faltan artefactos para estabilizar la entrada:\n- ${missing.join('\n- ')}`);
        }
        return;
    }

    // Salir de exploración e iniciar el combate contra Vegeta
    if (typeof unlockAchievement === 'function') {
        unlockAchievement('daredevil');
    }
    endExploration(false);
    if (typeof startVegetaBattle === 'function') {
        startVegetaBattle();
    }
}

function endExploration(shouldLoadNext = true) {
    if (!explorationActive) return;
    explorationActive = false;
    uiExplorationStage.classList.remove('active', 'lab', 'nexus', 'gravity');
    uiSecretChest.style.display = 'none';
    uiLetterModal.classList.remove('active');
    uiLetterModal.style.display = 'none';
    uiDialogueBox.style.pointerEvents = '';

    if (shouldLoadNext) {
        loadScene(explorationNextIndex);
    }
}

function closeSecretLetter() {
    uiLetterModal.classList.remove('active');
    uiLetterModal.style.display = 'none';
}

// Listeners de interacción en los escenarios
uiSecretChest.addEventListener('click', function() {
    uiLetterMessage.textContent = '"Marely, realmente te quiero. Eres la única chica a la que le daría todo y haría cualquier cosa por verte feliz."';
    uiLetterModal.style.display = 'flex';
    uiLetterModal.classList.add('active');
    if (typeof unlockAchievement === 'function') {
        unlockAchievement('secret_letter');
    }
});

// Recolección de artefactos
const pickupRadarBtn = document.getElementById('pickup-radar');
if (pickupRadarBtn) {
    pickupRadarBtn.addEventListener('click', () => {
        collectArtifact('radar', 'Radar Dimensional de Ki', 'Te permite detectar y esquivar los ataques a la velocidad de la luz.');
    });
}

const pickupCrystalBtn = document.getElementById('pickup-crystal');
if (pickupCrystalBtn) {
    pickupCrystalBtn.addEventListener('click', () => {
        collectArtifact('crystal', 'Cristal de Gravedad', 'Rompe la barrera de Ki oscuro y aturde al Príncipe Vegeta.');
    });
}

const pickupSenzuBtn = document.getElementById('pickup-senzu');
if (pickupSenzuBtn) {
    pickupSenzuBtn.addEventListener('click', () => {
        collectArtifact('senzu', 'Semilla del Ermitaño (Senzu)', 'Restaura al instante 80 HP y 50 Energía en plena batalla.');
    });
}

// Diálogo con Vegeta en la Cámara de Gravedad tras desbloquearlo
const npcVegetaBtn = document.getElementById('npc-vegeta');
if (npcVegetaBtn) {
    npcVegetaBtn.addEventListener('click', () => {
        const dialogues = [
            '👑 VEGETA: "¡Buen entrenamiento, MARELY! En esta cámara a 300G tu Ki se fortalece. ¡No permitas que ningún enemigo te tome por sorpresa!"',
            '👑 VEGETA: "El Radar de Ki y el Cristal de Gravedad son artefactos útiles, pero tu verdadera fuerza proviene de tu determinación. ¡Sigue así!"',
            '👑 VEGETA: "Siento perturbaciones dimensionales en otros universos... Saitama y Jason Todd podrían estar en peligro. ¡Debemos estar listos!"'
        ];
        const randomQuote = dialogues[Math.floor(Math.random() * dialogues.length)];
        if (typeof showSystemToast === 'function') {
            showSystemToast(randomQuote);
        }
        if (typeof unlockAchievement === 'function') {
            unlockAchievement('saiyan_alliance');
        }
    });
}

// Navegación entre salas
const navToLabBtn = document.getElementById('nav-to-lab');
if (navToLabBtn) navToLabBtn.addEventListener('click', showLabRoom);

const navToGravityBtn = document.getElementById('nav-to-gravity');
if (navToGravityBtn) navToGravityBtn.addEventListener('click', showGravityRoom);

const navPortalBtn = document.getElementById('nav-to-portal');
if (navPortalBtn) navPortalBtn.addEventListener('click', enterWastelandPortal);

uiNavBack.addEventListener('click', showNexusRoom);

const navGravityBackBtn = document.getElementById('nav-gravity-back');
if (navGravityBackBtn) navGravityBackBtn.addEventListener('click', showNexusRoom);

uiLetterCloseBtn.addEventListener('click', closeSecretLetter);
uiLetterModal.addEventListener('click', (e) => {
    if (e.target === uiLetterModal) closeSecretLetter();
});
