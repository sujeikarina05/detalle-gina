# Detalle para Gina Stefany

Esta pequeña página web es un detalle de San Valentín. Ahora incluye una pantalla inicial donde puedes elegir entre una **Sorpresa** directa o un pequeño **Juego** de rompecabezas antes de ver la sorpresa.

El juego de rompecabezas cuenta con dos niveles. Al completar el primer tablero, se muestra un segundo rompecabezas antes de revelar el mensaje final.
Cada pieza se marca como imagen mediante atributos ARIA para que los lectores de pantalla anuncien "pieza del rompecabezas".

## Cómo abrir la página

1. Clona o descarga este repositorio.
2. Abre el archivo `index.html` en tu navegador favorito.

Si la página se despliega mediante GitHub Pages o algún servidor, simplemente visita la URL correspondiente.

La música se reproduce de manera automática. Asegúrate de que tu navegador permita la reproducción de audio.

## Archivos principales

- `index.html` – Página principal con la estructura de la web.
- `assets/js/script.js` – Código JavaScript que controla el carrusel, los mensajes, la música y maneja el juego de rompecabezas.
- `assets/images/` – Fotografías que se muestran en el carrusel.
- `assets/audio/musica.mp3` – Pista musical de fondo.
- `assets/audio/musica2.mp3` – Se reproduce tras el carrusel de fotos.

## Publicación en GitHub Pages

Puedes publicar esta página en GitHub Pages de dos maneras:

1. Desde la pestaña **Settings > Pages** elige la rama principal como fuente de publicación.
2. O bien, utiliza el flujo de trabajo incluido en `.github/workflows/pages.yml` para desplegar cada vez que se haga un push a la rama `main`.

## Licencia

Este proyecto se distribuye bajo la licencia MIT. Consulta el archivo `LICENSE` para más información.
