import React from 'react';

const Recomendacion = ({ recomendacion }) => {
  return (
    <div>
      <h2>¡Hemos encontrado la cerveza perfecta para ti!</h2>
      <p>Nombre: {recomendacion.nombre}</p>
      <p>Estilo: {recomendacion.estilo}</p>
      <p>IBUs: {recomendacion.ibus}</p>
      <p>Ingredientes adicionales: {recomendacion.ingrediente_adicional}</p>
      <p>Porcentaje de alcohol: {recomendacion.porcentaje_alcohol}</p>
      <p>Sabor: {recomendacion.sabor}</p>
    </div>
  );
};

export default Recomendacion;