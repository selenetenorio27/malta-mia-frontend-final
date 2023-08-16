import React, { useState, useEffect } from 'react';
import { auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './SignUpBackground.css';
import './SignUp.css';
import { useTranslation } from 'react-i18next';


const SignUp = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  useEffect(() => {
    document.body.classList.add('sign-up-page');
  
    return () => {
      document.body.classList.remove('sign-up-page');
      document.body.style.overflow = 'auto';
    };
  }, []);


  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sign-up-container">
        <form onSubmit={signUp} className="signup-form">
          <h1>{t('Sign.up')}</h1>
          <input
            type="email"
            placeholder={t('enter.email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder={t('password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">{t('Sign.up')}</button>
        </form>
      <div className="sign-up-logo">
        <img src="/assets/can.png" alt="Logo" />
      </div>
    </div>
  );
};

export default SignUp;