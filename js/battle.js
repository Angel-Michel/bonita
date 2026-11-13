/* ==========================================================================
   Battle System Engine (Boss Battle: Vegeta & Multiversal Corruption)
   ========================================================================== */

function updateBattleUi() {
    // Barras de Vegeta
    const bossHpFill = document.getElementById('boss-hp-fill');
    const bossHpText = document.getElementById('boss-hp-text');
    const bossKiFill = document.getElementById('boss-ki-fill');
    const bossKiText = document.getElementById('boss-ki-text');

    const bossHpPct = Math.max(0, Math.min(100, (vegetaHp / vegetaMaxHp) * 100));
    const bossKiPct = Math.max(0, Math.min(100, (vegetaKi / vegetaMaxKi) * 100));

    if (bossHpFill) bossHpFill.style.width = bossHpPct + '%';
    if (bossHpText) bossHpText.innerText = `${Math.ceil(vegetaHp)} / ${vegetaMaxHp} HP`;

    if (bossKiFill) bossKiFill.style.width = bossKiPct + '%';
    if (bossKiText) bossKiText.innerText = `Ki: ${Math.ceil(vegetaKi)}%`;

    // Barras de Marely
    const playerHpFill = document.getElementById('player-hp-fill');
    const playerHpText = document.getElementById('player-hp-text');
    const playerEnergyFill = document.getElementById('player-energy-fill');
    const playerEnergyText = document.getElementById('player-energy-text');

    const playerHpPct = Math.max(0, Math.min(100, (playerHp / playerMaxHp) * 100));
    const playerEnergyPct = Math.max(0, Math.min(100, (playerEnergy / playerMaxEnergy) * 100));

    if (playerHpFill) playerHpFill.style.width = playerHpPct + '%';
    if (playerHpText) playerHpText.innerText = `${Math.ceil(playerHp)} / ${playerMaxHp} HP`;

    if (playerEnergyFill) playerEnergyFill.style.width = playerEnergyPct + '%';
    if (playerEnergyText) playerEnergyText.innerText = `Energía: ${Math.ceil(playerEnergy)}%`;

    // Botones de acción según inventario y energía
    const btnAttack = document.getElementById('battle-btn-attack');
    const btnRadar = document.getElementById('battle-btn-radar');
    const btnCrystal = document.getElementById('battle-btn-crystal');
    const btnSenzu = document.getElementById('battle-btn-senzu');
    const btnPride = document.getElementById('battle-btn-pride');

    if (btnAttack) btnAttack.disabled = playerEnergy < 15;
    if (btnRadar) btnRadar.disabled = !collectedArtifacts.includes('radar') || playerEnergy < 20;
    if (btnCrystal) btnCrystal.disabled = !collectedArtifacts.includes('crystal') || playerEnergy < 25;
    if (btnSenzu) btnSenzu.disabled = !collectedArtifacts.includes('senzu') || senzuUsed;
    if (btnPride) {
        btnPride.disabled = vegetaHp > 110;
        btnPride.style.display = vegetaHp <= 110 ? 'flex' : 'none';
    }
}

function logBattle(text) {
    const logBox = document.getElementById('battle-log');
    if (logBox) {
        logBox.innerHTML = text;
    }
}

function startVegetaBattle() {
    battleActive = true;
    playerHp = playerMaxHp;
    playerEnergy = playerMaxEnergy;
    vegetaHp = vegetaMaxHp;
    vegetaKi = 40;
    radarDodgeActive = false;
    crystalStunActive = false;
    senzuUsed = false;

    // Cambiar fondo al Páramo Rocoso
    uiBg.className = 'bg-wasteland';
    uiBg.style.backgroundImage = '';

    // Ocultar diálogos y exploración
    uiDialogueBox.style.opacity = '0';
    uiDialogueBox.style.pointerEvents = 'none';
    uiExplorationStage.classList.remove('active');

    // Mostrar pantalla de combate
    const battleStage = document.getElementById('battle-stage');
    if (battleStage) {
        battleStage.classList.add('active');
    }

    updateBattleUi();
    logBattle(`⚔ <strong>¡BATALLA POR EL CONTROL DEL UNIVERSO 7!</strong><br>Vegeta está rodeado por un miasma oscuro. Usa tus artefactos para quebrar su defensa.`);
}

function playerAttack() {
    if (!battleActive || playerEnergy < 15) return;
    playerEnergy -= 15;

    const damage = Math.floor(Math.random() * 20) + 40; // 40 a 60
    vegetaHp = Math.max(0, vegetaHp - damage);

    const sprite = document.getElementById('boss-sprite');
    if (sprite) {
        sprite.classList.add('hit');
        setTimeout(() => sprite.classList.remove('hit'), 350);
    }

    updateBattleUi();
    logBattle(`💥 <strong>¡Ataque de Resonancia!</strong> Canalizas tu energía con tu {{ITEM}} e impactas a Vegeta causando <span style="color:#ffd700;">${damage} de daño</span>.`);

    if (vegetaHp <= 0) {
        endBattleVictory();
        return;
    }

    setTimeout(vegetaTurn, 900);
}

function playerUseRadar() {
    if (!battleActive || playerEnergy < 20 || !collectedArtifacts.includes('radar')) return;
    playerEnergy -= 20;
    radarDodgeActive = true;

    updateBattleUi();
    logBattle(`📡 <strong>¡Radar de Ki Activado!</strong> Sintonizas los sensores para rastrear la firma de ki de Vegeta y preparar un contraataque.`);

    setTimeout(vegetaTurn, 800);
}

