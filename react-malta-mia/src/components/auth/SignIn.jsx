import React, { useState, useEffect } from 'react';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';
import { Link } from 'react-router-dom';


const SignIn = ({showSignInOverlay}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('favoritos-page');
  
    return () => {
      document.body.classList.remove('favoritos-page');
    };
  }, []);



  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate('/favoritos');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={`favoritos-container ${showSignInOverlay ? 'with-overlay' : ''}`}>
      <div className="favoritos-logo">
        <img src="/assets/beercap.png" alt="Logo" />
      </div>
      <div className="sign-in-overlay">
        <div className={`sign-in-form ${showSignInOverlay && showLoginForm ? 'visible' : ''}`}>
          <div className="sign-in-text">
            <h2>Log In</h2>
          </div>
          <form onSubmit={signIn}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Log In to your Account</button>
          </form>
        </div>
      </div>
      {/* Mostrar el enlace solo cuando showSignInOverlay es verdadero */}
      {showSignInOverlay && (
        <div className="login-message-container">
          <div className="login-message">
            Para ver tus favoritos debes{' '}
            <Link to="/signin" onClick={() => setShowLoginForm(true)}>iniciar sesión</Link> o{' '}
            <Link to="/signup">crear una cuenta</Link>.
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;