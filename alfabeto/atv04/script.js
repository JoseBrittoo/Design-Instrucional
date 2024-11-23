// script.js
const draggables = document.querySelectorAll('.draggable');
const dropZones = document.querySelectorAll('.drop-zone');

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    });
});

dropZones.forEach(zone => {
    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.classList.add('hover');
    });

    zone.addEventListener('dragleave', () => {
        zone.classList.remove('hover');
    });

    zone.addEventListener('drop', (e) => {
        const dragged = document.querySelector('.dragging');
        if (dragged.dataset.letter === zone.dataset.letter) {
            zone.textContent = dragged.textContent;
            zone.classList.remove('hover');
            dragged.remove();
        } else {
            alert('Letra incorreta!');
        }
    });
});
