import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { Link, Navigate } from 'react-router-dom';
import AuthDetails from './authDetails';
import './FavoritosBackground.css';
import './Favoritos.css';
import { useTranslation } from 'react-i18next';
import SignIn from './auth/SignIn';


const Favoritos = () => {
    const { t } = useTranslation();
    const auth = getAuth();
    const [user] = useAuthState(auth);
    const [userFavorites, setUserFavorites] = useState([]);
    const [showSignInOverlay, setShowSignInOverlay] = useState(true);


    useEffect(() => {
      document.body.classList.add('favoritos-page');
    
      return () => {
        document.body.classList.remove('favoritos-page');
      };
    }, []);


    // Ruta para obtener favoritos
    useEffect(() => {
      const fetchUserFavorites = async () => {
        if (user) {
          try {
            // GET al backend para obtener las cervezas favoritas
            const response = await axios.get(
              `https://malta-mia-api.onrender.com/favoritos/${user.email}`,
              {
                headers: {
                  Authorization: `Bearer ${await auth.currentUser.getIdToken()}`,
                },
              }
            );

  console.log(response.data)
    
            setUserFavorites(response.data);
          } catch (error) {
            console.error('Error fetching user favorites:', error);
          }
        } else {
          setShowSignInOverlay(true);
          setUserFavorites([]);
        }
      };
  
      fetchUserFavorites();
    }, [user]);


    // Ruta cuando el usuario borra favoritos
    const removeFavorite = async (clienteId, cervezaId) => {
      try {
        await axios.delete(`https://malta-mia-api.onrender.com/favoritos/${clienteId}/${cervezaId}`, {
          headers: {
            Authorization: `Bearer ${await auth.currentUser.getIdToken()}`,
          },
        });
    
        console.log('Cerveza removed from favorites');
    
        // Actualizar el estado para reflejar la eliminación de la cerveza
        setUserFavorites((prevUserFavorites) =>
          prevUserFavorites.filter((cerveza) => cerveza.cerveza_id !== cervezaId)
        );
      } catch (error) {
        console.error('Error removing the beer from favorites:', error);
      }
    };



    return (
      <div className={`favoritos-container favoritos-page ${!user ? 'no-scroll' : ''}`}>
        {/* <>
  <AuthDetails/>
      </> */}
        <h2 className="favoritos-text">{t('Your.favorites')}</h2>
  <div className="favoritos-content">
    {!user && showSignInOverlay ? (
      <div className="overlay">
              <p>
                {t('For.see.favorites')}{' '}
                <Link to="/signin">{t('sign.in')}</Link> {t('or')}{' '}
                <Link to="/signup">{t('sign.up')}</Link>.
              </p>
            </div>
          ) : null}
          {user && (
      <div className="favoritos-list-container">
      <ul className="favoritos-list">
         {userFavorites.map((cerveza) => (
                <li key={cerveza.cerveza_id} className="favoritos-item">
                  <h3>{cerveza.nombre}</h3>
                  <p>{t('Style')} {cerveza.estilo}</p>
              <p>IBU: {cerveza.ibus}</p>
              <p>{t('Alcohol.level')} {cerveza.porcentaje_alcohol}</p>
                  {/* ...otros detalles de la cerveza... */}
                  <button onClick={() => removeFavorite(user.email, cerveza.cerveza_id)}>
                  {t('Remove.favorite')}
                  </button>
                </li>
              ))}
            </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  export default Favoritos;