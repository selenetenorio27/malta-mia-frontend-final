import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';

const Favoritos = () => {
    const [user] = useAuthState(auth);
    const [userFavorites, setUserFavorites] = useState([]);

    const API_URL= "https://malta-mia-api.onrender.com"


    useEffect(() => {
        const fetchUserFavorites = async () => {
          if (auth.currentUser) {
            try {
              // Make an API call to fetch the user's favorites
              // Replace the API_URL with the endpoint to fetch user favorites
              let response = await fetch(API_URL, {
                headers: {
                  Authorization: `Bearer ${await auth.currentUser.getIdToken()}`,
                },
              });
    
              if (response.ok) {
                const data = await response.json();
                setUserFavorites(data);
              } else {
                console.error('Error fetching user favorites:', response);
              }
            } catch (error) {
              console.error('Error fetching user favorites:', error);
            }
          }
        };
    
        fetchUserFavorites();
      }, [user]);

      return (
        <div>
          <h2>Tus Favoritos</h2>
          {auth.currentUser ? (
            <ul>
              {userFavorites.map((cerveza) => (
                <li key={cerveza.id}>
                  <h3>{cerveza.nombre}</h3>
                  {/* Display other details of the favorite cerveza */}
                </li>
              ))}
            </ul>
          ) : (
            <p>Para ver tus favoritos, inicia sesión con tu cuenta de usuario.</p>
          )}
        </div>
      );
    };
    
    export default Favoritos;