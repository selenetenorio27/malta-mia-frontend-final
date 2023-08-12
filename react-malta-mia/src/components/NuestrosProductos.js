import React from 'react';
import './NuestrosProductos.css'; // Importa el archivo de estilos CSS

const NuestrosProductos = () => {
    return (
      <div className="nuestros-productos-container">
        <div className="titulo-container">
          <h2 className="productos-title">Nuestros Productos</h2>
        </div>
        <div className="imagenes-container">
          <div className="image-container">
            <img src="/assets/cer1.jpg" alt="Imagen izquierda" />
          </div>
          <div className="image-container">
            <img src="/assets/cer2.jpg" alt="Imagen derecha" />
          </div>
        </div>
      </div>
    );
  };

export default NuestrosProductos;