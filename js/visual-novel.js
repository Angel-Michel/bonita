/* ==========================================================================
   Visual Novel Engine (Scenes, Text Rendering, Choices, Actions)
   ========================================================================== */

// Cargar una escena específica
function loadScene(index) {
    const scene = story[index];
    if (!scene) {
        console.error("Escena no encontrada:", index);
        return;
    }
    currentScene = index;

    uiChoices.innerHTML = '';
    uiText.innerHTML = '';
    explorationActive = false;
    uiExplorationStage.classList.remove('active', 'lab', 'nexus');
    uiLetterModal.classList.remove('active');
    uiLetterModal.style.display = 'none';
    uiDialogueBox.style.pointerEvents = '';
    uiBg.className = scene.bg;
    uiBg.style.backgroundImage = ''; // Limpia fondos inline (ej. cielo_roto.jpg) al cambiar de escena
    
    // Cargar el sprite del personaje (si la escena no define uno, usa el atuendo elegido)
    uiSprite.classList.remove('show-sprite');
    setTimeout(() => {
        const sprite = scene.image || avatarImages[playerOutfit] || 'assets/images/neutral.png';
        setCharacterSprite(sprite);
        showSprite();
    }, 200);

    uiName.innerText = resolvePlayerName(scene.name);
    
    // Cambiar color del cuadro y nombre según quién habla
    if (scene.name === "[ ALERTA DEL SISTEMA ]" || scene.name === "[ ALERTA ROJA DEL SISTEMA ]" || scene.name === "Sistema" || scene.name === "[ SISTEMA NEXUS: ACTUALIZACIÓN ]") {
        uiName.style.background = '#ff5252';
        uiName.style.color = '#fff';
        uiName.style.boxShadow = '0 0 10px rgba(255, 82, 82, 0.6)';
        uiDialogueBox.style.borderColor = '#ff5252';
        uiDialogueBox.style.boxShadow = '0 0 20px rgba(255, 82, 82, 0.4), inset 0 0 15px rgba(255, 82, 82, 0.2)';
    } else if (scene.name === "Vegeta") {
        uiName.style.background = '#ffd700';
        uiName.style.color = '#000';
        uiName.style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.8)';
        uiDialogueBox.style.borderColor = '#ffd700';
        uiDialogueBox.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.4), inset 0 0 15px rgba(0, 243, 255, 0.2)';
    } else {
        uiName.style.background = '#00f3ff';
        uiName.style.color = '#000';
        uiName.style.boxShadow = '0 0 10px rgba(0, 243, 255, 0.6)';
        uiDialogueBox.style.borderColor = '#00f3ff';
        uiDialogueBox.style.boxShadow = '0 0 20px rgba(0, 243, 255, 0.4), inset 0 0 15px rgba(0, 243, 255, 0.2)';
    }

    typeWriter(resolvePlayerText(scene.text), () => {
        scene.choices.forEach(choice => {
            const btn = document.createElement('div');
            btn.className = 'choice-btn';
            btn.innerText = resolvePlayerText(choice.text);
            btn.onclick = () => {
                if (choice.action === 'explore') {
                    startExploration(choice.next != null ? choice.next : 1);
                } else if (choice.action === 'unlockVegeta') {
                    if (typeof unlockCharacter === 'function') {
                        unlockCharacter('VEGETA');
                    }
                    loadScene(choice.next);
                } else if (choice.action === 'saveAndTitle') {
                    if (typeof saveAndExit === 'function') {
                        saveAndExit();
                    } else {
                        resetToTitle();
                    }
                } else if (choice.action === 'toTitle') {
                    resetToTitle();
                } else {
                    loadScene(choice.next);
                }
            };
            uiChoices.appendChild(btn);
            setTimeout(() => btn.style.display = 'block', 100);
        });
    });
}
