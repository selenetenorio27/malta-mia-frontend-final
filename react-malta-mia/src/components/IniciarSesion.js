import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const InicioSesion = () => {
  const handleSignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  return (
    <div>
      <h2>Inicia sesión para ver tus favoritos</h2>
      <button onClick={handleSignInWithGoogle}>Iniciar sesión con Google</button>
    </div>
  );
};

export default InicioSesion;