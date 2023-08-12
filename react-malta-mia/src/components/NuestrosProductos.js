import React from 'react';
import './NuestrosProductos.css'; // Importa el archivo de estilos CSS

const NuestrosProductos = () => {
  return (
    <div className="nuestros-productos-container">
      <div className="image-container left">
        <img src="/assets/cer1.jpg" alt="Imagen 1" />
      </div>
      <div className="image-container right">
        <img src="/assets/cer2.jpg" alt="Imagen 2" />
      </div>
    </div>
  );
};

export default NuestrosProductos;