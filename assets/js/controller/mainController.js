import { imagePaths, imageAlts, state } from '../model/gameModel.js';
import { bloomFlower, nextMessage } from '../view/messageView.js';
import { initPuzzle } from './puzzleController.js';

const carouselImage = document.getElementById('carouselImage');
const music = document.getElementById('backgroundMusic');
const duration = 60000 / imagePaths.length;

function startCarousel() {
  clearInterval(state.carouselInterval);
  state.carouselIndex = 0;
  music.src = 'assets/audio/musica2.mp3';
  music.play().catch(err => console.error('Error al reproducir la música:', err));
  carouselImage.src = imagePaths[0];
  carouselImage.alt = imageAlts[0];
  document.getElementById('carouselSection').style.display = 'flex';
  document.getElementById('initialSection').style.display = 'none';
  document.getElementById('ramoContainer').style.display = 'none';
  document.getElementById('openButton').style.display = 'none';
  document.getElementById('nextButton').style.display = 'none';
  state.carouselInterval = setInterval(() => {
    state.carouselIndex++;
    if (state.carouselIndex < imagePaths.length) {
      carouselImage.src = imagePaths[state.carouselIndex];
      carouselImage.alt = imageAlts[state.carouselIndex];
    } else {
      clearInterval(state.carouselInterval);
      document.getElementById('carouselSection').style.display = 'none';
      document.getElementById('initialSection').style.display = 'flex';
      document.getElementById('openButton').style.display = 'block';
    }
  }, duration);
}

function mostrarSorpresa() {
  document.getElementById('contenedor-juego').classList.add('hidden');
  document.getElementById('nivel1').classList.remove('hidden');
  document.getElementById('pantalla-inicio').style.display = 'none';
  document.getElementById('contenedor-sorpresa').classList.remove('hidden');
  startCarousel();
}

// Eventos

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btnSorpresa').addEventListener('click', mostrarSorpresa);
  document.getElementById('btnJuego').addEventListener('click', initPuzzle);
  document.getElementById('verSorpresa').addEventListener('click', mostrarSorpresa);
  document.getElementById('openButton').addEventListener('click', () => bloomFlower(music));
  document.getElementById('nextButton').addEventListener('click', nextMessage);
});
