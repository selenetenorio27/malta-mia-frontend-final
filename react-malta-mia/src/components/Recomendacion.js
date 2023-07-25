
import React from 'react';

const Recomendacion = ({ cervezaRecomendada }) => {
  // Verifica que cervezaRecomendada no sea undefined antes de acceder a 'nombre'
  if (!cervezaRecomendada) {
    return <div>No hay recomendación de cerveza disponible.</div>;
  }

  return (
    <div>
      <h2>¡Hemos encontrado la cerveza perfecta para ti!</h2>
      <p>Nombre: {cervezaRecomendada.nombre}</p>
      <p>Estilo: {cervezaRecomendada.estilo}</p>
      <p>IBUs: {cervezaRecomendada.ibus}</p>
      <p>Ingredientes adicionales: {cervezaRecomendada.ingrediente_adicional}</p>
      <p>Porcentaje de alcohol: {cervezaRecomendada.porcentaje_alcohol}</p>
      <p>Sabor: {cervezaRecomendada.sabor}</p>
      {/* Resto de la presentación de la recomendación */}
    </div>
  );
};

export default Recomendacion;