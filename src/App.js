import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
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
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css'


const App= () => {
  const [encuestaRespuestas, setEncuestaRespuestas] = useState(null);
  const [mostrarRecomendacion, setMostrarRecomendacion] = useState(false);
  const [beerData, setBeerData] = useState([]);

  let [user] = useAuthState(auth);

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    // Llamada al backend para obtener datos de cervezas
    axios.get('https://malta-mia-api.onrender.com/cervezas')
      .then((response) => {
        setBeerData(response.data); // Almacena los datos en el estado
      })
      .catch((error) => {
        console.error('Error fetching beer data:', error);
      });
  }, []);


  const handleEncuestaSubmit = (respuestas) => {
    setEncuestaRespuestas(respuestas);
    setMostrarRecomendacion(true);
  };

  const handleRestartEncuesta = () => {
    setMostrarRecomendacion(false);
    setEncuestaRespuestas(null);
    window.location.reload()
  };

  const handleNavigationBarEncuestaClick = () => {
    setEncuestaRespuestas(null); // Reiniciar respuestas de encuesta al hacer clic en "Encuesta"
    setMostrarRecomendacion(false); // Ocultar recomendación al hacer clic en "Encuesta"
  };
  


  return (
    <Router>
      <div>
      <div className="nav-container">
      <NavigationBar onEncuestaLinkClick={handleNavigationBarEncuestaClick}/>
        </div>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/acerca-de" element={<AcercaDe />} />
          <Route
            path="/encuesta"
            element={
              <>
              <Encuesta
                onSubmit={handleEncuestaSubmit}
                onRestart={handleRestartEncuesta}
                encuestaRespuestas={encuestaRespuestas}
              />
              {mostrarRecomendacion && (
                <Recomendacion encuestaRespuestas={encuestaRespuestas} beerData={beerData}/>
              )}
            </>
            }
          />
          <Route path="/nuestros-productos" element={<NuestrosProductos />} />
          <Route path="/signin" element={<SignIn />} />
  <Route path="/signup" element={user ? <Navigate to="/favoritos" /> : <SignUp />} />
  <Route path="/favoritos" element={<Favoritos />} />
</Routes>
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
            <img src="assets/cervezas2.jpg" alt="Banner 2" />
          </div>
          <div>
            <img src="assets/varias2.jpg" alt="Banner 2" />
          </div>
        </Carousel>
      </div>

      <div id="malta-mia-map" className="sections-container">
        <GoogleMapsSection />
      </div>


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