import React from 'react';

const Recomendacion = ({ encuestaRespuestas }) => {
  const cervezasInventario = [
    {
      "cerveza_id": 1,
      "color": "obscura",
      "estilo": "lager",
      "ibus": 22,
      "ingrediente_adicional": "cafe",
      "marca": "Principia",
      "nombre": "Dark Lager",
      "porcentaje_alcohol": 4.0,
      "sabor": ["caramelo","tostado"]
    },
    {
      "cerveza_id": 2,
      "color": "clara",
      "estilo": "wheat ale",
      "ibus": 18,
      "ingrediente_adicional": "ninguno",
      "marca": "Principia",
      "nombre": "American Wheat Ale",
      "porcentaje_alcohol": 4.3,
      "sabor": "ligero y refrescante"
    },
    {
      "cerveza_id": 3,
      "color": "clara turbia",
      "estilo": "ipa",
      "ibus": 30,
      "ingrediente_adicional": "frutas",
      "marca": "Principia",
      "nombre": "Extrasolar",
      "porcentaje_alcohol": 6.5,
      "sabor": "frutal y dulce"
    }, {
      "cerveza_id": 4,
      "color": "obscura",
      "estilo": "stout",
      "ibus": 38,
      "ingrediente_adicional": ["cafe","chocolate"],
      "marca": "Wendlandt",
      "nombre": "Foca parlante",
      "porcentaje_alcohol": 5.5,
      "sabor": "tostado"
  }
    // Aquí podrías agregar más cervezas al inventario
  ];

  const filtrarCervezas = () => {
    if (!encuestaRespuestas) {
      return [];
    }

    let cervezasFiltradas = [...cervezasInventario];

    if (encuestaRespuestas.hasTriedCraftBeer === 'no') {
      // Filtrar por IBU según respuesta a la pregunta 3
      if (encuestaRespuestas.ibuPreference === 'baja (entre 8 y 20)') {
        cervezasFiltradas = cervezasFiltradas.filter((cerveza) => cerveza.ibus > 8 && cerveza.ibus <= 20);
      } else if (encuestaRespuestas.ibuPreference === 'media (entre 21 y 50)') {
        cervezasFiltradas = cervezasFiltradas.filter((cerveza) => cerveza.ibus > 20 && cerveza.ibus <= 50);
      } else if (encuestaRespuestas.ibuPreference === 'alta (mayor a 51)') {
        cervezasFiltradas = cervezasFiltradas.filter((cerveza) => cerveza.ibus > 50);
      }
    } else if (encuestaRespuestas.hasTriedCraftBeer === 'si') {
      // Filtrar por estilo según respuesta a la pregunta 2
      cervezasFiltradas = cervezasFiltradas.filter((cerveza) => cerveza.estilo === encuestaRespuestas.beerStyle);
    }

    // Filtrar por sabor según respuesta a la pregunta 4
    cervezasFiltradas = cervezasFiltradas.filter((cerveza) => cerveza.sabor.includes(encuestaRespuestas.flavorPreference));

    // Filtrar por nivel de alcohol según respuesta a la pregunta 5
    if (encuestaRespuestas.alcoholPreference === 'Bajo (menos del 4%)') {
      cervezasFiltradas = cervezasFiltradas.filter((cerveza) => cerveza.porcentaje_alcohol < 4);
    } else if (encuestaRespuestas.alcoholPreference === 'Moderado (entre 4% y 6%)') {
      cervezasFiltradas = cervezasFiltradas.filter((cerveza) => cerveza.porcentaje_alcohol >= 4 && cerveza.porcentaje_alcohol <= 6);
    } else if (encuestaRespuestas.alcoholPreference === 'Alto (mayor a 6.5%)') {
      cervezasFiltradas = cervezasFiltradas.filter((cerveza) => cerveza.porcentaje_alcohol > 6);
    }

    // Filtrar por ingrediente adicional según respuesta a la pregunta 6
    if (encuestaRespuestas.additionalIngredientPreference !== 'ninguno') {
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