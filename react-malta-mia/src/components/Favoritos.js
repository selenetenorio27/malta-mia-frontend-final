import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { Link, Navigate } from 'react-router-dom';
import AuthDetails from './authDetails';
import './FavoritosBackground.css';
import './Favoritos.css';
import SignIn from './auth/SignIn';


const Favoritos = () => {
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
         <h2 className="favoritos-text">Tus Favoritos</h2>
        {!user && showSignInOverlay ? (
          <div className="overlay">
            <p>
              Para ver tus favoritos debes{' '}
              <Link to="/signin">iniciar sesión</Link> o{' '}
              <Link to="/signup">crear una cuenta</Link>.
            </p>
          </div>
        ) : null}
        {/* Renderizar los favoritos solo si el usuario está autenticado */}
        {user ? (
          <ul className="favoritos-list">
            {userFavorites.map((cerveza) => (
              <li key={cerveza.cerveza_id} className="favoritos-item">
                {/* Renderizar detalles de la cerveza */}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  };
  
  export default Favoritos;
