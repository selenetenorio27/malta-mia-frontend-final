import React from 'react';
import { Link } from 'react-router-dom';

const LoginMessage = () => {
  return (
    <div>
      <p>Debes iniciar sesión para acceder a la sección de Favoritos.</p>
      <Link to="/login">Iniciar sesión</Link>
    </div>
  );
};

export default LoginMessage;