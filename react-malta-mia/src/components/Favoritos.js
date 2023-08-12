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


    useEffect(() => {
      const fetchUserFavorites = async () => {
        if (user) {
          try {
            // GET al backend para obtener las cervezas favoritas
            const response = await axios.get(
              `https://malta-mia-api.onrender.com/${user.uid}/favoritos`,
              {
                headers: {
                  Authorization: `Bearer ${await auth.currentUser.getIdToken()}`,
                },
              }
            );
    
            setUserFavorites(response.data);
          } catch (error) {
            console.error('Error fetching user favorites:', error);
          }
        }
      };
    
      fetchUserFavorites();
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
        <h2 className="favoritos-text">Tus Favoritos</h2>
        {user ? (
          <>
            <AuthDetails /> {/* Muestra el componente AuthDetails cuando el usuario está autenticado */}
            {/* Aquí puedes agregar la imagen de fondo */}
          </>
        ) : (
          <div className="login-message-container">
            <SignIn showSignInOverlay={true} />
          </div>
        )}
      </div>
    );
  };
  
  export default Favoritos;