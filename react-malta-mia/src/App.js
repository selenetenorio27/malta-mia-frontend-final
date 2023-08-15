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
// import axios from 'axios';
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

  let [user] = useAuthState(auth);


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
  
  useEffect(() => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;;
    const maltaMiaCoords = { lat: 19.2845458984375, lng: -99.16448974609375 }; // Coordenadas de Malta Mia
    const maltaMiaAddress = 'Calz. de Tlalpan 4915-Local 1A, Tlalpan Centro II, Tlalpan, 14000 Ciudad de México, CDMX, México';
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    window.initMap = () => {
      const mapOptions = {
        center: maltaMiaCoords,
        zoom: 14,
      };

      const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);

      // Agregar el marcador en las coordenadas de Malta Mia
      const marker = new window.google.maps.Marker({
        position: maltaMiaCoords,
        map: map,
        title: 'Malta Mia',
        icon: {
          url: './assets/BeerCup.jpg',
          scaledSize: new window.google.maps.Size(40, 40),
        },
      });

      // Crear el cuadro de dirección
      const addressBox = new window.google.maps.InfoWindow({
        content: `<div class="address-box">${maltaMiaAddress}</div>`,
      });

      // Mostrar el cuadro de dirección al cargar el mapa
      addressBox.open(map, marker);
    };
  }, []);


  return (
    <Router>
      <div>
      <div className="nav-container">
      <NavigationBar onEncuestaLinkClick={handleNavigationBarEncuestaClick} />
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
                <Recomendacion encuestaRespuestas={encuestaRespuestas} />
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