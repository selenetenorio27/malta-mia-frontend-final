import React from 'react';
import './NuestrosProductos.css'; // Importa el archivo de estilos CSS

const NuestrosProductos = () => {
    return (
      <div className="nuestros-productos-container">
        <div className="imagenes-container-arriba">
          <div className="image-container-arriba">
            <img src="/assets/cer1.jpg" alt="Imagen arriba izquierda" />
          </div>
          <div className="image-container-arriba">
            <img src="/assets/cer2.jpg" alt="Imagen arriba derecha" />
          </div>
        </div>
        <div className="imagenes-container">
          <div className="image-container">
            <img src="/assets/cer5.jpg" alt="Imagen abajo izquierda" />
          </div>
          <div className="image-container">
            <img src="/assets/cer6.jpg" alt="Imagen abajo derecha" />
          </div>
        </div>
      </div>
    );
  };
  
  export default NuestrosProductos;