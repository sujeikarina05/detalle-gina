const PIECE_SIZE = 120;
const pantallaInicio = document.getElementById("pantalla-inicio");
const contenedorSorpresa = document.getElementById("contenedor-sorpresa");
const contenedorJuego = document.getElementById("contenedor-juego");
const nivel1 = document.getElementById("nivel1");
const nivel2 = document.getElementById("nivel2");
const nivelFinal = document.getElementById("nivelFinal");
const piecesContainer = document.getElementById("puzzlePieces");
const board = document.getElementById("puzzleBoard");
const piecesContainer2 = document.getElementById("puzzlePieces2");
const board2 = document.getElementById("puzzleBoard2");

let currentBoard;
let currentPieces;

export function initPuzzle() {
  nivelFinal.classList.add("hidden");
  nivel2.classList.add("hidden");
  nivel1.classList.remove("hidden");
  contenedorJuego.classList.remove("hidden");
  contenedorSorpresa.classList.add("hidden");
  pantallaInicio.style.display = "none";
  piecesContainer.innerHTML = "";
  board.innerHTML = "";
  piecesContainer2.innerHTML = "";
  board2.innerHTML = "";
  currentBoard = board;
  currentPieces = piecesContainer;
  setupLevel(currentBoard, currentPieces, "assets/images/1.jpg");
}

function setupLevel(boardEl, piecesEl, imagePath) {
  const indices = [0,1,2,3,4,5,6,7,8].sort(() => Math.random() - 0.5);
  for (let i=0;i<9;i++) {
    const slot = document.createElement("div");
    slot.className = "slot";
    slot.dataset.index = i;
    slot.addEventListener("dragover", e=>e.preventDefault());
    slot.addEventListener("drop", dropPiece);
    boardEl.appendChild(slot);

    const pieceIndex = indices[i];
    const piece = document.createElement("div");
    piece.className = "piece";
    piece.draggable = true;
    piece.dataset.index = pieceIndex;
    piece.setAttribute("aria-label", "pieza del rompecabezas");
    const x = (pieceIndex % 3) * -PIECE_SIZE;
    const y = Math.floor(pieceIndex / 3) * -PIECE_SIZE;
    piece.style.backgroundImage = `url('${imagePath}')`;
    piece.style.backgroundPosition = `${x}px ${y}px`;
    piece.addEventListener("dragstart", dragPiece);
    piecesEl.appendChild(piece);
  }
  for(let i=piecesEl.children.length;i>=0;i--) {
    piecesEl.appendChild(piecesEl.children[Math.random()*i|0]);
  }
  piecesEl.addEventListener("dragover", e => e.preventDefault());
  piecesEl.addEventListener("drop", returnPiece);
}

export function dragPiece(e) {
  e.dataTransfer.setData("text/plain", e.target.dataset.index);
}

export function dropPiece(e) {
  e.preventDefault();
  if (e.currentTarget.children.length === 0) {
    const id = e.dataTransfer.getData("text/plain");
    let piece = currentPieces.querySelector(`.piece[data-index='${id}']`);
    if (!piece) piece = currentBoard.querySelector(`.piece[data-index='${id}']`);
    if (piece) {
      e.currentTarget.appendChild(piece);
      checkPuzzle();
    }
  }
}

function returnPiece(e) {
  e.preventDefault();
  const id = e.dataTransfer.getData("text/plain");
  const piece = currentBoard.querySelector(`.piece[data-index='${id}']`);
  if (piece) currentPieces.appendChild(piece);
}

export function checkPuzzle() {
  for (let i=0;i<9;i++) {
    const slot = currentBoard.children[i];
    if (!slot.firstChild || slot.firstChild.dataset.index != slot.dataset.index) {
      return;
    }
  }
  if (currentBoard === board) {
    nivel1.classList.add("hidden");
    nivel2.classList.remove("hidden");
    currentBoard = board2;
    currentPieces = piecesContainer2;
    setupLevel(currentBoard, currentPieces, "assets/images/2.jpg");
  } else {
    alert("¡Bien hecho!");
    nivel2.classList.add("hidden");
    nivelFinal.classList.remove("hidden");
  }
}
