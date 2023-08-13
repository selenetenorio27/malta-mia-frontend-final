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




    useEffect(() => {
      // Deshabilitar el scroll cuando el usuario no esté autenticado
      if (!user) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }, [user]);

    if (!user) {
      return (
        <div className="favoritos-container favoritos-page">
          <div className="favoritos-logo">
            <img src="/assets/beercap.png" alt="Logo" />
          </div>
          {showSignInOverlay && (
            <div className="login-message-container">
              <div className="login-message">
                Para ver tus favoritos debes{' '}
                <Link to="/signin">iniciar sesión</Link> o{' '}
                <Link to="/signup">crear una cuenta</Link>.
              </div>
            </div>
          )}
          {!user && <SignIn showSignInOverlay={true} />}
        </div>
      );
    }

    return (
      <div className="favoritos-container favoritos-page">
         <AuthDetails />
        <h2 className="favoritos-text">Tus Favoritos</h2>
        {user ? (
          <div className="favoritos-list">
            {userFavorites.map((cerveza) => (
              <div className="favorito-item" key={cerveza.cerveza_id}>
                <h3>{cerveza.nombre}</h3>
                {/* Other beer details here */}
                <button onClick={() => removeFavorite(user.email, cerveza.cerveza_id)}>Remove from Favorites</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="login-message-container">
            <SignIn showSignInOverlay={true} />
          </div>
        )}
      </div>
    );
  };
  
  export default Favoritos;
