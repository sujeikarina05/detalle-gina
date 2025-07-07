const PIECE_SIZE = 120;
const pantallaInicio = document.getElementById("pantalla-inicio");
const contenedorSorpresa = document.getElementById("contenedor-sorpresa");
const contenedorJuego = document.getElementById("contenedor-juego");
const nivel1 = document.getElementById("nivel1");
const nivel2 = document.getElementById("nivel2");
const piecesContainer = document.getElementById("puzzlePieces");
const board = document.getElementById("puzzleBoard");

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

export function initPuzzle() {
  nivel2.classList.add("hidden");
  nivel1.classList.remove("hidden");
  contenedorJuego.classList.remove("hidden");
  contenedorSorpresa.classList.add("hidden");
  pantallaInicio.style.display = "none";
  piecesContainer.innerHTML = "";
  board.innerHTML = "";
  const indices = [0,1,2,3,4,5,6,7,8].sort(() => Math.random() - 0.5);
  for (let i=0;i<9;i++) {
    const slot = document.createElement("div");
    slot.className = "slot";
    slot.dataset.index = i;
    slot.addEventListener("dragover", e=>e.preventDefault());
    slot.addEventListener("drop", dropPiece);
    board.appendChild(slot);

    const pieceIndex = indices[i];
    const piece = document.createElement("div");
    piece.className = "piece";
    piece.draggable = true;
    piece.dataset.index = pieceIndex;
    const x = (pieceIndex % 3) * -PIECE_SIZE;
    const y = Math.floor(pieceIndex / 3) * -PIECE_SIZE;
    piece.style.backgroundImage = "url('assets/images/1.jpg')";
    piece.style.backgroundPosition = `${x}px ${y}px`;
    piece.addEventListener("dragstart", dragPiece);
    piecesContainer.appendChild(piece);
  }
  // shuffle pieces visually using helper
  const elements = Array.from(piecesContainer.children);
  shuffle(elements);
  elements.forEach(el => piecesContainer.appendChild(el));

  // allow dropping pieces back to the container
  piecesContainer.addEventListener("dragover", e => e.preventDefault());
  piecesContainer.addEventListener("drop", returnPiece);
}

export function dragPiece(e) {
  e.dataTransfer.setData("text/plain", e.target.dataset.index);
}

export function dropPiece(e) {
  e.preventDefault();
  if (e.currentTarget.children.length === 0) {
    const id = e.dataTransfer.getData("text/plain");
    const piece = document.querySelector(`.piece[data-index='${id}']`);
    if (piece) {
      e.currentTarget.appendChild(piece);
      checkPuzzle();
    }
  }
}

function returnPiece(e) {
  e.preventDefault();
  const id = e.dataTransfer.getData("text/plain");
  const piece = document.querySelector(`.piece[data-index='${id}']`);
  if (piece) piecesContainer.appendChild(piece);
}

export function checkPuzzle() {
  for (let i=0;i<9;i++) {
    const slot = board.children[i];
    if (!slot.firstChild || slot.firstChild.dataset.index != slot.dataset.index) {
      return;
    }
  }
  alert("¡Bien hecho!");
  nivel1.classList.add("hidden");
  nivel2.classList.remove("hidden");
}
