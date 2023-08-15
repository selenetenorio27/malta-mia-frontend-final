import React, { useEffect } from 'react';
import './GoogleMapsSection.css';

const GoogleMapsSection = () => {

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