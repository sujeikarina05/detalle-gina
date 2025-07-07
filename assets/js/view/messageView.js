import { messages, state } from '../model/gameModel.js';

export function bloomFlower(music) {
  document.getElementById('openButton').style.display = 'none';
  const flower = document.getElementById('flower');
  const petals = document.querySelectorAll('.petal');
  state.petalCloseIndex = petals.length - 1;
  const center = document.querySelector('.center');
  const messageEl = document.getElementById('message');
  music.pause();
  music.currentTime = 0;
  music.src = 'assets/audio/musica.mp3';
  music.play().catch(function (error) {
    console.error('Error al reproducir la música:', error);
  });
  flower.style.transform = 'scale(1)';
  petals.forEach((petal, index) => {
    setTimeout(() => {
      petal.style.opacity = '1';
    }, index * 500);
  });
  setTimeout(() => {
    center.style.opacity = '1';
    center.classList.add('heartbeat');
    messageEl.innerHTML = messages[0];
    messageEl.style.opacity = '1';
    if (messages.length > 1) {
      const btn = document.getElementById('nextButton');
      btn.style.display = 'block';
      btn.innerHTML = 'Siguiente';
    }
  }, 2500);
}

export function nextMessage() {
  const petals = document.querySelectorAll('.petal');
  const messageEl = document.getElementById('message');
  const btn = document.getElementById('nextButton');
  messageEl.style.opacity = '0';
  setTimeout(() => {
    state.currentIndex++;
    if (state.petalCloseIndex >= 0) {
      petals[state.petalCloseIndex].style.opacity = '0';
      state.petalCloseIndex--;
    }
    if (state.currentIndex < messages.length) {
      messageEl.innerHTML = messages[state.currentIndex];
      messageEl.style.opacity = '1';
      if (state.currentIndex === messages.length - 1) {
        btn.innerHTML = 'Última sorpresa';
      } else if (state.currentIndex === 2) {
        btn.innerHTML = 'Sigue leyendo';
      } else {
        btn.innerHTML = 'Siguiente';
      }
    } else {
      btn.style.display = 'none';
      document.getElementById('initialSection').style.display = 'none';
      document.getElementById('ramoContainer').style.display = 'block';
    }
  }, 500);
}
