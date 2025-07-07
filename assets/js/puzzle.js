const PIECE_SIZE = 120;

function initPuzzle() {
  nivel2.classList.add("hidden");
  nivel1.classList.remove("hidden");
  contenedorJuego.classList.remove("hidden");
  contenedorSorpresa.classList.add("hidden");
  pantallaInicio.style.display = "none";
  piecesContainer.innerHTML = "";
  board.innerHTML = "";
  const indices = shuffle([0,1,2,3,4,5,6,7,8]);
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
  // shuffle pieces visually
  for(let i=piecesContainer.children.length;i>=0;i--) {
    piecesContainer.appendChild(piecesContainer.children[Math.random()*i|0]);
  }

  // allow dropping pieces back to the container
  piecesContainer.addEventListener("dragover", e => e.preventDefault());
  piecesContainer.addEventListener("drop", returnPiece);
}

function dragPiece(e) {
  e.dataTransfer.setData("text/plain", e.target.dataset.index);
}

function dropPiece(e) {
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

function checkPuzzle() {
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

function shuffle(array){
  for(let i=array.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [array[i],array[j]]=[array[j],array[i]];
  }
  return array;
}
