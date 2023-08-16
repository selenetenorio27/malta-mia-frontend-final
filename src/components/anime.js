import anime from 'animejs'; 

const logoAnimation = () => {

  const svgPaths = document.querySelectorAll('.logo path'); 


  const logoAnimation = anime.timeline({
    easing: 'easeOutExpo',
  });


  svgPaths.forEach((path, index) => {
    logoAnimation
      .add({
        targets: path,
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: 2000,
        delay: anime.stagger(100, { start: 100 }), 
        direction: 'alternate', 
      })
      .add({
        targets: path,
        fill: '#FFF', 
      });
  });
};

document.addEventListener('DOMContentLoaded', logoAnimation, false);