import React, { useEffect } from 'react';
import './GoogleMapsSection.css';

const GoogleMapsSection = () => {

  useEffect(() => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const maltaMiaCoords = { lat: 19.2845458984375, lng: -99.16448974609375 }; // Coordenadas de Malta Mia
    const maltaMiaAddress = 'Calz. de Tlalpan 4915-Local 1A, Tlalpan Centro II, Tlalpan, 14000 Ciudad de México, CDMX, México';

    // const script = document.createElement('script');
    // script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    // script.async = true;
    // script.defer = true;
    // document.head.appendChild(script);

    //window.initMap = () => {
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

// import React from 'react';
// import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
// import './GoogleMapsSection.css';

// const GoogleMapsSection = () => {
//   const maltaMiaCoords = { lat: 19.2845458984375, lng: -99.16448974609375 };
//   const maltaMiaAddress =
//     'Calz. de Tlalpan 4915-Local 1A, Tlalpan Centro II, Tlalpan, 14000 Ciudad de México, CDMX, México';

//   const mapContainerStyle = {
//     height: '400px',
//     width: '70%',
//   };

//   const markerIcon = {
//     url: './assets/BeerCup.jpg', // URL of your custom icon
//     scaledSize: new window.google.maps.Size(40, 40), // size of the icon on the map
//     origin: new window.google.maps.Point(0, 0), // position in the image of the icon to display
//     anchor: new window.google.maps.Point(20, 20) // position in the marker where the icon's anchor should be. It's the center in this case.
//   };

//   return (
//     <div className="map-container">
//       <LoadScript googleMapsApiKey='AIzaSyAmaglOBMnXfiKkPMGadioN9Q8imFe54Ig'>
//         <GoogleMap
//           center={maltaMiaCoords}
//           zoom={14}
//           mapContainerStyle={mapContainerStyle}
//         >
//           <Marker
//             position={maltaMiaCoords}
//             title="Malta Mia"
//             icon={markerIcon}
//           >
//             <InfoWindow>
//               <div className="address-box">{maltaMiaAddress}</div>
//             </InfoWindow>
//           </Marker>
//         </GoogleMap>
//       </LoadScript>
//       <div className="address-container">
//         <img src="/assets/local.jpg" alt="Malta Mia Address" className="address-image" />
//       </div>
//     </div>
//   );
// };

// export default GoogleMapsSection;