function playerUseCrystal() {
    if (!battleActive || playerEnergy < 25 || !collectedArtifacts.includes('crystal')) return;
    playerEnergy -= 25;
    crystalStunActive = true;

    const damage = 35;
    vegetaHp = Math.max(0, vegetaHp - damage);
    vegetaKi = Math.max(0, vegetaKi - 40);

    const sprite = document.getElementById('boss-sprite');
    if (sprite) {
        sprite.classList.add('hit');
        setTimeout(() => sprite.classList.remove('hit'), 350);
    }

    updateBattleUi();
    logBattle(`🌀 <strong>¡Cristal de Gravedad!</strong> Desatas una onda de ultra-gravedad que aturde a Vegeta, drena su Ki y causa <span style="color:#00f3ff;">${damage} de daño</span>.`);

    if (vegetaHp <= 0) {
        endBattleVictory();
        return;
    }

    setTimeout(vegetaTurn, 1000);
}

function playerUseSenzu() {
    if (!battleActive || senzuUsed || !collectedArtifacts.includes('senzu')) return;
    senzuUsed = true;

    playerHp = Math.min(playerMaxHp, playerHp + 80);
    playerEnergy = Math.min(playerMaxEnergy, playerEnergy + 60);

    updateBattleUi();
    logBattle(`🌱 <strong>¡Semilla del Ermitaño!</strong> Consumes la semilla mística y recuperas <span style="color:#00e676;">+80 Salud</span> y <span style="color:#4fc3f7;">+60 Energía</span>.`);
}

function playerAppealPride() {
    if (!battleActive || vegetaHp > 110) return;

    logBattle(`👑 <strong>MARELY:</strong> <em>"¡Vegeta! ¡Tú eres el Príncipe de los Saiyajin! ¡Un guerrero invicto que jamás se arrodilla ante nadie! ¡Recuerda tu orgullo!"</em>`);

    const sprite = document.getElementById('boss-sprite');
    if (sprite) {
        sprite.style.filter = "brightness(3) drop-shadow(0 0 60px #ffd700)";
    }

    setTimeout(() => {
        endBattleVictory();
    }, 1400);
}

function vegetaTurn() {
    if (!battleActive) return;

    // Recuperación paulatina de energía de Marely
    playerEnergy = Math.min(playerMaxEnergy, playerEnergy + 10);

    // Caso 1: Vegeta está aturdido por el cristal
    if (crystalStunActive) {
        crystalStunActive = false;
        updateBattleUi();
        logBattle(`🌀 Vegeta lucha con ferocidad para liberarse de la gravedad del cristal y <strong>no puede atacar este turno</strong>.`);
        return;
    }

    // Caso 2: El radar de Ki esquiva y contraataca
    if (radarDodgeActive) {
        radarDodgeActive = false;
        const counterDmg = 45;
        vegetaHp = Math.max(0, vegetaHp - counterDmg);
        updateBattleUi();
        logBattle(`⚡ <strong>¡ESQUIVE PERFECTO!</strong> El Radar predice el ataque de Vegeta. Te deslizas por su flanco y contraatacas causando <span style="color:#ffd700;">${counterDmg} de daño</span>.`);

        if (vegetaHp <= 0) {
            endBattleVictory();
        }
        return;
    }

    // Caso 3: Ataque especial o normal de Vegeta
    vegetaKi = Math.min(vegetaMaxKi, vegetaKi + 25);

    if (vegetaKi >= 75) {
        vegetaKi -= 75;
        const dmg = Math.floor(Math.random() * 15) + 35; // 35 a 50
        playerHp = Math.max(0, playerHp - dmg);

        document.getElementById('battle-stage').classList.add('battle-shake');
        setTimeout(() => document.getElementById('battle-stage').classList.remove('battle-shake'), 400);

        updateBattleUi();
        logBattle(`💥 <strong>¡BIG BANG ATTACK OSCURO!</strong> Vegeta libera una esfera de Ki abrumadora que estremece el terreno. Recibes <span style="color:#ff1744;">${dmg} de daño</span>.`);
    } else {
        const dmg = Math.floor(Math.random() * 10) + 18; // 18 a 28
        playerHp = Math.max(0, playerHp - dmg);

        updateBattleUi();
        logBattle(`🔥 <strong>Ráfaga de Ki Cósmica:</strong> Vegeta dispara ráfagas de energía consecutivas causando <span style="color:#ff1744;">${dmg} de daño</span>.`);
    }

    if (playerHp <= 0) {
        endBattleDefeat();
    }
}

function endBattleVictory() {
    battleActive = false;
    const battleStage = document.getElementById('battle-stage');
    if (battleStage) {
        battleStage.classList.remove('active');
    }

    if (typeof unlockCharacter === 'function') {
        unlockCharacter('VEGETA');
    }

    // Regresar al flujo de novela visual en la escena de victoria
    uiDialogueBox.style.opacity = '1';
    uiDialogueBox.style.pointerEvents = '';
    loadScene(16); // Escena donde las cadenas estallan y Vegeta queda liberado
}

function endBattleDefeat() {
    battleActive = false;
    logBattle(`💀 <strong>¡Has caído en combate!</strong> La energía del Nexo estabiliza tu cuerpo antes de que ocurra lo peor.`);
    setTimeout(() => {
        const battleStage = document.getElementById('battle-stage');
        if (battleStage) battleStage.classList.remove('active');
        if (typeof showSystemToast === 'function') {
            showSystemToast(`💀 Regenerando en el Nexo... ¡Vuelve a intentarlo cuando estés lista!`);
        }
        startExploration(10);
    }, 2000);
}
