import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { auth } from './../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';


const Recomendacion = ({ encuestaRespuestas }) => {
  const { t } = useTranslation();
  const auth = getAuth();
  const [user] = useAuthState(auth);

  const [cervezasFiltradas, setCervezasFiltradas] = useState([]);


  useEffect(() => {
    if (!encuestaRespuestas) return;
      const apiUrl = 'https://malta-mia-api.onrender.com/cervezas';
    
      axios
        .get(apiUrl)
        .then((response) => {
          const beerData = response.data;
          const cervezasFiltradas = filtrarCervezas(beerData);
          setCervezasFiltradas(cervezasFiltradas);
        })
        .catch((error) => {
          console.error('Error fetching beer data:', error);
        });
  }, [encuestaRespuestas]);


  

  const filtrarCervezas = (beerData) => {
    if (!encuestaRespuestas || !beerData) {
      return [];
    }

    let cervezasFiltradas = [...beerData];

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

  console.log(cervezasFiltradas)



  const handleMarcarFavorito = async (cerveza) => {
    if (!user) {
      alert(t('Please log in to mark a beer as favorite.'));
      return;
    }
  
    try {
      const data = {
        cliente_id: user.email,  
        cerveza_id: cerveza.cerveza_id,
      };
      console.log(data)
  
      await axios.post(
        'https://malta-mia-api.onrender.com/favoritos',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await auth.currentUser.getIdToken()}`,
          },
        }
      );
  
      console.log('Cerveza marcada como favorita en el backend');
    } catch (error) {
      console.error('Error al marcar la cerveza como favorita:', error);
    }
  };
  
  

  return (
    <div>
      <h2>{t('Recommendation')}</h2>
      {cervezasFiltradas === null ? (
        <p>{t('Recommendation.notfound')}</p>
      ) : cervezasFiltradas.length > 0 ? (
        <ul>
          {cervezasFiltradas.map((cerveza) => (
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
              {user && (
              <button onClick={() => handleMarcarFavorito(cerveza)}> ❤️ {t('Favorites')}</button>
              )}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Recomendacion;