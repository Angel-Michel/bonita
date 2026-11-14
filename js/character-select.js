/* ==========================================================================
   Character Selection & Unlocking Logic
   ========================================================================== */

function unlockCharacter(name) {
    if (!unlockedCharacters.includes(name)) {
        unlockedCharacters.push(name);
    }
    try {
        localStorage.setItem('nexusUnlockedChars', JSON.stringify(unlockedCharacters));
    } catch (e) {}

    // Guardar también el estado general
    if (typeof saveGameState === 'function') {
        saveGameState();
    }

    // Notificación en pantalla
    if (typeof showSystemToast === 'function') {
        showSystemToast(`★ ¡${name} DESBLOQUEADO EN EL SISTEMA NEXUS! ★`);
    }

    // Reconstruir la cuadrícula si está abierta
    charsBuilt = false;
}

function buildCharGrid() {
    uiCharGrid.innerHTML = '';
    selectableChars.forEach((char, i) => {
        const card = document.createElement('div');
        card.className = 'char-card';
        card.dataset.name = char.name;
        card.style.animationDelay = (i * 0.12) + 's';

        const isUnlocked = unlockedCharacters.includes(char.name);

        if (isUnlocked) {
            card.classList.add('unlocked');
            card.innerHTML = `
                <div class="char-lock unlocked" title="Personaje desbloqueado">⭐</div>
                <div class="unlocked-badge">DESBLOQUEADO</div>
                <img src="${char.image}" alt="${char.name}">
                <div class="char-name" style="color:#ffd700;">${char.name}</div>
            `;
            card.onclick = () => showUnlockedCharacterDetails(char);
        } else {
            card.innerHTML = `
                <div class="char-lock" title="Personaje bloqueado">🔒</div>
                <img src="${char.image}" alt="${char.name}">
                <div class="char-name">${char.name}</div>
            `;
            card.onclick = () => showLockedMessage(card);
        }

        uiCharGrid.appendChild(card);
    });
    charsBuilt = true;
}

// Personaje bloqueado: pantalla oscura + mensaje rojo neón durante 2.5 segundos
function showLockedMessage(card) {
    clearTimeout(lockTimer);
    card.classList.add('selected');
    uiLockText.innerText = `🔒 ACCESO DENEGADO: ${card.dataset.name} se desbloqueará al avanzar en el Modo Historia.`;
    uiLockOverlay.classList.add('show');
    lockTimer = setTimeout(() => {
        uiLockOverlay.classList.remove('show');
        card.classList.remove('selected');
    }, 2500);
}

// Mostrar detalles de personaje desbloqueado
function showUnlockedCharacterDetails(char) {
    const detailModal = document.getElementById('char-detail-modal');
    if (!detailModal) return;

    document.getElementById('detail-char-name').innerText = char.name;
    document.getElementById('detail-char-img').src = char.image;

    if (char.name === "VEGETA") {
        document.getElementById('detail-char-desc').innerHTML = `
            <strong>Título:</strong> Príncipe de los Saiyajin (Universo 7)<br>
            <strong>Técnicas:</strong> Big Bang Attack, Final Flash, Súper Saiyajin Blue<br>
            <strong>Estado:</strong> Liberado de la Fisura Multiversal por Marely.<br>
            <strong>Vínculo:</strong> Resonancia de Ki activa con tu inventario.
        `;
    } else {
        document.getElementById('detail-char-desc').innerHTML = `
            <strong>Entidad:</strong> ${char.name}<br>
            <strong>Estado:</strong> Desbloqueado en el Sistema Nexus.
        `;
    }

    detailModal.classList.add('active');
}

function closeUnlockedCharacterDetails() {
    const detailModal = document.getElementById('char-detail-modal');
    if (detailModal) {
        detailModal.classList.remove('active');
    }
}

function selectUnlockedCompanion(name) {
    selectedCompanion = name;
    closeUnlockedCharacterDetails();
    if (typeof showSystemToast === 'function') {
        showSystemToast(`⚔ ¡${name} seleccionado como Aliado Multiversal!`);
    }
    if (name === 'VEGETA' && typeof unlockAchievement === 'function') {
        unlockAchievement('saiyan_alliance');
    }
    // Cerrar selección y comenzar aventura o prólogo
    uiCharModal.classList.remove('active');
    uiTitleScreen.classList.add('fade-out');
    setTimeout(() => {
        uiTitleScreen.style.display = 'none';
        if (typeof playPrologue === 'function') {
            playPrologue();
        }
    }, 800);
}
