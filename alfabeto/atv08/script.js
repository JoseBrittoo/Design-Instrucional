// script.js
const draggables = document.querySelectorAll('.draggable');
const dropZones = document.querySelectorAll('.drop-zone');
const finishButton = document.querySelector('.finish-button');

// Drag and drop functionality
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
    });

    zone.addEventListener('drop', (e) => {
        const dragged = document.querySelector('.dragging');
        if (dragged.dataset.letter === zone.dataset.letter) {
            zone.textContent = dragged.textContent;
            dragged.remove();
        } else {
            alert('Letra incorreta!');
        }
    });
});

// Finish button functionality
finishButton.addEventListener('click', () => {
    const filled = [...dropZones].every(zone => zone.textContent !== '_');
    if (filled) {
        alert('Parabéns, você completou a palavra!');
    } else {
        alert('Preencha todas as lacunas antes de finalizar!');
    }
});
