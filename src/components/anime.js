import anime from 'animejs'; // Asegúrate de importar la librería "anime.js"

const logoAnimation = () => {
  // Resto del código de la función logoAnimation ...

  const svgPaths = document.querySelectorAll('.logo path'); // Selecciona todos los elementos "path" dentro del logo SVG

  // Definición de la animación para el logo SVG
  const logoAnimation = anime.timeline({
    easing: 'easeOutExpo',
  });

  // Añadir animación para cada "path" del logo
  svgPaths.forEach((path, index) => {
    logoAnimation
      .add({
        targets: path,
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: 2000,
        delay: anime.stagger(100, { start: 100 }), // Ajusta el retardo para que cada "path" se anime uno después del otro
        direction: 'alternate', // Hace que la animación se reproduzca en sentido inverso al final
      })
      .add({
        targets: path,
        fill: '#FFF', // Cambiar el color de relleno al final de la animación (opcional)
      });
  });
};

document.addEventListener('DOMContentLoaded', logoAnimation, false);