import React, { useEffect } from 'react';
import './GoogleMapsSection.css';

const GoogleMapsSection = () => {

  useEffect(() => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const maltaMiaCoords = { lat: 19.2845458984375, lng: -99.16448974609375 }; // Coordenadas de Malta Mia
    const maltaMiaAddress = 'Calz. de Tlalpan 4915-Local 1A, Tlalpan Centro II, Tlalpan, 14000 Ciudad de México, CDMX, México';


  
      const mapOptions = {
        center: { lat: 19.2845458984375, lng: -99.16448974609375 },
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
    //};
  }, []);

  

  return (
    <div className="map-container">
      <div id="map" style={{ height: '400px', width: '70%' }}></div>
      <div className="address-container">
      <img src="/assets/local.jpg" alt="Malta Mia Address" className="address-image" />
      </div>
    </div>
  );
};

export default GoogleMapsSection;

