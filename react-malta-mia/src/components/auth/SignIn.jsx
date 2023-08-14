import React, { useState, useEffect } from 'react';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';


const SignIn = () => {
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <div className="sign-in-container">
      <div className="sign-in-logo">
        <img src="/assets/beercap.png" alt="Logo" />
      </div>
      <div className="sign-in-overlay">
        <div className="sign-in-form">
          <div className="sign-in-text">
            <h2>{t('Log.in')}</h2>
          </div>
          <form onSubmit={signIn}>
            <div className="input-group">
              <label>{t('email')}</label>
              <input
                type="email"
                placeholder={t('enter.email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>{t('password')}</label>
              <input
                type="password"
                placeholder={t('enter.password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Log In to your Account</button>
          </form>
        </div>
      </div>
          </div>
  );
};

export default SignIn;