import React from 'react';
import './MugAnimation.css'; // Importa los estilos CSS específicos para esta animación

const MugAnimation = () => {
  return (
    <div className="mug-animation-container">
      <div class='container'>
  <div class='foam foam--filling'>
    <div class='foam__item'>
      <div class='foam__item__circle'></div>
    </div>
    <div class='foam__item'>
      <div class='foam__item__circle foam__item__circle--bottom'></div>
    </div>
    <div class='foam__item'>
      <div class='foam__item__circle'></div>
    </div>
    <div class='foam__item'>
      <div class='foam__item__circle foam__item__circle--bottom'></div>
    </div>
    <div class='foam__item'>
      <div class='foam__item__circle'></div>
    </div>
    <div class='foam__item'>
      <div class='foam__item__circle foam__item__circle--bottom'></div>
    </div>
    <div class='foam__item'>
      <div class='foam__item__circle'></div>
    </div>

  </div>
  <div class='glass' id='glass'></div>
  <div class='grip'></div>
  <div class='liquid liquid--filling' id='liquid'></div>
</div>
    </div>
  );
};

export default MugAnimation;