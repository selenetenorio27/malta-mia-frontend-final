import React, { useState, useEffect } from 'react';
import { auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './SignUpBackground.css';
import './SignUp.css';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const disableScroll = () => {
    // Calcula el ancho del scrollbar para evitar que la página se desplace
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  };
  
  const enableScroll = () => {
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = '0';
  };


  useEffect(() => {
    document.body.classList.add('sign-up-page');
    disableScroll();
  
    return () => {
      document.body.classList.remove('sign-up-page');
      document.body.style.overflow = 'auto';
      enableScroll();
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
    <div className="sign-in-container">
      <form onSubmit={signUp} className="signup-form">
        <h1>Create Account</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;