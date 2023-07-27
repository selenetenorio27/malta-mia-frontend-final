import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // Archivo de configuración de i18next
import NavigationBar from './components/NavigationBar';
import AcercaDe from './components/AcercaDe';
import Encuesta from './components/Encuesta';
import NuestrosProductos from './components/NuestrosProductos';
import Recomendacion from './components/Recomendacion';
import axios from 'axios';

import './App.css'

const App= () => {
  const [encuestaRespuestas, setEncuestaRespuestas] = useState(null);



  // useEffect(() => {
  //   axios
  //   .get('https://malta-mia-api.onrender.com/cervezas')
  //   .then((response) => setBeerInventory(response.data))
  //   .catch((error) => console.error('Error fecthing beer inventory:', error));
  // }, []);

  const handleEncuestaSubmit = (respuestas) => {
    setEncuestaRespuestas(respuestas);
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
            element={<Encuesta onSubmit={handleEncuestaSubmit} />}
          />
          <Route path="/nuestros-productos" element={<NuestrosProductos />} />
        </Routes>
          <Recomendacion encuestaRespuestas={encuestaRespuestas} />
      </div>
    </Router>
  );
};

const Inicio = () => {
  return (
    <div>
      <h1>MALTA MIA</h1>
      <h2>Página de inicio</h2>
    </div>
  );
};

export default App;