import React from 'react';
import beersData from './Cerveza';

const Recomendacion = ({ encuestaRespuestas }) => {

  const filtrarCervezas = () => {
    if (!encuestaRespuestas) {
      return [];
    }

    let cervezasFiltradas = [...beersData];

    if (encuestaRespuestas.hasTriedCraftBeer === 'no') {
      // Filtrar por IBU según respuesta a la pregunta 3
      if (encuestaRespuestas.ibuPreference === 'low') {
        cervezasFiltradas = cervezasFiltradas.filter((cerveza) => cerveza.ibus > 8 && cerveza.ibus <= 20);
      } else if (encuestaRespuestas.ibuPreference === 'medium') {
        cervezasFiltradas = cervezasFiltradas.filter((cerveza) => cerveza.ibus > 20 && cerveza.ibus <= 50);
      } else if (encuestaRespuestas.ibuPreference === 'high') {
        cervezasFiltradas = cervezasFiltradas.filter((cerveza) => cerveza.ibus > 50);
      }
    } else if (encuestaRespuestas.hasTriedCraftBeer === 'yes') {
      // Filtrar por estilo según respuesta a la pregunta 2
      cervezasFiltradas = cervezasFiltradas.filter((cerveza) => cerveza.estilo === encuestaRespuestas.beerStyle);
    }

    // Filtrar por sabor según respuesta a la pregunta 4
    cervezasFiltradas = cervezasFiltradas.filter((cerveza) => cerveza.sabor.includes(encuestaRespuestas.flavorPreference));

    // Filtrar por nivel de alcohol según respuesta a la pregunta 5
    if (encuestaRespuestas.alcoholPreference === 'low') {
      cervezasFiltradas = cervezasFiltradas.filter((cerveza) => cerveza.porcentaje_alcohol < 4);
    } else if (encuestaRespuestas.alcoholPreference === 'medium') {
      cervezasFiltradas = cervezasFiltradas.filter((cerveza) => cerveza.porcentaje_alcohol >= 4 && cerveza.porcentaje_alcohol <= 6);
    } else if (encuestaRespuestas.alcoholPreference === 'high') {
      cervezasFiltradas = cervezasFiltradas.filter((cerveza) => cerveza.porcentaje_alcohol > 6);
    }
    // Filtrar por ingrediente adicional según respuesta a la pregunta 6
    if (encuestaRespuestas.additionalIngredientPreference !== 'none') {
      cervezasFiltradas = cervezasFiltradas.filter((cerveza) => cerveza.ingrediente_adicional.includes(encuestaRespuestas.additionalIngredientPreference));
    }

    // Verificar si se encontraron cervezas que cumplan con todos los filtros
    if (cervezasFiltradas.length === 0) {
      return null;
    }

    return cervezasFiltradas;
  };

  const cervezasRecomendadas = filtrarCervezas();

  return (
    <div>
      <h2>Recomendación</h2>
      {cervezasRecomendadas === null ? (
        <p>No se encontraron cervezas que cumplan con los filtros seleccionados.</p>
      ) : cervezasRecomendadas.length > 0 ? (
        <ul>
          {cervezasRecomendadas.map((cerveza) => (
            <li key={cerveza.cerveza_id}>
              <h3>{cerveza.nombre}</h3>
              <p>Estilo: {cerveza.estilo}</p>
              <p>IBU: {cerveza.ibus}</p>
              <p>Porcentaje de alcohol: {cerveza.porcentaje_alcohol}</p>
              <p>
                Sabor:{' '}
                {Array.isArray(cerveza.sabor)
                  ? cerveza.sabor.length > 1
                    ? cerveza.sabor.join(', ')
                    : cerveza.sabor[0]
                  : cerveza.sabor}
              </p>
              <p>
                Ingredientes adicionales:{' '}
                {Array.isArray(cerveza.sabor)
                  ? cerveza.sabor.length > 1
                    ? cerveza.sabor.join(', ')
                    : cerveza.sabor[0]
                  : cerveza.sabor}
              </p>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Recomendacion;