import { PIECE_SIZE } from '../model/gameModel.js';

export function createPuzzle(board, piecesContainer, indices, dragHandler, dropHandler, returnHandler) {
  piecesContainer.innerHTML = '';
  board.innerHTML = '';

  for (let i = 0; i < 9; i++) {
    const slot = document.createElement('div');
    slot.className = 'slot';
    slot.dataset.index = i;
    slot.addEventListener('dragover', e => e.preventDefault());
    slot.addEventListener('drop', dropHandler);
    board.appendChild(slot);

    const pieceIndex = indices[i];
    const piece = document.createElement('div');
    piece.className = 'piece';
    piece.draggable = true;
    piece.dataset.index = pieceIndex;
    const x = (pieceIndex % 3) * -PIECE_SIZE;
    const y = Math.floor(pieceIndex / 3) * -PIECE_SIZE;
    piece.style.backgroundImage = "url('assets/images/1.jpg')";
    piece.style.backgroundPosition = `${x}px ${y}px`;
    piece.addEventListener('dragstart', dragHandler);
    piecesContainer.appendChild(piece);
  }

  for (let i = piecesContainer.children.length; i >= 0; i--) {
    piecesContainer.appendChild(piecesContainer.children[Math.random() * i | 0]);
  }

  piecesContainer.addEventListener('dragover', e => e.preventDefault());
  piecesContainer.addEventListener('drop', returnHandler);
}

export function showPuzzleSuccess(nivel1, nivel2) {
  alert('¡Bien hecho!');
  nivel1.classList.add('hidden');
  nivel2.classList.remove('hidden');
}
