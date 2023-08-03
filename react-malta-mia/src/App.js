import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // Archivo de configuración de i18next
import NavigationBar from './components/NavigationBar';
import AcercaDe from './components/AcercaDe';
import Encuesta from './components/Encuesta';
import NuestrosProductos from './components/NuestrosProductos';
import Recomendacion from './components/Recomendacion';
import Favoritos from './components/Favoritos';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebaseConfig.js'; 
import { useTranslation } from 'react-i18next';
import GoogleMapsSection from './components/GoogleMapsSection';

import './App.css'

const App= () => {
  const [encuestaRespuestas, setEncuestaRespuestas] = useState(null);
  const [mostrarRecomendacion, setMostrarRecomendacion] = useState(false);

  let isLoggedIn = false;

  auth.onAuthStateChanged(function(user) {
    if (user) {
      isLoggedIn = true;
    } else {
      isLoggedIn = false;
    }
  });


  // useEffect(() => {
  //   axios
  //   .get('https://malta-mia-api.onrender.com/cervezas')
  //   .then((response) => setBeerInventory(response.data))
  //   .catch((error) => console.error('Error fecthing beer inventory:', error));
  // }, []);

  const handleEncuestaSubmit = (respuestas) => {
    setEncuestaRespuestas(respuestas);
    setMostrarRecomendacion(true);
  };

  const handleRestartEncuesta = () => {
    setMostrarRecomendacion(false);
    setEncuestaRespuestas(null);
  };
  

  return (
    <Router>
      <div>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/acerca-de" element={<AcercaDe />} />
          <Route
            path="/encuesta"
            element={
              <Encuesta
                onSubmit={handleEncuestaSubmit}
                onRestart={handleRestartEncuesta}
                encuestaRespuestas={encuestaRespuestas}
              />
            }
          />
          <Route path="/nuestros-productos" element={<NuestrosProductos />} />
          <Route
            path="/favoritos"
            element={isLoggedIn ? <Favoritos /> : <p>Para ver tus favoritos, inicia sesión con tu cuenta de usuario.</p>}
          />
        </Routes>
        {mostrarRecomendacion && (
          <Recomendacion encuestaRespuestas={encuestaRespuestas} />
        )}
      </div>
    </Router>
  );
};

const Inicio = () => {
  const { t } = useTranslation();

  return (
    <div className="inicio-container">
      {/* <h1>MALTA MIA</h1>
      <h2>Página de inicio</h2> */}
      <img src="assets/MaltaMiaLogo.png" alt="Logo de tu web app" className="logo" />
      <Link to="/encuesta" className="floating-button"> 🍺 {t('floatingButton')}</Link>

      <div className="sections-container">
        <GoogleMapsSection />
      </div>

      {/* Nueva sección */}
      <div className="black-section">
        <div className="left-section">
          <h3>{t('Hours')}</h3>
          <p>{t('Monday.Wednesday')}: 12 PM - 8 PM</p>
          <p>{t('Thursday.Saturday')}: 12 PM - 12 AM</p>
          <p>{t('Sunday')}: 12 PM - 6 PM</p>
        </div>
        <div className="right-section">
          <h3>{t('Contact.us')}</h3>
          <p>📧 maltamia.cerveza@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default App;