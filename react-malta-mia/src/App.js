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

function App() {
  const [mostrarRecomendacion, setMostrarRecomendacion] = useState(false);
  const [recomendacionCerveza, setRecomendacionCerveza] = useState(null);
  const [beerInventory, setBeerInventory] = useState([]);

  useEffect(() => {
    axios
    .get('https://malta-mia-api.onrender.com/cervezas')
    .then((response) => response.json())
    .then((data) => setBeerInventory(data))
    .catch((error) => console.error('Error fecthing beer inventory:', error));
  }, []);

  const handleRecomendacion = (cervezaRecomendada) => {
    setMostrarRecomendacion(true);
    setRecomendacionCerveza(cervezaRecomendada);
  };

  return (
    <Router>
      <I18nextProvider i18n={i18n}>
      <div>
        <NavigationBar />
        <Routes>
        <Route exact path="/" element={<Inicio />} />
        <Route path="/acerca-de" element={<AcercaDe />} />
        <Route path="/encuesta" element={<Encuesta onRecomendacion={handleRecomendacion} beerInventory={beerInventory} />}/>
        <Route path="/nuestros-productos" element={<NuestrosProductos />} />
          </Routes>
          {mostrarRecomendacion && recomendacionCerveza && (
            <Recomendacion cervezaRecomendada={recomendacionCerveza} />
          )}
        </div>
      </I18nextProvider>
    </Router>
  );
}

const Inicio = () => {
  return (
    <div>
      <h1>MALTA MIA</h1>
      <h2>Página de inicio</h2>
    </div>
  );
};

export default App;