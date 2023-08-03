import React, { useState } from 'react';
import beersData from './Cerveza';
import { useTranslation } from 'react-i18next';

const Recomendacion = ({ encuestaRespuestas }) => {
  const { t } = useTranslation();

  const [favoritos, setFavoritos] = useState([]);

  const filtrarCervezas = () => {
    if (!encuestaRespuestas) {
      return [];
    }

    let cervezasFiltradas = [...beersData];

    if (encuestaRespuestas.hasTriedCraftBeer === 'no') {
      // Filtrar por IBU según respuesta a la pregunta 3
      if (encuestaRespuestas.ibuPreference === 'low') {
        cervezasFiltradas = cervezasFiltradas.filter((cerveza) => cerveza.ibus >= 8 && cerveza.ibus <= 20);
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

  const handleMarcarFavorito = (cerveza) => {
    setFavoritos((prevFavoritos) => [...prevFavoritos, cerveza]);
    // Realiza la llamada a la API para guardar la cerveza como favorita en el backend
    // Puedes utilizar axios u otra librería para realizar la llamada.
    // Ejemplo:
    // axios.post('URL_DEL_BACKEND/favoritos', { cerveza });
  };

  return (
    <div>
      <h2>{t('Recomendation')}</h2>
      {cervezasRecomendadas === null ? (
        <p>{t('Recomendation.notfound')}</p>
      ) : cervezasRecomendadas.length > 0 ? (
        <ul>
          {cervezasRecomendadas.map((cerveza) => (
            <li key={cerveza.cerveza_id}>
              <h3>{cerveza.nombre}</h3>
              <p>{t('Style')} {cerveza.estilo}</p>
              <p>IBU: {cerveza.ibus}</p>
              <p>{t('Alcohol.level')} {cerveza.porcentaje_alcohol}</p>
              <p>
              {t('Flavor')}{' '}
                {Array.isArray(cerveza.sabor)
                  ? cerveza.sabor.length > 1
                    ? cerveza.sabor.join(', ')
                    : cerveza.sabor[0]
                  : cerveza.sabor}
              </p>
              <p>
              {t('Aditional.ingredients')}{' '}
                {Array.isArray(cerveza.ingrediente_adicional)
                  ? cerveza.ingrediente_adicional.length > 1
                    ? cerveza.ingrediente_adicional.join(', ')
                    : cerveza.ingrediente_adicional[0]
                  : cerveza.ingrediente_adicional}
              </p>
              <button onClick={() => handleMarcarFavorito(cerveza)}> ❤️ {t('Favorites')}</button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Recomendacion;