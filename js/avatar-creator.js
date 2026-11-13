/* ==========================================================================
   Avatar Customizer Logic & Link Initiation
   ========================================================================== */

// Cambiar la imagen de vista previa al instante
function updateAvatarPreview(outfit) {
    if (!avatarImages[outfit]) return;
    uiAvatarPreview.src = avatarImages[outfit];
    uiPreviewLabel.innerText = "ATUENDO ACTUAL: " + outfit.toUpperCase();
}

// Los botones de opción se quedan resaltados al hacer clic (uno por sección)
function setupOptionGroup(container, onSelect) {
    container.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            container.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            if (onSelect) onSelect(btn.dataset.value);
        });
    });
}

setupOptionGroup(uiOutfitOptions, updateAvatarPreview);
setupOptionGroup(uiItemOptions);

// Al hacer clic en crear: ocultar selección y abrir el creador de avatar
uiCreateBtn.addEventListener('click', () => {
    uiCreatorModal.classList.add('active');
    setTimeout(() => {
        if (uiCreatorModal.classList.contains('active')) {
            uiCharModal.classList.remove('active');
            uiCharModal.style.display = 'none';
        }
    }, 900);
});

// Botón volver del creador: regresar a la pantalla de selección de personajes
uiCreatorBackBtn.addEventListener('click', () => {
    uiCreatorModal.classList.remove('active');
    uiCharModal.style.display = '';
    uiCharGrid.innerHTML = '';
    charsBuilt = false;
    buildCharGrid();
    uiCharModal.classList.add('active');
});

// Al hacer clic en iniciar enlace: guardar selecciones y empezar la historia
uiLinkBtn.addEventListener('click', () => {
    const enteredName = uiPlayerNameInput.value.trim();
    if (!enteredName) {
        alert('El Sistema requiere un nombre. Ingresa el nombre de tu protagonista antes de iniciar el enlace.');
        uiPlayerNameInput.focus();
        return;
    }

    playerName = enteredName;
    const outfitSelected = uiOutfitOptions.querySelector('.option-btn.selected');
    const itemSelected = uiItemOptions.querySelector('.option-btn.selected');
    if (outfitSelected) playerOutfit = outfitSelected.dataset.value;
    if (itemSelected) playerItem = itemSelected.dataset.value;

    uiLinkBtn.disabled = true;
    uiLinkBtn.style.animation = 'none';
    uiCreatorModal.classList.add('fade-out');
    uiTitleScreen.classList.add('fade-out');
    uiCreatorModal.addEventListener('transitionend', function onFade(e) {
        if (e.propertyName !== 'opacity') return;
        uiCreatorModal.removeEventListener('transitionend', onFade);
        uiCreatorModal.style.display = 'none';
        uiTitleScreen.style.display = 'none';
        playPrologue();
    });
});
