/****************************************************
 * 1) CARRUSEL INICIAL (60 segundos totales, 11 imágenes)
 ****************************************************/
const imagePaths = [
  "assets/images/1.jpg",
  "assets/images/2.jpg",
  "assets/images/3.jpg",
  "assets/images/4.jpg",
  "assets/images/5.jpg",
  "assets/images/6.jpg",
  "assets/images/7.jpg",
  "assets/images/8.jpg",
  "assets/images/9.jpg",
  "assets/images/10.jpg",
  "assets/images/11.jpg"
];
const imageAlts = [
  "Foto 1",
  "Foto 2",
  "Foto 3",
  "Foto 4",
  "Foto 5",
  "Foto 6",
  "Foto 7",
  "Foto 8",
  "Foto 9",
  "Foto 10",
  "Foto 11"
];
let carouselIndex = 0;
let carouselInterval;
const carouselImage = document.getElementById("carouselImage");
const music = document.getElementById("backgroundMusic");
const petals = document.querySelectorAll(".petal");
let petalCloseIndex = petals.length - 1;
const duration = 60000 / imagePaths.length;

const pantallaInicio = document.getElementById("pantalla-inicio");
const contenedorSorpresa = document.getElementById("contenedor-sorpresa");
const contenedorJuego = document.getElementById("contenedor-juego");
const nivel1 = document.getElementById("nivel1");
const nivel2 = document.getElementById("nivel2");
const piecesContainer = document.getElementById("puzzlePieces");
const board = document.getElementById("puzzleBoard");

function startCarousel() {
  clearInterval(carouselInterval);
  carouselIndex = 0;
  music.src = "assets/audio/musica2.mp3";
  music.play().catch(err => console.error("Error al reproducir la música:", err));
  carouselImage.src = imagePaths[0];
  carouselImage.alt = imageAlts[0];
  document.getElementById("carouselSection").style.display = "flex";
  document.getElementById("initialSection").style.display = "none";
  document.getElementById("ramoContainer").style.display = "none";
  document.getElementById("openButton").style.display = "none";
  document.getElementById("nextButton").style.display = "none";
  carouselInterval = setInterval(() => {
    carouselIndex++;
    if (carouselIndex < imagePaths.length) {
      carouselImage.src = imagePaths[carouselIndex];
      carouselImage.alt = imageAlts[carouselIndex];
    } else {
      clearInterval(carouselInterval);
      document.getElementById("carouselSection").style.display = "none";
      document.getElementById("initialSection").style.display = "flex";
      document.getElementById("openButton").style.display = "block";
    }
  }, duration);
}

/****************************************************
 * 2) SECCIÓN FLOR Y MENSAJES
 ****************************************************/
const messages = [
  "Gina Stefany, en este Día de San Valentín quiero recordarte lo especial que eres. Tu sonrisa ilumina cada rincón de mi corazón.",
  "Cada día a tu lado es un regalo maravilloso, lleno de amor, alegría y esperanza. Eres mi musa e inspiración.",
  "Tus ojos, llenos de ternura y vida, reflejan la belleza de un alma única que me enamora sin remedio.",
  "Tu risa es la melodía que alegra mis días y tu amor el fuego que calienta mi ser. Te amo con todo mi corazón.",
  "Contemplar tu dulzura y fortaleza me hace sentir el ser más afortunado. Eres la reina de mi corazón.",
  "En cada abrazo y en cada beso encuentro un universo de sentimientos, recordándome lo afortunado que soy de tenerte.",
  "Gina Stefany, tu amor transforma mis días grises en un arcoíris de esperanza. Gracias por llenar mi vida de magia.",
  "Feliz Día de San Valentín, mi amor eterno. Que cada latido de mi corazón te susurre lo mucho que te amo y te admiro."
];
let currentIndex = 0;

function bloomFlower() {
  document.getElementById("openButton").style.display = "none";
  const flower = document.getElementById("flower");
  petalCloseIndex = petals.length - 1;
  const center = document.querySelector(".center");
  const messageEl = document.getElementById("message");
  music.pause();
  music.currentTime = 0;
  music.src = "assets/audio/musica.mp3";
  music.play().catch(function(error) {
    console.error("Error al reproducir la música:", error);
  });
  flower.style.transform = "scale(1)";
  petals.forEach((petal, index) => {
    setTimeout(() => {
      petal.style.opacity = "1";
    }, index * 500);
  });
  setTimeout(() => {
    center.style.opacity = "1";
    center.classList.add("heartbeat");
    messageEl.innerHTML = messages[0];
    messageEl.style.opacity = "1";
    if (messages.length > 1) {
      const btn = document.getElementById("nextButton");
      btn.style.display = "block";
      btn.innerHTML = "Siguiente";
    }
  }, 2500);
}

function nextMessage() {
  const messageEl = document.getElementById("message");
  messageEl.style.opacity = "0";
  setTimeout(() => {
    currentIndex++;
    if (petalCloseIndex >= 0) {
      petals[petalCloseIndex].style.opacity = "0";
      petalCloseIndex--;
    }
    if (currentIndex < messages.length) {
      messageEl.innerHTML = messages[currentIndex];
      messageEl.style.opacity = "1";
      const btn = document.getElementById("nextButton");
      if (currentIndex === messages.length - 1) {
        btn.innerHTML = "Última sorpresa";
      } else if (currentIndex === 2) {
        btn.innerHTML = "Sigue leyendo";
      } else {
        btn.innerHTML = "Siguiente";
      }
    } else {
      document.getElementById("nextButton").style.display = "none";
      document.getElementById("initialSection").style.display = "none";
      document.getElementById("ramoContainer").style.display = "block";
    }
  }, 500);
}

// --------------------------- Juego ---------------------------
// Las funciones del rompecabezas ahora residen en puzzle.js

function mostrarSorpresa() {
  contenedorJuego.classList.add("hidden");
  nivel1.classList.remove("hidden");
  pantallaInicio.style.display = "none";
  contenedorSorpresa.classList.remove("hidden");
  startCarousel();
}

document.addEventListener("DOMContentLoaded", ()=>{
  document.getElementById("btnSorpresa").addEventListener("click", mostrarSorpresa);
  document.getElementById("btnJuego").addEventListener("click", initPuzzle);
  document.getElementById("verSorpresa").addEventListener("click", mostrarSorpresa);
});
