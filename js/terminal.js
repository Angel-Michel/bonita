/* ==========================================================================
   Terminal Multiversal, Codex & Achievements Controller
   ========================================================================== */

// Desbloquear un logro con notificación visual y guardado
function unlockAchievement(id) {
    if (unlockedAchievements.includes(id)) return;

    unlockedAchievements.push(id);
    try {
        localStorage.setItem('nexusAchievements', JSON.stringify(unlockedAchievements));
    } catch (e) {}

    const ach = achievementsData.find(a => a.id === id);
    if (ach) {
        showAchievementToast(ach);
    }

    updateAchievementsCount();
}

// Notificación flotante de logro
function showAchievementToast(ach) {
    const existing = document.querySelector('.achievement-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.innerHTML = `
        <span class="achievement-toast-icon">${ach.icon}</span>
        <div class="achievement-toast-content">
            <span class="achievement-toast-label">🏆 ¡LOGRO DESBLOQUEADO!</span>
            <span class="achievement-toast-title">${ach.title}</span>
        </div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        setTimeout(() => toast.remove(), 500);
    }, 4200);
}

// Actualizar contador y barra de logros
function updateAchievementsCount() {
    const countSpan = document.getElementById('achievements-count');
    const summarySpan = document.getElementById('achievements-summary-text');
    const fillBar = document.getElementById('achievements-progress-fill');

    const total = achievementsData.length;
    const unlocked = unlockedAchievements.length;
    const percent = Math.round((unlocked / total) * 100);

    if (countSpan) countSpan.innerText = `${unlocked}/${total}`;
    if (summarySpan) summarySpan.innerText = `LOGROS COMPLETADOS: ${unlocked} de ${total} (${percent}%)`;
    if (fillBar) fillBar.style.width = `${percent}%`;
}

// Abrir la Terminal
function openTerminalModal() {
    const modal = document.getElementById('terminal-modal');
    if (!modal) return;

    // Actualizar estado de las misiones según el progreso
    const isVegetaDone = unlockedCharacters.includes('VEGETA') || unlockedCharacters.includes('vegueta');
    if (missionsData[0]) {
        missionsData[0].status = isVegetaDone ? 'completed' : (collectedArtifacts.length > 0 ? 'active' : 'active');
    }

    renderMissions();
    renderCodex();
    renderAchievements();
    updateAchievementsCount();

    modal.classList.add('active');

    // Desbloquear logro de operadora de la terminal
    unlockAchievement('terminal_operator');
}

// Cerrar la Terminal
function closeTerminalModal() {
    const modal = document.getElementById('terminal-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Renderizar Misiones
function renderMissions() {
    const container = document.getElementById('missions-list');
    if (!container) return;

    container.innerHTML = '';
    missionsData.forEach(m => {
        const card = document.createElement('div');
        card.className = `mission-card ${m.status}`;

        let badgeHtml = '';
        if (m.status === 'completed') {
            badgeHtml = `<span class="mission-badge badge-completed">★ SUPERADA</span>`;
        } else if (m.status === 'active') {
            badgeHtml = `<span class="mission-badge badge-active">⚡ ACTIVA</span>`;
        } else {
            badgeHtml = `<span class="mission-badge badge-locked">🔒 BLOQUEADA</span>`;
        }

        card.innerHTML = `
            <div class="mission-header">
                <span class="mission-code">${m.code}</span>
                ${badgeHtml}
            </div>
            <div class="mission-title">${m.title}</div>
            <div class="mission-desc">${m.desc}</div>
            <div class="mission-details-row">
                <div class="mission-detail-item"><strong>Ubicación:</strong> ${m.location}</div>
                <div class="mission-detail-item"><strong>Sujeto:</strong> ${m.target}</div>
                <div class="mission-detail-item"><strong>Recompensa:</strong> ${m.reward}</div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Renderizar Códice de Lore
function renderCodex() {
    const container = document.getElementById('codex-list');
    if (!container) return;

    container.innerHTML = '';
    codexData.forEach(char => {
        const card = document.createElement('div');
        card.className = 'codex-card';

        // Si el avatar es de Marely, usar el atuendo actual
        let charImg = char.image;
        if (char.id === 'marely' && typeof avatarImages !== 'undefined' && avatarImages[playerOutfit]) {
            charImg = avatarImages[playerOutfit];
        }

        card.innerHTML = `
            <div class="codex-card-top">
                <div class="codex-avatar-frame">
                    <img src="${charImg}" alt="${char.name}">
                </div>
                <div class="codex-info">
                    <div class="codex-name">${char.name}</div>
                    <div class="codex-role">${char.role}</div>
                    <div class="codex-status" style="background: rgba(0, 243, 255, 0.15); color: #00f3ff; border: 1px solid rgba(0, 243, 255, 0.4);">${char.status}</div>
                </div>
            </div>
            <div class="codex-desc">${char.desc}</div>
        `;
        container.appendChild(card);
    });
}

// Renderizar Logros
function renderAchievements() {
    const container = document.getElementById('achievements-list');
    if (!container) return;

    container.innerHTML = '';
    achievementsData.forEach(ach => {
        const isUnlocked = unlockedAchievements.includes(ach.id);
        const card = document.createElement('div');
        card.className = `achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`;

        card.innerHTML = `
            <div class="achievement-icon-box">
                ${ach.icon}
            </div>
            <div class="achievement-info">
                <div class="achievement-name">${ach.title} ${isUnlocked ? '✓' : ''}</div>
                <div class="achievement-desc">${ach.desc}</div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Inicialización de eventos de la Terminal
function initTerminal() {
    // Baliza en la Cámara Nexus
    const triggerBtn = document.getElementById('nexus-terminal-btn');
    if (triggerBtn) {
        triggerBtn.addEventListener('click', openTerminalModal);
    }

    // Botón de cerrar
    const closeBtn = document.getElementById('terminal-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeTerminalModal);
    }

    // Cierre al hacer clic en el backdrop
    const modal = document.getElementById('terminal-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeTerminalModal();
        });
    }

    // Tecla ESC para cerrar
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeTerminalModal();
    });

    // Pestañas
    const tabs = document.querySelectorAll('.terminal-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const targetPaneId = `tab-${tab.dataset.tab}`;
            const panes = document.querySelectorAll('.terminal-pane');
            panes.forEach(pane => {
                pane.classList.toggle('active', pane.id === targetPaneId);
            });
        });
    });

    // Auto-comprobar logros acumulados retroactivamente
    checkRetroactiveAchievements();
}

// Comprobación de logros basada en estados actuales
function checkRetroactiveAchievements() {
    if (playerName && playerName !== 'Protagonista') {
        unlockAchievement('awakening');
    }

    if (Array.isArray(collectedArtifacts) && collectedArtifacts.length >= 3) {
        unlockAchievement('relic_hunter');
    }

    if (Array.isArray(unlockedCharacters) && (unlockedCharacters.includes('VEGETA') || unlockedCharacters.includes('vegueta'))) {
        unlockAchievement('daredevil');
        unlockAchievement('pride_restored');
    }

    if (selectedCompanion === 'VEGETA') {
        unlockAchievement('saiyan_alliance');
    }
}
