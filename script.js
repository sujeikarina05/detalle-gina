/****************************************************
 * 1) CARRUSEL INICIAL (60 segundos totales, 11 imágenes)
 ****************************************************/
const imagePaths = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg"
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
const carouselImage = document.getElementById("carouselImage");
const duration = 60000 / imagePaths.length;

function startCarousel() {
  carouselImage.src = imagePaths[0];
  carouselImage.alt = imageAlts[0];
  const interval = setInterval(() => {
    carouselIndex++;
    if (carouselIndex < imagePaths.length) {
      carouselImage.src = imagePaths[carouselIndex];
      carouselImage.alt = imageAlts[carouselIndex];
    } else {
      clearInterval(interval);
      document.getElementById("carouselSection").style.display = "none";
      document.getElementById("initialSection").style.display = "flex";
      document.getElementById("openButton").style.display = "block";
    }
  }, duration);
}
window.addEventListener("load", startCarousel);

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
  const petals = document.querySelectorAll(".petal");
  const center = document.querySelector(".center");
  const messageEl = document.getElementById("message");
  const music = document.getElementById("backgroundMusic");
  music.src = "musica.mp3";
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
