import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // Archivo de configuración de i18next
import NavigationBar from './components/NavigationBar';
import AcercaDe from './components/AcercaDe';
import Encuesta from './components/Encuesta';
import NuestrosProductos from './components/NuestrosProductos';
import Recomendacion from './components/Recomendacion';
import Favoritos from './components/Favoritos';
// import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebaseConfig.js'; 
import { useTranslation } from 'react-i18next';
import GoogleMapsSection from './components/GoogleMapsSection';
import Login from './components/Login';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import './App.css'

const App= () => {
  const [encuestaRespuestas, setEncuestaRespuestas] = useState(null);
  const [mostrarRecomendacion, setMostrarRecomendacion] = useState(false);

  let [user] = useAuthState(auth);




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
      <div className="nav-container">
        <NavigationBar />
        </div>
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
  element={<Favoritos user={user} />}
/>
          <Route path="/login" element={<Login />} />
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

      <img src="assets/MaltaMiaLogo.png" alt="Logo de tu web app" className="logo" />
      <Link to="/encuesta" className="floating-button"> 🍺 {t('floatingButton')}</Link>

      {/* Carrusel de fotos */}
      <div className="carousel-container">
        <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay>
          {/* Diapositivas del carrusel */}
          <div>
            <img src="assets/viva.jpg" alt="Banner 1" />
          </div>
          <div>
            <img src="assets/vicky.jpg" alt="Banner 2" />
          </div>
          <div>
            <img src="assets/varias2.jpg" alt="Banner 2" />
          </div>
        </Carousel>
      </div>

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