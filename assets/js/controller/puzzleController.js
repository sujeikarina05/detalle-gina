import { shuffle } from '../model/puzzleModel.js';
import { createPuzzle, showPuzzleSuccess } from '../view/puzzleView.js';

let board;
let piecesContainer;

export function initPuzzle() {
  const nivel2 = document.getElementById('nivel2');
  const nivel1 = document.getElementById('nivel1');
  const contenedorJuego = document.getElementById('contenedor-juego');
  const contenedorSorpresa = document.getElementById('contenedor-sorpresa');
  const pantallaInicio = document.getElementById('pantalla-inicio');

  nivel2.classList.add('hidden');
  nivel1.classList.remove('hidden');
  contenedorJuego.classList.remove('hidden');
  contenedorSorpresa.classList.add('hidden');
  pantallaInicio.style.display = 'none';

  board = document.getElementById('puzzleBoard');
  piecesContainer = document.getElementById('puzzlePieces');

  createPuzzle(board, piecesContainer, shuffle([0,1,2,3,4,5,6,7,8]), dragPiece, dropPiece, returnPiece);
}

function dragPiece(e) {
  e.dataTransfer.setData('text/plain', e.target.dataset.index);
}

function dropPiece(e) {
  e.preventDefault();
  if (e.currentTarget.children.length === 0) {
    const id = e.dataTransfer.getData('text/plain');
    const piece = document.querySelector(`.piece[data-index='${id}']`);
    if (piece) {
      e.currentTarget.appendChild(piece);
      checkPuzzle();
    }
  }
}

function returnPiece(e) {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  const piece = document.querySelector(`.piece[data-index='${id}']`);
  if (piece) piecesContainer.appendChild(piece);
}

function checkPuzzle() {
  for (let i = 0; i < 9; i++) {
    const slot = board.children[i];
    if (!slot.firstChild || slot.firstChild.dataset.index != slot.dataset.index) {
      return;
    }
  }
  showPuzzleSuccess(document.getElementById('nivel1'), document.getElementById('nivel2'));
}
