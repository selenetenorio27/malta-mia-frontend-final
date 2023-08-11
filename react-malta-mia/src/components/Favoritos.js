import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';
import AuthDetails from './authDetails';
import './FavoritosBackground.css';
import './Favoritos.css';
import SignIn from './auth/SignIn';


const Favoritos = () => {
    const auth = getAuth();
    const [user] = useAuthState(auth);
    const [userFavorites, setUserFavorites] = useState([]);

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

    return (
      <div className="favoritos-container favoritos-page">
        <div className="favoritos-logo">
          <img src="/assets/beercap.png" alt="Logo" />
        </div>
        <div className="favoritos-text">
          <h2>Tus Favoritos</h2>
        </div>
        {!user ? (
          <div className="sign-in-overlay">
            <SignIn />
          </div>
        ) : (
          <div className="user-content">
            {userFavorites.length > 0 ? (
              <ul>
                {userFavorites.map((cerveza) => (
                  <li key={cerveza.id}>
                    <h3>{cerveza.nombre}</h3>
                    {/* Posiblemente más detalles de la cerveza */}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No tienes favoritos guardados.</p>
            )}
            <div className="user-details">
              <AuthDetails /> {/* Detalles del signout */}
            </div>
          </div>
        )}
      </div>
    );
  };

  export default Favoritos;