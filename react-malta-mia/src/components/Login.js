import React, { useState } from 'react';
import { auth } from './firebaseConfig.js';
import './Login.css';

const continueAsGuest = () => {
  // Lógica para continuar como invitado
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      // Usuario autenticado correctamente
    } catch (error) {
      // Manejar errores de inicio de sesión
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} type="submit">Iniciar Sesión</button>
      </form>
      <p>O puedes <button onClick={continueAsGuest}>Continuar como Invitado</button></p>
    </div>
    
  );
};

export default Login;