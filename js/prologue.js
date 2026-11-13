/* ==========================================================================
   Prologue Cinematic & Dimensional Rupture
   ========================================================================== */

function playPrologue() {
    prologueActive = true;
    prologueBusy = false;
    prologueIndex = 0;
    isPaused = false;

    // El botón de pausa solo está disponible durante la novela
    uiPauseBtn.classList.add('visible');

    // Fondo del atardecer tranquilo
    uiBg.className = 'bg-atardecer';

    // Estilo de diálogo cyan para los personajes
    uiName.style.background = '#00f3ff';
    uiName.style.color = '#000';
    uiName.style.boxShadow = '0 0 10px rgba(0, 243, 255, 0.6)';
    uiDialogueBox.style.borderColor = '#00f3ff';
    uiDialogueBox.style.boxShadow = '0 0 20px rgba(0, 243, 255, 0.4), inset 0 0 15px rgba(0, 243, 255, 0.2)';
    uiChoices.innerHTML = '';
    uiDialogueBox.style.opacity = '1';

    showPrologueLine(0);
}

// La protagonista usa el nombre y el atuendo elegidos en la creación del avatar
function showPrologueLine(i) {
    const line = prologueLines[i];
    const sprite = line.image || avatarImages[playerOutfit] || 'assets/images/neutral.png';
    uiName.innerText = resolvePlayerName(line.name);
    uiSprite.classList.remove('show-sprite');
    setTimeout(() => {
        setCharacterSprite(sprite);
        showSprite();
    }, 200);
    typeWriter(resolvePlayerText(line.text));
}

// Efecto de ruptura: la caja desaparece, la pantalla tiembla con glitch y el cielo se rompe
function playBreakEffect(done) {
    prologueBusy = true;
    uiDialogueBox.style.opacity = '0';
    uiSprite.classList.remove('show-sprite');
    uiBg.style.backgroundImage = "url('assets/images/cielo_roto.jpg')";
    uiVnContainer.classList.add('glitch-mode');
    uiBg.classList.add('bg-dark-flicker');
    setTimeout(() => {
        uiVnContainer.classList.remove('glitch-mode');
        uiBg.classList.remove('bg-dark-flicker');
        uiDialogueBox.style.opacity = '1';
        prologueBusy = false;
        if (done) done();
    }, 3500);
}

// Destello blanco → negro absoluto → escena de ALERTA DEL SISTEMA
function transitionToSystemAlert() {
    prologueActive = false;
    uiFlashOverlay.style.display = 'block';
    void uiFlashOverlay.offsetWidth; // Forzar reflow para que la transición anime
    uiFlashOverlay.style.opacity = '1';
    setTimeout(() => {
        // Fundido a negro absoluto
        uiFlashOverlay.style.background = '#000000';
        setTimeout(() => {
            // La alerta del sistema carga detrás del negro
            loadScene(0);
            setTimeout(() => {
                uiFlashOverlay.style.opacity = '0';
                setTimeout(() => { uiFlashOverlay.style.display = 'none'; }, 1000);
            }, 800);
        }, 1000);
    }, 700);
}

// Avance del prólogo: clic para continuar (clic durante el texto lo completa al instante)
uiVnContainer.addEventListener('click', () => {
    if (isPaused) return;
    if (!prologueActive || prologueBusy) return;
    if (isTyping) {
        clearInterval(typeTimer);
        uiText.style.opacity = 1;
        isTyping = false;
        return;
    }
    prologueIndex++;
    if (prologueIndex === 2) {
        // Clímax: primero ocurre la ruptura dimensional
        playBreakEffect(() => showPrologueLine(2));
    } else if (prologueIndex >= prologueLines.length) {
        transitionToSystemAlert();
    } else {
        showPrologueLine(prologueIndex);
    }
});
